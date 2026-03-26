package com.munichre.streamline.product.api.dto;

import java.util.UUID;

public record TagOptionDto(UUID id, String code, String label, String color) {}
