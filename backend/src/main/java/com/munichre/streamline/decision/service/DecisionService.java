package com.munichre.streamline.decision.service;

import com.munichre.streamline.decision.dto.Decision;
import com.munichre.streamline.decision.model.DecisionTraceEntry;
import com.munichre.streamline.product.model.Product;
import com.munichre.streamline.product.service.ProductService;
import com.munichre.streamline.quote.api.dto.QuoteRequest;
import com.munichre.streamline.quote.model.ApplicantData;
import com.munichre.streamline.rule.model.PremiumState;
import com.munichre.streamline.rule.model.Rule;
import com.munichre.streamline.rule.model.RuleConfig.Then;
import com.munichre.streamline.rule.service.RuleService;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
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
public class DecisionService {

  private final ProductService productService;
  private final RuleService ruleService;

  /**
   * The one function. Takes the hashmap, returns the decision.
   *
   * @param fields hashmap of ALL fields from the incoming request
   * @return EvaluationResult with status (ACCEPTED/DECLINED/REFER), premium, reason, rules applied
   */
  public Decision decide(final QuoteRequest request) {
    final long startTime = System.currentTimeMillis();

    final ApplicantData applicantData = request.applicantData();
    final Product product = productService.getProduct(request.productId());

    final List<Rule> rules =
        ruleService.findByProductIdAndActiveTrueOrderByPriorityAsc(product.getId());

    if (rules.isEmpty()) return Decision.autoAccept(product.getBaseRate(), startTime);

    PremiumState premium = new PremiumState(product.getBaseRate(), BigDecimal.ZERO);

    List<String> rulesApplied = new ArrayList<>();
    List<DecisionTraceEntry> trace = new ArrayList<>();

    for (Rule rule : rules) {
      if (rule.isTriggeredBy(applicantData)) {
        PremiumState previous = premium;

        final Then outcome = rule.getRuleConfig().then();
        premium = outcome.apply(premium);

        Boolean isOverride = outcome.premiumOverride() != null;
        BigDecimal difference = premium.calculateTotal().subtract(previous.calculateTotal());

        rulesApplied.add(rule.getName());
        trace.add(
            DecisionTraceEntry.builder()
                .ruleName(rule.getName())
                .ruleDescription(rule.getDescription())
                .isOverride(isOverride)
                .adjustmentAmount(isOverride ? outcome.premiumOverride() : difference)
                .outcome(outcome.decision().toString())
                .build());

        if (outcome.isTerminal()) {
          return new Decision(rule, rulesApplied, trace, premium, startTime);
        }
      }
    }

    return Decision.allRulesPassed(premium, startTime, rulesApplied, trace);
  }
}
