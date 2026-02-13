package com.munichre.streamline.dto;

import java.util.UUID;

public record CoverageDto(
        UUID id,
        String code,
        String label,
        CoverageCategoryDto category) {
}
