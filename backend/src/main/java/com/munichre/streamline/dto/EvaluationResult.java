package com.munichre.streamline.dto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EvaluationResult {
  private DecisionStatus status;
  private String reason;
  @Builder.Default private List<String> rulesApplied = new ArrayList<>();
  private BigDecimal premium;
  private long processingTimeMs;

  public static EvaluationResult accepted(BigDecimal premium) {
    return EvaluationResult.builder()
        .status(DecisionStatus.ACCEPTED)
        .premium(premium)
        .rulesApplied(new ArrayList<>())
        .build();
  }

  public static EvaluationResult declined(String reason, String ruleName) {
    return EvaluationResult.builder()
        .status(DecisionStatus.DECLINED)
        .reason(reason)
        .rulesApplied(List.of(ruleName))
        .build();
  }

  public static EvaluationResult refer(String reason, String ruleName) {
    return EvaluationResult.builder()
        .status(DecisionStatus.REFER)
        .reason(reason)
        .rulesApplied(List.of(ruleName))
        .build();
  }
}
