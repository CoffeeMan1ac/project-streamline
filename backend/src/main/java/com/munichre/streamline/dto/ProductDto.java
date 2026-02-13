package com.munichre.streamline.dto;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public record ProductDto(
    UUID id,
    BigDecimal baseRate,
    String name,
    String description,
    boolean mostPopular,
    ProductTypeDto type,
    List<CoverageDto> coverages,
    List<CoverageDto> exclusions) {}
