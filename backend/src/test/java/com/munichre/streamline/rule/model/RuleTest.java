package com.munichre.streamline.rule.model;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

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

    @Test
    @DisplayName("returns false when whenConfig is null")
    void returnsFalseWhenWhenConfigIsNull() {
      RuleConfig mockConfig = mock(RuleConfig.class);
      when(mockConfig.when()).thenReturn(null);

      rule.setRuleConfig(mockConfig);

      assertThat(rule.isTriggeredBy(mockApplicantData)).isFalse();
    }

    @Test
    @DisplayName("delegates logic to ruleConfig when present")
    void delegatesToRuleConfig() {
      RuleConfig mockConfig = mock(RuleConfig.class);
      RuleConfig.When mockWhen = mock(RuleConfig.When.class);

      when(mockConfig.when()).thenReturn(mockWhen);
      when(mockWhen.isSatisfiedBy(mockApplicantData)).thenReturn(true);

      rule.setRuleConfig(mockConfig);

      assertThat(rule.isTriggeredBy(mockApplicantData)).isTrue();
    }
  }
}
