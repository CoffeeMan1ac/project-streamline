package com.munichre.streamline.quote.model;

import com.munichre.streamline.decision.model.DecisionStatus;

public enum QuotationStatus {
  ACCEPTED,
  DECLINED,
  REFERRED;

  public static QuotationStatus from(DecisionStatus decisionStatus) {
    return switch (decisionStatus) {
      case ACCEPT -> ACCEPTED;
      case DECLINE -> DECLINED;
      case REFER -> REFERRED;
    };
  }
}
