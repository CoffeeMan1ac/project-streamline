package com.munichre.streamline.quote.api.controller;

import static com.munichre.streamline.constant.ApiRoutes.BACKOFFICE_API_BASE;

import com.munichre.streamline.quote.api.dto.QuoteSummary;
import com.munichre.streamline.quote.service.QuotationService;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(BACKOFFICE_API_BASE + "/quote")
@RequiredArgsConstructor
@Tag(name = "Quotes", description = "Quote evaluation & pricing")
public class BackofficeQuotationController {

  private final QuotationService quotationService;

  @GetMapping("/recent")
  public ResponseEntity<List<QuoteSummary>> findRecentQuotations(
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "50") int pageSize,
      @RequestParam(required = false) String ref) {

    List<QuoteSummary> response = quotationService.findRecentQuotations(page, pageSize, ref);
    return ResponseEntity.ok(response);
  }
}
