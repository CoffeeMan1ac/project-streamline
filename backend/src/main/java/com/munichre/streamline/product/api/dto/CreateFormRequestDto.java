package com.munichre.streamline.product.api.dto;

import java.util.List;

public record CreateFormRequestDto(
    String name, String description, List<FormSectionInput> sections) {}
