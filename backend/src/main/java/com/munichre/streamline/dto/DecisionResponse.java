package com.munichre.streamline.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DecisionResponse {
    private UUID id;
    private Map<String, Object> requestData;
    private DecisionStatus status;
    private BigDecimal premium;
    private String reason;
    private List<String> rulesApplied;
    private Long processingTimeMs;
    private LocalDateTime createdAt;
}
