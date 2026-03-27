package com.munichre.streamline.product.api.dto;

import java.util.List;
import java.util.UUID;

public record FormSectionInput(
    String name, String label, Integer displayOrder, List<UUID> fieldIds) {}
