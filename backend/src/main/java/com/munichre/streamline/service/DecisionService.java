package com.munichre.streamline.service;

import com.munichre.streamline.dto.DecisionStatus;
import com.munichre.streamline.dto.EvaluationResult;
import com.munichre.streamline.exception.FieldNotFoundException;
import com.munichre.streamline.model.Product;
import com.munichre.streamline.model.Rule;
import com.munichre.streamline.repository.ProductRepository;
import com.munichre.streamline.repository.RuleRepository;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * Rule Decision Engine.
 *
 * ONE function: takes the hashmap with ALL fields, fetches rules from DB,
 * applies rules on each field, returns decision object.
 *
 * The RULES expect fields — the database tells us what we need.
 * If a required field is missing from the hashmap → FieldNotFoundException.
 *
 * Flow:
 *   1. Fetch all active rules from DB, ordered by priority
 *   2. For each rule:
 *      a. Resolve the field value from the hashmap (throw if missing)
 *      b. Evaluate: does the field value match the condition?
 *      c. If triggered:
 *         - DECLINED → record reason. If stop semantics apply, return immediately.
 *         - REFER    → record reason, continue.
 *         - ACCEPTED → accumulate premium, continue.
 *   3. After all rules: if any DECLINED → DECLINED; if any REFER → REFER; else → ACCEPTED.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class DecisionService {

    private final RuleRepository ruleRepository;
    private final ProductRepository productRepository;

    // // TODO: base premium - make configurable per product later.
    // // TODO: FieldNotFoundException not implemented.
    // private static final BigDecimal BASE_PREMIUM = new BigDecimal("10.00");

    /**
     * The one function. Takes the hashmap, returns the decision.
     *
     * @param fields hashmap of ALL fields from the incoming request
     * @return EvaluationResult with status (ACCEPTED/DECLINED/REFER), premium, reason, rules applied
     */
    

    
    public EvaluationResult evaluate(Map<String, Object> fields) {
        EvaluationResult result = new EvaluationResult();
        long startTime = System.currentTimeMillis();
        log.info("Starting rule evaluation with " + fields.size() +  " fields");

        String productIdString = (String) fields.get("productId");
        UUID productId = UUID.fromString(productIdString);

        final Product product = productRepository.getReferenceById(productId);
        final BigDecimal BASE_PREMIUM = product.getBaseRate();

        // 1. Fetch rules from database
        List<Rule> rules = ruleRepository.findByProductIdAndActiveTrueOrderByPriorityAsc(productId);

        // Auto-accept if no rules in database
        if (rules.isEmpty()) {
            log.warn("No active rules found in database");
            result.setStatus(DecisionStatus.ACCEPTED);
            result.setPremium(BASE_PREMIUM);
            result.setReason("Auto-accept. No rules configured.");
            result.setRulesApplied(new ArrayList<>());
            result.setProcessingTimeMs(System.currentTimeMillis() - startTime);
            return result;
        }

        log.info("Fetched " + rules.size() + " active rules");

        // State tracking
        BigDecimal premiumMultiplier = new BigDecimal("1");
        boolean declined = false;
        //TODO: Implement referral
        //boolean referred = false;

        List<String> rulesApplied = new ArrayList<>();
        List<String> reasons = new ArrayList<>();

        // 2. Apply each rule in priority order
        for (Rule rule : rules) {
            String fieldName = rule.getConditionField();

            // The RULE expects this field. Throw if not in passed hashmap
            if (!fields.containsKey(fieldName)) {
                throw new FieldNotFoundException(fieldName);
            }

            Object fieldValue = fields.get(fieldName);
            log.debug("Rule '{}': field='{}', op='{}', threshold='{}', actual='{}'",
                    rule.getName(), fieldName, rule.getConditionOperator(),
                    rule.getConditionValue(), fieldValue);

            // Evaluate the condition
            boolean triggered = evaluateCondition(
                    fieldValue,
                    rule.getConditionOperator(),
                    rule.getConditionValue()
            );

            if (!triggered) {
                continue;
            }

            // Rule triggered
            log.info("Rule '{}' triggered > action={}", rule.getName(), rule.getActionType());
            rulesApplied.add(rule.getName());

            String actionType = rule.getActionType().toUpperCase();

            switch (actionType) {
                case "DECLINED", "DECLINE" -> {
                    declined = true;
                    reasons.add(rule.getActionReason() != null
                            ? rule.getActionReason()
                            : "Declined by rule: " + rule.getName());

                    // Hard stop: return immediately on decline
                    // (If later we want soft-decline with stop=false, add a 'stop' column to Rule)
                    result.setStatus(DecisionStatus.DECLINED);
                    result.setPremium(BigDecimal.ZERO);
                    result.setReason(String.join("; ", reasons));
                    result.setRulesApplied(rulesApplied);
                    result.setProcessingTimeMs(System.currentTimeMillis() - startTime);
                    return result;
                }

                case "ACCEPTED", "ACCEPT" -> {
                    // Accumulate premium modifier if the rule specifies one
                    // TODO: for now using a simple approach — premium modifier could be
                    // e.g. accept BUT charge 50% more.
                    // stored in conditionValue or a new column. Discuss with team.
                }

                // default -> log.warn("Unknown actionType '{}' on rule '{}'", actionType, rule.getName());
                // This is against typo
            }
        }

        // 3. All rules processed — build final result
        //long elapsed = System.currentTimeMillis() - startTime;

        if (declined) {
            // normally it does't reach here in current logic,
            // but added in case we do STOP flag later (Keith mentioned)
            result.setStatus(DecisionStatus.DECLINED);
            result.setPremium(BigDecimal.ZERO);
            result.setReason(String.join("; ", reasons));
            result.setRulesApplied(rulesApplied);
            result.setProcessingTimeMs(System.currentTimeMillis() - startTime);
            return result;
        }

        // All rules passed ( yas 🎉) 
        result.setStatus(DecisionStatus.ACCEPTED);
        result.setPremium(BASE_PREMIUM.multiply(premiumMultiplier));
        result.setReason("All rules passed");
        result.setRulesApplied(rulesApplied);
        result.setProcessingTimeMs(System.currentTimeMillis() - startTime);
        return result;
    }

    // ──────────────────────────────────────────────────────────
    // Condition evaluation
    // ──────────────────────────────────────────────────────────

    /**
     * Does the field value satisfy the operator + threshold?
     * Returns true if the rule TRIGGERS (condition is met).
     */

private boolean evaluateCondition(Object fieldValue, String operator, String threshold) {
    if (fieldValue == null) {
        return false;
    }

    String fieldStr = fieldValue.toString();
    String op = operator.toUpperCase();

    if (op.equals("EQUALS")) {
        return fieldStr.equalsIgnoreCase(threshold);
    }
    if (op.equals("NOT_EQUALS")) {
        return !fieldStr.equalsIgnoreCase(threshold);
    }
    if (op.equals("GREATER_THAN")) {
        return toDouble(fieldStr) > toDouble(threshold);
    }
    if (op.equals("LESS_THAN")) {
        return toDouble(fieldStr) < toDouble(threshold);
    }
    if (op.equals("GREATER_THAN_OR_EQUAL")) {
        return toDouble(fieldStr) >= toDouble(threshold);
    }
    if (op.equals("LESS_THAN_OR_EQUAL")) {
        return toDouble(fieldStr) <= toDouble(threshold);
    }
    if (op.equals("BETWEEN")) {
        String[] parts = threshold.split(",");
        double val = toDouble(fieldStr);
        return val >= toDouble(parts[0].trim()) && val <= toDouble(parts[1].trim());
    }
    if (op.equals("IN")) {
        String[] allowed = threshold.split(",");
        for (String a : allowed) {
            if (fieldStr.equalsIgnoreCase(a.trim())) {
                return true;
            }
        }
        return false;
    }

    return false;
}

    private double toDouble(String value) {
        try {
            return Double.parseDouble(value.trim());
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException(
                    "Cannot convert '" + value + "' to number for rule comparison");
        }
    }
}
