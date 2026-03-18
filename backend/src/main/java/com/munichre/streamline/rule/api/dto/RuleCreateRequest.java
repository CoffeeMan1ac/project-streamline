package com.munichre.streamline.rule.api.dto;

import com.munichre.streamline.rule.model.RuleConfig;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.UUID;

public record RuleCreateRequest(
    @NotNull UUID product,
    @NotBlank String name,
    String description,
    Boolean active,
    String reason,
    @NotNull @Valid RuleConfig ruleConfig) {
  public RuleCreateRequest {
    if (active == null) active = true;
  }
}
