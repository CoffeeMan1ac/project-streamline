package com.munichre.streamline.decision.dto;

import com.munichre.streamline.decision.model.DecisionStatus;
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
public class Decision {
  private String reference;
  private DecisionStatus status;
  private String reason;
  @Builder.Default private List<String> rulesApplied = new ArrayList<>();
  private BigDecimal premium;
  private long processingTimeMs;
  @Builder.Default private boolean evaluationStopped = false;
  private String stoppedByRule;

  public static Decision accepted(BigDecimal premium) {
    return Decision.builder()
        .status(DecisionStatus.ACCEPTED)
        .premium(premium)
        .rulesApplied(new ArrayList<>())
        .build();
  }

  public static Decision declined(String reason, String ruleName) {
    return Decision.builder()
        .status(DecisionStatus.DECLINED)
        .reason(reason)
        .rulesApplied(List.of(ruleName))
        .build();
  }

  public static Decision refer(String reason, String ruleName) {
    return Decision.builder()
        .status(DecisionStatus.REFER)
        .reason(reason)
        .rulesApplied(List.of(ruleName))
        .build();
  }
}
