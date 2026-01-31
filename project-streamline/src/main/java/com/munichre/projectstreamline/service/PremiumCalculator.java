package com.munichre.projectstreamline.service;

import java.math.BigDecimal;
import java.util.Map;

public interface PremiumCalculator {
    BigDecimal calculate(Map<String, Object> data);
}
