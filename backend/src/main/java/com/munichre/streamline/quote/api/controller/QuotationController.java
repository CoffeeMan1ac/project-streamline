package com.munichre.streamline.quote.api.controller;

import static com.munichre.streamline.constant.ApiRoutes.CUSTOMER_API_BASE;

import com.munichre.streamline.quote.api.dto.QuoteRequest;
import com.munichre.streamline.quote.api.dto.QuoteResponse;
import com.munichre.streamline.quote.service.QuotationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
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
            content = @Content(schema = @Schema(implementation = QuoteResponse.class))),
        @ApiResponse(responseCode = "400", description = "Invalid request payload"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
      })
  @PostMapping
  public ResponseEntity<QuoteResponse> createQuote(@Valid @RequestBody QuoteRequest request) {
    QuoteResponse response = quotationService.createQuote(request);
    return ResponseEntity.ok(response);
  }

  @GetMapping("/{reference}")
  public ResponseEntity<QuoteResponse> getQuoteByReference(@PathVariable String reference) {
    QuoteResponse response = quotationService.getQuoteByReference(reference);
    return ResponseEntity.ok(response);
  }
}
