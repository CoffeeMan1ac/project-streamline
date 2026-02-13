package com.munichre.streamline.service;

public interface ConditionEvaluator {
  boolean evaluate(Object fieldValue, String operator, Object compareValue);
}
