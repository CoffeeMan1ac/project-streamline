package com.munichre.streamline.rule.api.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

class RuleResponseTest {

  @Nested
  @DisplayName("RuleResponse.of()")
  class OfRule {

    @Test
    @DisplayName("Should return null when the rule is null")
    void returnsNullWhenRuleIsNull() {
      assertThat(RuleResponse.of(null)).isNull();
    }
  }
}
