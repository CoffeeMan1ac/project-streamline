package com.munichre.projectstreamline.service;

import com.munichre.projectstreamline.dto.DecisionResponse;
import com.munichre.projectstreamline.dto.QuoteRequest;
import com.munichre.projectstreamline.dto.QuoteResponse;
import java.util.UUID;

public interface QuoteService {
    QuoteResponse processQuote(QuoteRequest request);
    DecisionResponse getDecision(UUID id);
}
