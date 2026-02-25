package com.munichre.streamline.product.repository.dto;

import java.util.UUID;

public record ProductCoverageRowDto(
    UUID productId,
    UUID coverageId,
    String coverageCode,
    String coverageLabel,
    UUID categoryId,
    String categoryCode,
    String categoryLabel) {}
