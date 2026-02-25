package com.munichre.streamline.product.api.dto;

import java.util.UUID;

public record ProductTypeDto(UUID id, String code, String label) {}
