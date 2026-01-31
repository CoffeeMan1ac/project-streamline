package com.munichre.projectstreamline.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuoteResponse {
    private UUID decisionId;
    private DecisionStatus status;
    private BigDecimal premium;
    private String currency;
    private LocalDateTime validUntil;
    private String reason;
    private List<String> rulesApplied;
}
