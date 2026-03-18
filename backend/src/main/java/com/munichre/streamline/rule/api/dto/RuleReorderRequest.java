package com.munichre.streamline.rule.api.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import java.util.UUID;

public record RuleReorderRequest(
    @NotNull UUID product, @NotNull UUID rule, @NotNull @Min(1) Integer priority) {}
