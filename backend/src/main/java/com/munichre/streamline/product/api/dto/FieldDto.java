package com.munichre.streamline.product.api.dto;

import java.util.List;
import java.util.UUID;

public record FieldDto(
    UUID id,
    String code,
    String type,
    String label,
    Boolean required,
    String regexPattern,
    List<String> options) {}
