package com.munichre.streamline.rule.model;

import java.math.BigDecimal;
import java.math.RoundingMode;

public record PremiumState(BigDecimal base, BigDecimal delta) {
  public BigDecimal calculateTotal() {
    BigDecimal safeDelta = delta == null ? BigDecimal.ZERO : delta;
    BigDecimal multiplier = BigDecimal.ONE.add(safeDelta);
    return base.multiply(multiplier).setScale(2, RoundingMode.HALF_UP);
  }
}
