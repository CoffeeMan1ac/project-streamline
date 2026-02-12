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
}