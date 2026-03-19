package com.munichre.streamline.rule.api.dto;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.munichre.streamline.rule.model.RuleConfig;
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

  @Nested
  @DisplayName("RuleConfigResponseDto.When.of()")
  class OfWhen {
    @Test
    @DisplayName("Should return null when 'when' is null")
    void returnsNullWhenWhenIsNull() {
      assertThat(RuleConfigResponseDto.When.of(null)).isNull();
    }

    @Test
    @DisplayName("Should handle null conditions list via ternary operator")
    void handlesNullConditionsList() {
      RuleConfig.When mockWhen = mock(RuleConfig.When.class);
      when(mockWhen.match()).thenReturn(null);
      when(mockWhen.conditions()).thenReturn(null);

      RuleConfigResponseDto.When result = RuleConfigResponseDto.When.of(mockWhen);

      assertThat(result).isNotNull();
      assertThat(result.conditions()).isNull();
    }
  }
}
