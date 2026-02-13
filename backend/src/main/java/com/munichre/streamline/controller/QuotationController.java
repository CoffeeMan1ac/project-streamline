package com.munichre.streamline.controller;

import com.munichre.streamline.dto.EvaluationResult;
import com.munichre.streamline.service.QuotationService;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/quotes")
@RequiredArgsConstructor
public class QuotationController {

  private final QuotationService quotationService;

  @PostMapping
  public ResponseEntity<EvaluationResult> createQuote(@RequestBody Map<String, Object> payload) {
    EvaluationResult result = quotationService.createQuote(payload);
    return ResponseEntity.ok(result);
  }
}
