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
      @RequestParam(defaultValue = "1") int page,
      @RequestParam(defaultValue = "50") int pageSize,
      @RequestParam(required = false) String ref) {

    // Front end would want to send page=1 for the first page. First page in the repo is page 0.
    // We dec to avoid off-by-one expectation. Also clamp to avoid underflow.
    page = Math.max(0, page - 1);
    List<QuoteSummary> response = quotationService.findRecentQuotations(page, pageSize, ref);
    return ResponseEntity.ok(response);
  }
}
