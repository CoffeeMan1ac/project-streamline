package com.munichre.streamline.service;

import java.math.BigDecimal;
import java.util.Map;

public interface PremiumCalculator {
    BigDecimal calculate(Map<String, Object> data);
}
