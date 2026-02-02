package com.munichre.streamline.service;

import com.munichre.streamline.dto.DecisionResponse;
import com.munichre.streamline.dto.QuoteRequest;
import com.munichre.streamline.dto.QuoteResponse;
import java.util.UUID;

public interface QuoteService {
    QuoteResponse processQuote(QuoteRequest request);
    DecisionResponse getDecision(UUID id);
}
