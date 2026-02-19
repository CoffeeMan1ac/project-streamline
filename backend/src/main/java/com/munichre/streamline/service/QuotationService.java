package com.munichre.streamline.service;

import com.munichre.streamline.dto.EvaluationResult;
import com.munichre.streamline.model.Quotation;
import com.munichre.streamline.repository.QuotationRepository;
import java.util.Map;
import java.security.SecureRandom;
import java.util.UUID;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class QuotationService {

  private static final SecureRandom RNG = new SecureRandom();
  private static final char[] LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".toCharArray();

  private final DecisionService decisionService;
  private final QuotationRepository quotationRepository;

  public EvaluationResult createQuote(Map<String, Object> payload) {
    EvaluationResult evaluation = decisionService.evaluate(payload);

    Quotation quotation =
        Quotation.builder()
            .reference(generateUniqueReference())
            .status(evaluation.getStatus())
            .reason(evaluation.getReason())
            .rulesApplied(evaluation.getRulesApplied())
            .premium(evaluation.getPremium())
            .processingTimeMs(evaluation.getProcessingTimeMs())
            .build();

    quotationRepository.save(quotation);
    evaluation.setReference(quotation.getReference());

    return evaluation;
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

