package com.munichre.streamline.dto;

import com.munichre.streamline.model.RuleConfig;
import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

/**
 * DTO representation of {@link RuleConfig}. Used when serialising rules to the REST API.
 *
 * <p>The structure exactly mirrors the nested classes of the model so that Jackson can convert
 * from/to the JSON stored in the database with no translation logic on the frontend.
 */
public record RuleConfigResponseDto(When when, Then then, Boolean stop) {

  public static RuleConfigResponseDto of(RuleConfig config) {
    if (config == null) {
      return null;
    }

    return new RuleConfigResponseDto(
        When.of(config.getWhen()), Then.of(config.getThen()), config.getStop());
  }

  public static record When(String match, List<Condition> conditions) {
    public static When of(RuleConfig.When when) {
      if (when == null) {
        return null;
      }
      List<Condition> conds =
          when.getConditions() == null
              ? null
              : when.getConditions().stream().map(Condition::of).collect(Collectors.toList());
      return new When(when.getMatch(), conds);
    }
  }

  public static record Condition(String field, String operator, String value) {
    public static Condition of(RuleConfig.Condition c) {
      if (c == null) {
        return null;
      }
      return new Condition(c.getField(), c.getOperator(), c.getValue());
    }
  }

  public static record Then(String decision, BigDecimal premiumOverride, BigDecimal premiumDelta) {
    public static Then of(RuleConfig.Then t) {
      if (t == null) {
        return null;
      }
      return new Then(t.getDecision(), t.getPremiumOverride(), t.getPremiumDelta());
    }
  }
}
