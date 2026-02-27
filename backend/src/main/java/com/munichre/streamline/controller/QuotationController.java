package com.munichre.streamline.controller;

import com.munichre.streamline.dto.EvaluationResult;
import com.munichre.streamline.service.QuotationService;
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
@RequestMapping("/api/quotes")
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
            content = @Content(schema = @Schema(implementation = EvaluationResult.class))),
        @ApiResponse(responseCode = "400", description = "Invalid request payload"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
      })
  @PostMapping
  public ResponseEntity<EvaluationResult> createQuote(@RequestBody Map<String, Object> payload) {
    EvaluationResult result = quotationService.createQuote(payload);
    return ResponseEntity.ok(result);
  }
}
