package com.munichre.projectstreamline.service;

import com.munichre.projectstreamline.dto.EvaluationResult;
import java.util.Map;

public interface RuleEvaluationService {
    EvaluationResult evaluate(Map<String, Object> data);
}
