package com.munichre.streamline.product.api.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class UpdateProductRequestDto {
  String name;
  String description;
  BigDecimal baseRate;
  LocalDateTime startDate;
  LocalDateTime endDate;
  List<UUID> coverages;
  List<UUID> exclusions;
  List<UUID> tags;
}
