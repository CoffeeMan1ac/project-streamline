package com.munichre.streamline.product.api.dto;

import java.util.List;

public record CreateFieldRequestDto(
    String code,
    String type,
    String label,
    Boolean required,
    String regexPattern,
    List<String> options) {}
