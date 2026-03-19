package com.munichre.streamline.rule.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.munichre.streamline.decision.exception.FieldNotFoundException;
import com.munichre.streamline.decision.model.DecisionStatus;
import com.munichre.streamline.quote.model.ApplicantData;
import java.math.BigDecimal;
import java.util.List;

public record RuleConfig(When when, Then then) {

  public record When(MatchCriteria match, List<Condition> conditions) {
    public boolean isSatisfiedBy(ApplicantData applicantData) {
      if (conditions == null || conditions.isEmpty()) return true;
      return switch (match) {
        case ALL -> conditions.stream().allMatch(c -> c.isSatisfiedBy(applicantData));
        case ANY -> conditions.stream().anyMatch(c -> c.isSatisfiedBy(applicantData));
      };
    }
  }

  public record Condition(String field, Operator operator, String value) {
    public boolean isSatisfiedBy(ApplicantData applicantData) {
      if (!applicantData.containsKey(field)) {
        throw new FieldNotFoundException(field);
      }
      Object fieldValue = applicantData.get(field);
      String actual = fieldValue.toString();
      return actual != null && operator.apply(actual, value);
    }
  }

  public record Then(
      DecisionStatus decision, BigDecimal premiumOverride, BigDecimal premiumDelta, Boolean stop) {

    public PremiumState apply(PremiumState currentState) {
      if (premiumOverride != null) {
        return new PremiumState(premiumOverride, BigDecimal.ZERO);
      }
      if (premiumDelta != null) {
        return new PremiumState(currentState.base(), currentState.delta().add(premiumDelta));
      }
      return currentState;
    }

    @JsonIgnore
    public boolean isTerminal() {
      return switch (decision) {
        case DECLINE, REFER -> true;
        case ACCEPT -> stop;
      };
    }
  }
}
