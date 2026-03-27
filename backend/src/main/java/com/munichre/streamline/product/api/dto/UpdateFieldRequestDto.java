package com.munichre.streamline.product.api.dto;

import java.util.List;

public record UpdateFieldRequestDto(
    String type,
    String label,
    Boolean required,
    String regexPattern,
    List<String> options) {}
