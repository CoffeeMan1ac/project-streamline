package com.munichre.streamline.product.repository.dto;

import java.util.UUID;

public record ProductTagRowDto(UUID productId, UUID id, String code, String label, String color) {}
