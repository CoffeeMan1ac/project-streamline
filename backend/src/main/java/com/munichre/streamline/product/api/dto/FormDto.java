package com.munichre.streamline.product.api.dto;

import java.util.List;
import java.util.UUID;

public record FormDto(UUID id, String name, String description, List<FormSectionDto> sections) {}
