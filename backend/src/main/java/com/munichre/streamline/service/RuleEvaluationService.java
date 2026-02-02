package com.munichre.streamline.service;

import com.munichre.streamline.dto.EvaluationResult;
import java.util.Map;

public interface RuleEvaluationService {
    EvaluationResult evaluate(Map<String, Object> data);
}
