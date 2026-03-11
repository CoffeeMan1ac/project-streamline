package com.munichre.streamline.product.api.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class CreateProductRequestDto {

  String name;
  String description;
  BigDecimal baseRate;
  UUID typeId;
  LocalDateTime startDate;
  LocalDateTime endDate;

  List<UUID> coverageIds;
  List<UUID> exclusionIds;
  List<UUID> tagIds;
}
