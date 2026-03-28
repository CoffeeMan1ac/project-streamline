package com.munichre.streamline.product.api.dto;

import java.util.UUID;

public record UpdateCoverageRequestDto(String code, String label, UUID categoryId) {}
