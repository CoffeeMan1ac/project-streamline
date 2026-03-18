package com.munichre.streamline.decision.dto;

import com.munichre.streamline.decision.model.DecisionStatus;
import com.munichre.streamline.rule.model.PremiumState;
import com.munichre.streamline.rule.model.Rule;
import java.math.BigDecimal;
import java.util.List;

public record Decision(
    DecisionStatus status,
    String reason,
    List<String> rulesApplied,
    BigDecimal premium,
    long processingTimeMs,
    boolean evaluationStopped,
    String stoppedByRule) {
  private static final String NO_RULES_REASON_MESSAGE =
      "No underwriting rules are currently defined for this product. Automatic acceptance applied.";

  private static final String ALL_RULES_PASSED_MESSAGE = "All rules passed";

  public Decision {
    if (status != DecisionStatus.ACCEPT) {
      premium = null;
    }
  }

  public static Decision autoAccept(BigDecimal baseRate, long startTime) {
    return new Decision(
        DecisionStatus.ACCEPT,
        NO_RULES_REASON_MESSAGE,
        List.of(),
        baseRate,
        System.currentTimeMillis() - startTime,
        false,
        null);
  }

  public static Decision allRulesPassed(
      PremiumState premium, long startTime, List<String> rulesApplied) {
    return new Decision(
        DecisionStatus.ACCEPT,
        ALL_RULES_PASSED_MESSAGE,
        rulesApplied,
        premium.calculateTotal(),
        System.currentTimeMillis() - startTime,
        false,
        null);
  }

  public Decision(Rule rule, List<String> rules, PremiumState premium, long start) {
    this(
        rule.getRuleConfig().then().decision(),
        rule.getReason(),
        rules,
        premium.calculateTotal(),
        System.currentTimeMillis() - start,
        true,
        rule.getName());
  }
}
