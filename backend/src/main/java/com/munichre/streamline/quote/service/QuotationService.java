package com.munichre.streamline.quote.service;

import com.munichre.streamline.decision.dto.Decision;
import com.munichre.streamline.decision.service.DecisionService;
import com.munichre.streamline.quote.api.dto.QuoteDetail;
import com.munichre.streamline.quote.api.dto.QuoteRequest;
import com.munichre.streamline.quote.api.dto.QuoteResponse;
import com.munichre.streamline.quote.api.dto.QuoteSummary;
import com.munichre.streamline.quote.exception.QuoteNotFoundException;
import com.munichre.streamline.quote.model.Quotation;
import com.munichre.streamline.quote.model.QuotationStatus;
import com.munichre.streamline.quote.repository.QuotationRepository;
import java.security.SecureRandom;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
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
    String ref = reference.toUpperCase(); // case insensitive
    Quotation quotation =
        quotationRepository.findByReference(ref).orElseThrow(() -> new QuoteNotFoundException(ref));

    return QuoteResponse.from(quotation);
  }

  public QuoteDetail getQuoteDetailByReference(String reference) {
    String ref = reference.toUpperCase(); // case insensitive
    Quotation quotation =
        quotationRepository.findByReference(ref).orElseThrow(() -> new QuoteNotFoundException(ref));

    return QuoteDetail.from(quotation);
  }

  /**
   * Finds the most recent quotations, optionally with partial matching.
   *
   * @param [pageNumber] Defaults to 0
   * @param [pageSize] Defaults to 50
   * @param [prefix] Beginning of reference id
   * @return
   */
  public List<QuoteSummary> findRecentQuotations(
      Integer pageNumber, Integer pageSize, String partialRef) {
    if (pageNumber == null) pageNumber = 0;
    if (pageSize == null) pageSize = 50;

    List<Quotation> quotations;

    if (partialRef == null)
      quotations =
          quotationRepository.findAllByOrderByCreatedAtDesc(
              PageRequest.of(pageNumber, pageSize, Sort.by("createdAt").descending()));
    else
      quotations =
          quotationRepository.findByReferenceContaining(
              partialRef.toUpperCase(),
              PageRequest.of(pageNumber, pageSize, Sort.by("createdAt").descending()));

    return quotations.stream().map(QuoteSummary::from).toList();
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
