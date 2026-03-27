package com.munichre.streamline.product.api.dto;

import java.util.List;

public record UpdateFormRequestDto(
    String name, String description, List<FormSectionInput> sections) {}
