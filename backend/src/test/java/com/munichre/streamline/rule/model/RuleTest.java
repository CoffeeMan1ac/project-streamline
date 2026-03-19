package com.munichre.streamline.rule.model;

import static org.assertj.core.api.Assertions.assertThat;

import com.munichre.streamline.quote.model.ApplicantData;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class RuleTest {

  @Mock private ApplicantData mockApplicantData;

  private Rule rule;

  @BeforeEach
  void setUp() {
    rule = new Rule();
  }

  @Nested
  @DisplayName("isTriggeredBy()")
  class IsTriggeredBy {

    @Test
    @DisplayName("returns false when ruleConfig is null")
    void returnsFalseWhenRuleConfigIsNull() {
      rule.setRuleConfig(null);
      assertThat(rule.isTriggeredBy(mockApplicantData)).isFalse();
    }
  }
}
