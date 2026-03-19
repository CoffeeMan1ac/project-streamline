package com.munichre.streamline.rule.api.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

class RuleConfigResponseDtoTest {

  @Nested
  @DisplayName("RuleConfigResponseDto.of()")
  class OfRuleConfig {
    @Test
    @DisplayName("Should return null when config is null")
    void returnsNullWhenConfigIsNull() {
      assertThat(RuleConfigResponseDto.of(null)).isNull();
    }
  }
}
