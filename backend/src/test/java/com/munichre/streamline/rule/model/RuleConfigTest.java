package com.munichre.streamline.rule.model;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.munichre.streamline.decision.model.DecisionStatus;
import com.munichre.streamline.quote.model.ApplicantData;
import com.munichre.streamline.rule.exception.FieldNotFoundException;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

class RuleConfigTest {

  private final ApplicantData applicantData = new ApplicantData();

  @BeforeEach
  void setUp() {
    applicantData.clear();
  }

  @Test
  @DisplayName("RuleConfig: Verify record boilerplate (constructor, accessors, equals)")
  void shouldVerifyRuleConfigRecordIntegrity() {
    var when = new RuleConfig.When(MatchCriteria.ALL, List.of());
    var then = new RuleConfig.Then(DecisionStatus.ACCEPT, null, null, false);

    var config = new RuleConfig(when, then);

    assertThat(config.when()).isEqualTo(when);
    assertThat(config.then()).isEqualTo(then);

    var sameConfig = new RuleConfig(when, then);
    assertThat(config).isEqualTo(sameConfig);
    assertThat(config.hashCode()).isEqualTo(sameConfig.hashCode());
    assertThat(config.toString()).contains("RuleConfig");
  }

  @Nested
  @DisplayName("When: Match Criteria Logic")
  class WhenTests {

    @Test
    @DisplayName("Should return true when conditions list is null")
    void shouldReturnTrueWhenConditionsAreNull() {
      var when = new RuleConfig.When(MatchCriteria.ALL, null);
      assertThat(when.isSatisfiedBy(applicantData)).isTrue();
    }

    @Test
    @DisplayName("Should return true when conditions list is empty")
    void shouldReturnTrueWhenConditionsAreEmpty() {
      var when = new RuleConfig.When(MatchCriteria.ALL, List.of());
      assertThat(when.isSatisfiedBy(applicantData)).isTrue();
    }

    @Test
    @DisplayName("Should return true when all conditions match under ALL criteria")
    void shouldSatisfyAllConditionsWhenCriteriaIsAll() {
      applicantData.put("age", "30");

      var condition = new RuleConfig.Condition("age", Operator.GREATER_THAN, "20");
      var when = new RuleConfig.When(MatchCriteria.ALL, List.of(condition));

      assertThat(when.isSatisfiedBy(applicantData)).isTrue();
    }

    @Test
    @DisplayName("Should return false when conditions don't match under ANY criteria")
    void shouldSatisfyAnyConditionWhenCriteriaIsAny() {
      applicantData.put("age", "15");

      var condition = new RuleConfig.Condition("age", Operator.GREATER_THAN, "20");
      var when = new RuleConfig.When(MatchCriteria.ANY, List.of(condition));

      assertThat(when.isSatisfiedBy(applicantData)).isFalse();
    }
  }

  @Nested
  @DisplayName("Condition: Field Evaluation")
  class ConditionTests {

    @Test
    @DisplayName("Should throw FieldNotFoundException when key is missing from applicant data")
    void shouldThrowExceptionWhenFieldIsMissing() {
      var condition = new RuleConfig.Condition("unknown", Operator.EQUALS, "val");

      assertThatThrownBy(() -> condition.isSatisfiedBy(applicantData))
          .isInstanceOf(FieldNotFoundException.class);
    }

    @Test
    @DisplayName("Should evaluate true when operator logic matches field value")
    void shouldReturnTrueWhenOperatorMatchesValue() {
      applicantData.put("status", "ACTIVE");

      var condition = new RuleConfig.Condition("status", Operator.EQUALS, "ACTIVE");

      assertThat(condition.isSatisfiedBy(applicantData)).isTrue();
    }
  }
}
