package com.munichre.streamline.decision.model;

import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DecisionTraceEntry {
    private String ruleName;
    private String ruleDescription;
    private Boolean isOverride;
    private BigDecimal adjustmentAmount;
    private String outcome;
}
