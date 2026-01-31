package com.munichre.projectstreamline.service;

public interface ConditionEvaluator {
    boolean evaluate(Object fieldValue, String operator, Object compareValue);
}
