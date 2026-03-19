package com.munichre.streamline.rule.model;

import static org.assertj.core.api.Assertions.assertThat;

import java.math.BigDecimal;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class PremiumStateTest {

  @Test
  @DisplayName("calculateTotal() handles null delta as zero")
  void calculateTotal_WithNullDelta_ReturnsBaseScaled() {
    PremiumState state = new PremiumState(new BigDecimal("100"), null);
    assertThat(state.calculateTotal()).isEqualByComparingTo("100.00");
  }

  @Test
  @DisplayName("calculateTotal() calculates 10% increase correctly")
  void calculateTotal_WithPositiveDelta_CalculatesCorrectTotal() {
    PremiumState state = new PremiumState(new BigDecimal("100.00"), new BigDecimal("0.10"));
    assertThat(state.calculateTotal()).isEqualByComparingTo("110.00");
  }
}
