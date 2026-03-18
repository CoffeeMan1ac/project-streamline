package com.munichre.streamline.rule.api.dto;

import com.munichre.streamline.decision.model.DecisionStatus;
import com.munichre.streamline.rule.model.MatchCriteria;
import com.munichre.streamline.rule.model.Operator;
import com.munichre.streamline.rule.model.RuleConfig;
import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

/**
 * DTO representation of {@link RuleConfig}. Used when serialising rules to the REST API.
 *
 * <p>The structure exactly mirrors the nested classes of the model so that Jackson can convert
 * from/to the JSON stored in the database with no translation logic on the frontend.
 */
public record RuleConfigResponseDto(When when, Then then) {

  public static RuleConfigResponseDto of(RuleConfig config) {
    if (config == null) {
      return null;
    }
    return new RuleConfigResponseDto(When.of(config.when()), Then.of(config.then()));
  }

  public static record When(MatchCriteria match, List<Condition> conditions) {
    public static When of(RuleConfig.When when) {
      if (when == null) {
        return null;
      }
      List<Condition> conds =
          when.conditions() == null
              ? null
              : when.conditions().stream().map(Condition::of).collect(Collectors.toList());
      return new When(when.match(), conds);
    }
  }

  public static record Condition(String field, Operator operator, String value) {
    public static Condition of(RuleConfig.Condition c) {
      if (c == null) {
        return null;
      }
      return new Condition(c.field(), c.operator(), c.value());
    }
  }

  public static record Then(
      DecisionStatus decision, BigDecimal premiumOverride, BigDecimal premiumDelta, Boolean stop) {
    public static Then of(RuleConfig.Then t) {
      if (t == null) {
        return null;
      }
      return new Then(t.decision(), t.premiumOverride(), t.premiumDelta(), t.stop());
    }
  }
}
