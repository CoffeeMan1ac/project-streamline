package com.munichre.streamline.rule.api.dto;

import java.util.List;

public record RuleValidationResponse(boolean valid, List<String> errors) {}
