package com.munichre.streamline.rule.model;

import static org.assertj.core.api.Assertions.assertThat;

import java.math.BigDecimal;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

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

  @Test
  @DisplayName("calculateTotal() calculates 20% discount correctly")
  void calculateTotal_WithNegativeDelta_CalculatesDiscount() {
    PremiumState state = new PremiumState(new BigDecimal("100.00"), new BigDecimal("-0.20"));
    assertThat(state.calculateTotal()).isEqualByComparingTo("80.00");
  }

  @Nested
  @DisplayName("Rounding Behavior")
  class RoundingTests {
    @ParameterizedTest
    @CsvSource({"10.554, 10.55", "10.555, 10.56", "10.556, 10.56"})
    @DisplayName("calculateTotal() rounds to 2 decimal places using HALF_UP")
    void roundingCheck(String inputPrice, String expectedOutput) {
      PremiumState state = new PremiumState(new BigDecimal(inputPrice), BigDecimal.ZERO);

      assertThat(state.calculateTotal()).isEqualByComparingTo(expectedOutput);
    }
  }
}
