package com.munichre.streamline.quote.api.dto;

import com.munichre.streamline.quote.model.Quotation;
import com.munichre.streamline.quote.model.QuotationStatus;
import java.math.BigDecimal;

public record QuoteResponse(
    String reference, QuotationStatus status, BigDecimal premium, String reason) {

  public static QuoteResponse from(Quotation quotation) {
    return new QuoteResponse(
        quotation.getReference(),
        quotation.getStatus(),
        quotation.getPremium(),
        quotation.getReason());
  }
}
