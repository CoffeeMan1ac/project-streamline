package com.munichre.streamline.quote.service;

import com.munichre.streamline.decision.dto.Decision;
import com.munichre.streamline.decision.service.DecisionService;
import com.munichre.streamline.quote.api.dto.QuoteRequest;
import com.munichre.streamline.quote.api.dto.QuoteResponse;
import com.munichre.streamline.quote.exception.QuoteNotFoundException;
import com.munichre.streamline.quote.model.Quotation;
import com.munichre.streamline.quote.model.QuotationStatus;
import com.munichre.streamline.quote.repository.QuotationRepository;
import java.security.SecureRandom;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class QuotationService {

  private static final SecureRandom RNG = new SecureRandom();
  private static final char[] LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".toCharArray();

  private final DecisionService decisionService;
  private final QuotationRepository quotationRepository;

  public QuoteResponse createQuote(QuoteRequest quoteRequest) {
    Decision decision = decisionService.decide(quoteRequest);

    Quotation quotation =
        Quotation.builder()
            .reference(generateUniqueReference())
            .status(QuotationStatus.from(decision.status()))
            .reason(decision.reason())
            .rulesApplied(decision.rulesApplied())
            .customerInput(quoteRequest.applicantData())
            .premium(decision.premium())
            .processingTimeMs(decision.processingTimeMs())
            .build();

    Quotation savedQuotation = quotationRepository.save(quotation);

    return QuoteResponse.from(savedQuotation);
  }

  public QuoteResponse getQuoteByReference(String reference) {
    Quotation quotation =
        quotationRepository
            .findByReference(reference)
            .orElseThrow(() -> new QuoteNotFoundException(null));

    return QuoteResponse.from(quotation);
  }

  private String generateReference() {
    int numbers = RNG.nextInt(1000); // 000-999
    char a = LETTERS[RNG.nextInt(26)];
    char b = LETTERS[RNG.nextInt(26)];
    char c = LETTERS[RNG.nextInt(26)];
    return String.format("%03d%c%c%c", numbers, a, b, c);
  }

  private String generateUniqueReference() {
    String ref;
    do {
      ref = generateReference();
    } while (quotationRepository.existsByReference(ref));
    return ref;
  }
}
