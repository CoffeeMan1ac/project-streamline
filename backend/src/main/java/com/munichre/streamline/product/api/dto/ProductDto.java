package com.munichre.streamline.product.api.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record ProductDto(
    UUID id,
    BigDecimal baseRate,
    String name,
    String description,
    boolean active,
    LocalDateTime startDate,
    LocalDateTime endDate,
    List<ProductTagDto> tags,
    ProductTypeDto type,
    List<CoverageDto> coverages,
    List<CoverageDto> exclusions,
    List<ProductFieldDto> productFields,
    FormDto form) {}
