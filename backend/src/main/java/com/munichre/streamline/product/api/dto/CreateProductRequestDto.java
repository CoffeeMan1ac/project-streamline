package com.munichre.streamline.product.api.dto;

import lombok.Builder;
import lombok.Value;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Value
@Builder
public class CreateProductRequestDto {

    String name;
    String description;
    BigDecimal baseRate;
    UUID typeId;
    LocalDate startDate;
    LocalDate endDate;

    List<UUID> coverageIds;
    List<UUID> exclusionIds;
    List<UUID> tagIds;
}