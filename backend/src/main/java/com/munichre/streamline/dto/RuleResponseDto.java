package com.munichre.streamline.dto;

import com.munichre.streamline.model.Rule;
import java.time.LocalDateTime;
import java.util.UUID;

public record RuleResponseDto(
    UUID id,
    UUID productId,
    String name,
    String description,
    String reason,
    Integer priority,
    Boolean active,
    RuleConfigResponseDto ruleConfig,
    LocalDateTime createdAt,
    LocalDateTime updatedAt) {

  public static RuleResponseDto of(Rule r) {
    if (r == null) {
      return null;
    }
    return new RuleResponseDto(
        r.getId(),
        r.getProduct() != null ? r.getProduct().getId() : null,
        r.getName(),
        r.getDescription(),
        r.getReason(),
        r.getPriority(),
        r.getActive(),
        RuleConfigResponseDto.of(r.getRuleConfig()),
        r.getCreatedAt(),
        r.getUpdatedAt());
  }
}
