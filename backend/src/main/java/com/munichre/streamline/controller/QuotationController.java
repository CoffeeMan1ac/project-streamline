package com.munichre.streamline.controller;

import com.munichre.streamline.dto.QuoteRequest;
import com.munichre.streamline.dto.QuoteResponse;
import com.munichre.streamline.service.QuoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/quotes")
@RequiredArgsConstructor
public class QuotationController {
    private final QuoteService quoteService;

    @PostMapping
    public ResponseEntity<QuoteResponseDto> createQuote(
            @RequestBody QuoteRequest request) {

        QuoteResponse response = quoteService.createQuote(request);

        return ResponseEntity.status(201).body(response);
    }
}