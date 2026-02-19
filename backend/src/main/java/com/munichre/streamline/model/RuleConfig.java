package com.munichre.streamline.model;

import java.math.BigDecimal;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RuleConfig {

  private WhenClause when;
  private ThenClause then;
  private Boolean stop;

  @Data
  @NoArgsConstructor
  @AllArgsConstructor
  public static class WhenClause {
    /** "all" = AND (every condition must match), "one" = OR (any condition matches) */
    private String match;

    private List<Condition> conditions;
  }

  @Data
  @NoArgsConstructor
  @AllArgsConstructor
  public static class Condition {
    private String field;
    private String operator;
    private String value;
  }

  @Data
  @NoArgsConstructor
  @AllArgsConstructor
  public static class ThenClause {
    /** ACCEPT, DECLINE, or REFER */
    private String decision;

    /** Override premium to this exact value (null = no override) */
    private BigDecimal premiumOverride;

    /** Add/subtract this from premium (null = no change) */
    private BigDecimal premiumDelta;
  }
}
