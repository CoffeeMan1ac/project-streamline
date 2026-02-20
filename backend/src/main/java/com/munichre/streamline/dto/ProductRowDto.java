package com.munichre.streamline.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

public record ProductRowDto(
    UUID id,
    BigDecimal baseRate,
    String name,
    String description,
    LocalDateTime startDate,
    LocalDateTime endDate,
    boolean active,
    UUID typeId,
    String typeCode,
    String typeLabel) {}
