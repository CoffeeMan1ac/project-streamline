package com.munichre.streamline.service;

import com.munichre.streamline.decision.exception.FieldNotFoundException;
import com.munichre.streamline.dto.DecisionStatus;
import com.munichre.streamline.dto.EvaluationResult;
import com.munichre.streamline.model.Rule;
import com.munichre.streamline.model.RuleConfig;
import com.munichre.streamline.model.RuleConfig.Condition;
import com.munichre.streamline.model.RuleConfig.Then;
import com.munichre.streamline.model.RuleConfig.When;
import com.munichre.streamline.product.model.Product;
import com.munichre.streamline.product.service.ProductService;
import com.munichre.streamline.repository.RuleRepository;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * Rule Decision Engine.
 *
 * <p>ONE function: takes the hashmap with ALL fields, fetches rules from DB, applies rules on each
 * field, returns decision object.
 *
 * <p>The RULES expect fields — the database tells us what we need. If a required field is missing
 * from the hashmap → FieldNotFoundException.
 *
 * <p>Flow: 1. Fetch all active rules from DB, ordered by priority 2. For each rule: a. Resolve the
 * field value from the hashmap (throw if missing) b. Evaluate: does the field value match the
 * condition? c. If triggered: - DECLINED → record reason. If stop semantics apply, return
 * immediately. - REFER → record reason, continue. - ACCEPTED → accumulate premium, continue. 3.
 * After all rules: if any DECLINED → DECLINED; if any REFER → REFER; else → ACCEPTED.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class DecisionService {

  private final RuleRepository ruleRepository;
  private final ProductService productService;

  // // TODO: FieldNotFoundException not implemented.
  // private static final BigDecimal BASE_PREMIUM = new BigDecimal("10.00");

  /**
   * The one function. Takes the hashmap, returns the decision.
   *
   * @param fields hashmap of ALL fields from the incoming request
   * @return EvaluationResult with status (ACCEPTED/DECLINED/REFER), premium, reason, rules applied
   */
  public EvaluationResult evaluate(Map<String, Object> fields) {
    long startTime = System.currentTimeMillis();
    BigDecimal delta = BigDecimal.ONE;
    log.info("Starting rule evaluation with {} fields", fields.size());

    String productIdString = (String) fields.get("productId");
    UUID productId = UUID.fromString(productIdString);

    final Product product = productService.getProduct(productId);
    BigDecimal premium = product.getBaseRate();

    // 1. Fetch rules from database
    List<Rule> rules = ruleRepository.findByProductIdAndActiveTrueOrderByPriorityAsc(productId);

    if (rules.isEmpty()) {
      log.warn("No active rules found in database");
      return buildResult(
          DecisionStatus.ACCEPTED,
          premium.multiply(delta),
          "Auto-accept. No rules configured.",
          new ArrayList<>(),
          startTime);
    }

    log.info("Fetched {} active rules", rules.size());

    boolean declined = false;
    List<String> rulesApplied = new ArrayList<>();
    List<String> reasons = new ArrayList<>();

    // 2. Apply each rule in priority order
    for (Rule rule : rules) {
      RuleConfig config = rule.getRuleConfig();
      When when = config.getWhen();
      Then then = config.getThen();

      // Evaluate conditions with AND/OR logic
      boolean triggered = evaluateWhen(when, fields);

      if (!triggered) {
        continue;
      }

      log.info("Rule '{}' triggered -> decision={}", rule.getName(), then.getDecision());
      rulesApplied.add(rule.getName());

      String decision = then.getDecision().toUpperCase();

      switch (decision) {
        case "DECLINE" -> {
          declined = true;
          if (rule.getReason() != null) {
            reasons.add(rule.getReason());
          }

          log.info("Rule '{}' has stop=true. Stopping.", rule.getName());
          EvaluationResult result =
              buildResult(
                  DecisionStatus.DECLINED,
                  BigDecimal.ZERO,
                  String.join("; ", reasons),
                  rulesApplied,
                  startTime);
          result.setEvaluationStopped(true);
          result.setStoppedByRule(rule.getName());
          return result;
        }

        case "ACCEPT" -> {
          // Apply premium adjustments
          if (then.getPremiumOverride() != null) {
            delta = BigDecimal.ONE;
            premium = then.getPremiumOverride();
            log.info("Rule '{}' overrides premium to {}", rule.getName(), premium);
          }
          if (then.getPremiumDelta() != null) {
            delta = delta.add(then.getPremiumDelta());
            log.info(
                "Rule '{}' adjusts premium by {}, now {}",
                rule.getName(),
                then.getPremiumDelta(),
                premium);
          }

          if (config.getStop()) {
            log.info("Rule '{}' has stop=true. Stopping.", rule.getName());
            EvaluationResult result =
                buildResult(
                    DecisionStatus.ACCEPTED,
                    premium.multiply(delta),
                    rule.getReason(),
                    rulesApplied,
                    startTime);
            result.setEvaluationStopped(true);
            result.setStoppedByRule(rule.getName());
            return result;
          }
        }

        case "REFER" -> {
          if (rule.getReason() != null) {
            reasons.add(rule.getReason());
          }

          EvaluationResult result =
              buildResult(
                  DecisionStatus.REFER,
                  premium.multiply(delta),
                  String.join("; ", reasons),
                  rulesApplied,
                  startTime);
          result.setEvaluationStopped(true);
          result.setStoppedByRule(rule.getName());
          return result;
        }
      }
    }

    // 3. After all rules
    if (declined) {
      return buildResult(
          DecisionStatus.DECLINED,
          BigDecimal.ZERO,
          String.join("; ", reasons),
          rulesApplied,
          startTime);
    }

    return buildResult(
        DecisionStatus.ACCEPTED,
        premium.multiply(delta),
        "All rules passed",
        rulesApplied,
        startTime);
  }

  // ──────────────────────────────────────────────────────────
  // When clause: AND/OR over multiple conditions
  // ──────────────────────────────────────────────────────────

  private boolean evaluateWhen(When when, Map<String, Object> fields) {
    List<Condition> conditions = when.getConditions();
    String match = when.getMatch().toLowerCase();

    if ("all".equals(match)) {
      // AND: every condition must be true
      for (Condition c : conditions) {
        if (!evaluateCondition(c, fields)) {
          return false;
        }
      }
      return true;
    }

    if ("one".equals(match)) {
      // OR: any condition being true is enough
      for (Condition c : conditions) {
        if (evaluateCondition(c, fields)) {
          return true;
        }
      }
      return false;
    }

    log.warn("Unknown match type '{}', defaulting to AND", match);
    return false;
  }

  // ──────────────────────────────────────────────────────────
  // Single condition evaluation
  // ──────────────────────────────────────────────────────────

  private boolean evaluateCondition(Condition condition, Map<String, Object> fields) {
    String fieldName = condition.getField();

    if (!fields.containsKey(fieldName)) {
      throw new FieldNotFoundException(fieldName);
    }

    Object fieldValue = fields.get(fieldName);
    if (fieldValue == null) {
      return false;
    }

    String fieldStr = fieldValue.toString();
    String threshold = condition.getValue();
    String op = condition.getOperator().toUpperCase();

    return switch (op) {
      case "EQUALS" -> fieldStr.equalsIgnoreCase(threshold);
      case "NOT_EQUALS" -> !fieldStr.equalsIgnoreCase(threshold);
      case "GREATER_THAN" -> toDouble(fieldStr) > toDouble(threshold);
      case "LESS_THAN" -> toDouble(fieldStr) < toDouble(threshold);
      case "GREATER_THAN_OR_EQUAL" -> toDouble(fieldStr) >= toDouble(threshold);
      case "LESS_THAN_OR_EQUAL" -> toDouble(fieldStr) <= toDouble(threshold);
      case "BETWEEN" -> {
        String[] parts = threshold.split(",");
        double val = toDouble(fieldStr);
        yield val >= toDouble(parts[0].trim()) && val <= toDouble(parts[1].trim());
      }
      case "IN" -> {
        String[] allowed = threshold.split(",");
        boolean found = false;
        for (String a : allowed) {
          if (fieldStr.equalsIgnoreCase(a.trim())) {
            found = true;
            break;
          }
        }
        yield found;
      }
      default -> false;
    };
  }

  private double toDouble(String value) {
    try {
      return Double.parseDouble(value.trim());
    } catch (NumberFormatException e) {
      throw new IllegalArgumentException(
          "Cannot convert '" + value + "' to number for rule comparison");
    }
  }

  // ──────────────────────────────────────────────────────────
  // Result builder
  // ──────────────────────────────────────────────────────────

  private EvaluationResult buildResult(
      DecisionStatus status,
      BigDecimal premium,
      String reason,
      List<String> rulesApplied,
      long startTime) {
    EvaluationResult result = new EvaluationResult();
    result.setStatus(status);
    result.setPremium(premium);
    result.setReason(reason);
    result.setRulesApplied(rulesApplied);
    result.setProcessingTimeMs(System.currentTimeMillis() - startTime);
    return result;
  }
}
