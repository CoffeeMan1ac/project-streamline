package com.munichre.streamline.quote.api.dto;

import com.munichre.streamline.quote.model.Quotation;
import com.munichre.streamline.quote.model.QuotationStatus;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public record QuoteSummary(
    String reference, QuotationStatus status, BigDecimal premium, LocalDateTime createdAt, String reason) {

  public static QuoteSummary from(Quotation quotation) {
    return new QuoteSummary(
        quotation.getReference(),
        quotation.getStatus(),
        quotation.getPremium(),
        quotation.getCreatedAt(),
        quotation.getReason());
  }
}
