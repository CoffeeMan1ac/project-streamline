package com.munichre.streamline.quote.api.controller;

import static com.munichre.streamline.constant.ApiRoutes.CUSTOMER_API_BASE;

import com.munichre.streamline.decision.dto.Decision;
import com.munichre.streamline.quote.service.QuotationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(CUSTOMER_API_BASE + "/quote")
@RequiredArgsConstructor
@Tag(name = "Quotes", description = "Quote evaluation & pricing")
public class QuotationController {

  private final QuotationService quotationService;

  @Operation(
      summary = "Create a quote",
      description = "Evaluates a quote request and returns pricing and decision results")
  @ApiResponses(
      value = {
        @ApiResponse(
            responseCode = "200",
            description = "Quote successfully evaluated",
            content = @Content(schema = @Schema(implementation = Decision.class))),
        @ApiResponse(responseCode = "400", description = "Invalid request payload"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
      })
  @PostMapping
  public ResponseEntity<Decision> createQuote(@RequestBody Map<String, Object> payload) {
    Decision result = quotationService.createQuote(payload);
    return ResponseEntity.ok(result);
  }

  @GetMapping("/{reference}")
  public ResponseEntity<Decision> getQuoteByReference(@PathVariable String reference) {
    Decision quote = quotationService.getQuoteByReference(reference);
    return ResponseEntity.ok(quote);
  }
}
