package com.munichre.streamline.quote.service;

import com.munichre.streamline.decision.dto.Decision;
import com.munichre.streamline.decision.service.DecisionService;
import com.munichre.streamline.product.model.Field;
import com.munichre.streamline.product.model.Form;
import com.munichre.streamline.product.model.Product;
import com.munichre.streamline.product.model.ProductField;
import com.munichre.streamline.product.service.ProductService;
import com.munichre.streamline.quote.api.dto.QuoteDetail;
import com.munichre.streamline.quote.api.dto.QuoteRequest;
import com.munichre.streamline.quote.api.dto.QuoteResponse;
import com.munichre.streamline.quote.api.dto.QuoteSummary;
import com.munichre.streamline.quote.exception.MissingRequiredFieldsException;
import com.munichre.streamline.quote.exception.QuoteNotFoundException;
import com.munichre.streamline.quote.model.ApplicantData;
import com.munichre.streamline.quote.model.Quotation;
import com.munichre.streamline.quote.model.QuotationStatus;
import com.munichre.streamline.quote.repository.QuotationRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class QuotationService {

  private static final char[] LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".toCharArray();
  private static final int LETTER_COMBINATIONS = 26 * 26 * 26;
  private static final int MAX_REFERENCE_SPACE = 1000 * LETTER_COMBINATIONS;

  private final DecisionService decisionService;
  private final ProductService productService;
  private final QuotationRepository quotationRepository;

  @Transactional
  public QuoteResponse createQuote(QuoteRequest quoteRequest) {
    validateRequiredProductFields(quoteRequest);

    Decision decision = decisionService.decide(quoteRequest);
    Product product = productService.getProduct(quoteRequest.productId());

    Long seq = quotationRepository.getNextReferenceValue();
    String reference = formatReference(seq);

    Quotation quotation =
        Quotation.builder()
            .reference(reference)
            .status(QuotationStatus.from(decision.status()))
            .reason(decision.reason())
            .rulesApplied(decision.rulesApplied())
            .decisionTrace(decision.decisionTrace())
            .customerInput(quoteRequest.applicantData())
            .premium(decision.premium())
            .processingTimeMs(decision.processingTimeMs())
            .product(product)
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

  private String formatReference(Long seq) {
    long index = seq - 1;

    if (index < 0 || index >= MAX_REFERENCE_SPACE) {
      throw new IllegalStateException("Reference space exhausted");
    }

    int numberPart = (int) (index / LETTER_COMBINATIONS);
    int letterIndex = (int) (index % LETTER_COMBINATIONS);

    char first = LETTERS[letterIndex / (26 * 26)];
    char second = LETTERS[(letterIndex / 26) % 26];
    char third = LETTERS[letterIndex % 26];

    return "%03d%c%c%c".formatted(numberPart, first, second, third);
  }

  private void validateRequiredProductFields(QuoteRequest request) {
    Product product = productService.getProduct(request.productId());
    ApplicantData data = request.applicantData();

    List<String> missing;

    // Prefer form-based fields if a form is assigned; fall back to legacy JSONB
    Form form = product.getForm();
    if (form != null && form.getSections() != null) {
      missing =
          form.getSections().stream()
              .flatMap(s -> s.getFields().stream())
              .filter(f -> Boolean.TRUE.equals(f.getRequired()))
              .map(Field::getCode)
              .filter(code -> data == null || data.get(code) == null)
              .toList();
    } else {
      List<ProductField> fields = product.getProductFields();
      if (fields == null || fields.isEmpty()) return;
      missing =
          fields.stream()
              .filter(f -> Boolean.TRUE.equals(f.getRequired()))
              .map(ProductField::getName)
              .filter(name -> data == null || data.get(name) == null)
              .toList();
    }

    if (!missing.isEmpty()) {
      throw new MissingRequiredFieldsException(missing);
    }
  }
}
