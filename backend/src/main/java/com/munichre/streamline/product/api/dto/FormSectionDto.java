package com.munichre.streamline.product.api.dto;

import java.util.List;
import java.util.UUID;

public record FormSectionDto(
    UUID id, String name, String label, Integer displayOrder, List<FieldDto> fields) {}
