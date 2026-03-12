package com.munichre.streamline.product.api.dto;

import java.util.List;

public record ProductFieldDto(
    String name, String type, String label, Boolean required, List<String> options) {}
