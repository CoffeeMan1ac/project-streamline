package com.munichre.streamline.rule.api.dto;

import com.munichre.streamline.rule.model.RuleConfig;

public record RuleUpdateRequest(
    String name, String description, Boolean active, String reason, RuleConfig ruleConfig) {}
