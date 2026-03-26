package com.munichre.streamline.quote.api.dto;

import com.munichre.streamline.decision.model.DecisionTraceEntry;
import com.munichre.streamline.quote.model.ApplicantData;
import com.munichre.streamline.quote.model.Quotation;
import com.munichre.streamline.quote.model.QuotationStatus;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record QuoteDetail(
    UUID id,
    String reference,
    QuotationStatus status,
    String reason,
    List<String> rulesApplied,
    List<DecisionTraceEntry> decisionTrace,
    ApplicantData customerInput,
    BigDecimal premium,
    BigDecimal baseRate,
    long processingTimeMs,
    LocalDateTime createdAt,
    String productName) {

  public static QuoteDetail from(Quotation quotation) {
    return new QuoteDetail(
        quotation.getId(),
        quotation.getReference(),
        quotation.getStatus(),
        quotation.getReason(),
        quotation.getRulesApplied(),
        quotation.getDecisionTrace(),
        quotation.getCustomerInput(),
        quotation.getPremium(),
        quotation.getProduct() != null ? quotation.getProduct().getBaseRate() : null,
        quotation.getProcessingTimeMs(),
        quotation.getCreatedAt(),
        quotation.getProduct() != null ? quotation.getProduct().getName() : null);
  }
}
