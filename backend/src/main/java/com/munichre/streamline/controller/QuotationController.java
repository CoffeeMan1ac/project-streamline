package com.munichre.streamline.controller;

import com.munichre.streamline.dto.EvaluationResult;
import com.munichre.streamline.service.DecisionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/quotes")
@RequiredArgsConstructor
public class QuotationController {

    private final DecisionService decisionService;

    @PostMapping
    public ResponseEntity<EvaluationResult> createQuote(@RequestBody Map<String, Object> payload) {
        EvaluationResult result = decisionService.evaluate(payload);
        return ResponseEntity.ok(result);
    }
}

