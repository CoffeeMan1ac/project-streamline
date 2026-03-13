package com.munichre.streamline.quote.api.dto;

import com.munichre.streamline.decision.model.DecisionStatus;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
