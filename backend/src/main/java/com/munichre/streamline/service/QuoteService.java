package com.munichre.streamline.service;

import com.munichre.streamline.dto.EvaluationResult;
import com.munichre.streamline.model.Quotation;
import com.munichre.streamline.repository.QuotationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class QuotationService {

    private final DecisionService decisionService;
    private final QuotationRepository quotationRepository;

    public EvaluationResult createQuote(Map<String, Object> payload) {
        EvaluationResult evaluation = decisionService.evaluate(payload);

        Quotation quotation = Quotation.builder()
                .status(evaluation.getStatus())
                .reason(evaluation.getReason())
                .rulesApplied(evaluation.getRulesApplied())
                .premium(evaluation.getPremium())
                .processingTimeMs(evaluation.getProcessingTimeMs())
                .build();

        quotationRepository.save(quotation);

        return evaluation;
    }
}
