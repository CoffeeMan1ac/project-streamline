package com.munichre.streamline.product.api.dto;

import java.util.UUID;

public record CreateCoverageRequestDto(String code, String label, UUID categoryId, UUID typeId) {}
