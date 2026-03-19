package com.munichre.streamline.rule.api.dto;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.munichre.streamline.rule.model.RuleConfig;
import java.math.BigDecimal;
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

  @Nested
  @DisplayName("RuleConfigResponseDto.Condition.of()")
  class OfCondition {
    @Test
    @DisplayName("Should return null when condition is null")
    void returnsNullWhenConditionIsNull() {
      assertThat(RuleConfigResponseDto.Condition.of(null)).isNull();
    }

    @Test
    @DisplayName("Should map valid condition")
    void mapsValidCondition() {
      RuleConfig.Condition mockCondition = mock(RuleConfig.Condition.class);
      when(mockCondition.field()).thenReturn("age");
      when(mockCondition.operator()).thenReturn(null);
      when(mockCondition.value()).thenReturn("25");

      RuleConfigResponseDto.Condition result = RuleConfigResponseDto.Condition.of(mockCondition);

      assertThat(result).isNotNull();
      assertThat(result.field()).isEqualTo("age");
      assertThat(result.value()).isEqualTo("25");
    }
  }

  @Nested
  @DisplayName("RuleConfigResponseDto.Then.of()")
  class OfThen {
    @Test
    @DisplayName("Should return null when 'then' is null")
    void returnsNullWhenThenIsNull() {
      assertThat(RuleConfigResponseDto.Then.of(null)).isNull();
    }

    @Test
    @DisplayName("Should map valid 'then' object")
    void mapsValidThen() {
      RuleConfig.Then mockThen = mock(RuleConfig.Then.class);
      when(mockThen.decision()).thenReturn(null);
      when(mockThen.premiumOverride()).thenReturn(BigDecimal.TEN);
      when(mockThen.premiumDelta()).thenReturn(BigDecimal.ONE);
      when(mockThen.stop()).thenReturn(true);

      RuleConfigResponseDto.Then result = RuleConfigResponseDto.Then.of(mockThen);

      assertThat(result).isNotNull();
      assertThat(result.premiumOverride()).isEqualTo(BigDecimal.TEN);
      assertThat(result.stop()).isTrue();
    }
  }
}
