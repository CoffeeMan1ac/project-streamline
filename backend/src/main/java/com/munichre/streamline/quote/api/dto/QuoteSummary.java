package com.munichre.streamline.quote.api.dto;

import com.munichre.streamline.quote.model.Quotation;
import com.munichre.streamline.quote.model.QuotationStatus;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public record QuoteSummary(
    String reference,
    QuotationStatus status,
    BigDecimal premium,
    LocalDateTime createdAt,
    String reason,
    String customerName,
    String customerEmail,
    String product) {

  public static QuoteSummary from(Quotation quotation) {
    var input = quotation.getCustomerInput();

    String firstName = input != null ? (String) input.get("firstName") : null;
    String lastName = input != null ? (String) input.get("lastName") : null;
    String customerName =
        (firstName != null || lastName != null)
            ? ((firstName != null ? firstName : "") + " " + (lastName != null ? lastName : ""))
                .trim()
            : null;

    String email = input != null ? (String) input.get("emailAddress") : null;

    return new QuoteSummary(
        quotation.getReference(),
        quotation.getStatus(),
        quotation.getPremium(),
        quotation.getCreatedAt(),
        quotation.getReason(),
        customerName,
        email,
        quotation.getProduct() != null ? quotation.getProduct().getName() : null);
  }
}
