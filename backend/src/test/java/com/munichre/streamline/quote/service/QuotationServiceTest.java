package com.munichre.streamline.quote.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

import com.munichre.streamline.decision.dto.Decision;
import com.munichre.streamline.decision.model.DecisionStatus;
import com.munichre.streamline.decision.service.DecisionService;
import com.munichre.streamline.quote.api.dto.QuoteRequest;
import com.munichre.streamline.quote.api.dto.QuoteResponse;
import com.munichre.streamline.quote.model.Quotation;
import com.munichre.streamline.quote.repository.QuotationRepository;
import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class QuotationServiceTest {

  @Mock private DecisionService decisionService;

  @Mock private QuotationRepository quotationRepository;

  @InjectMocks private QuotationService quotationService;

  private QuoteRequest mockRequest;
  private Decision mockDecision;
  private Quotation mockQuotation;

  @BeforeEach
  void setUp() {
    mockRequest = new QuoteRequest(UUID.randomUUID(), null);

    mockDecision =
        new Decision(
            DecisionStatus.ACCEPT,
            "All rules passed",
            List.of("AGE_CHECK", "BMI_CHECK"),
            new BigDecimal("250.00"),
            120L,
            true,
            "MAX_PREMIUM");

    mockQuotation = Quotation.builder().reference("456XYZ").build();
  }

  @Nested
  @DisplayName("createQuote: Logic and Generation")
  class CreateQuoteTests {

    @Test
    @DisplayName("Should successfully create a quote and map decision fields")
    void shouldCreateQuoteAndMapFields() {
      when(decisionService.decide(mockRequest)).thenReturn(mockDecision);
      when(quotationRepository.existsByReference(anyString())).thenReturn(false);
      when(quotationRepository.save(any(Quotation.class)))
          .thenAnswer(invocation -> invocation.getArgument(0));

      QuoteResponse response = quotationService.createQuote(mockRequest);

      assertThat(response).isNotNull();
      verify(decisionService).decide(mockRequest);
      verify(quotationRepository).save(any(Quotation.class));
    }

    @Test
    @DisplayName("Should loop and retry reference generation if a collision occurs")
    void shouldHandleReferenceCollision() {
      when(decisionService.decide(mockRequest)).thenReturn(mockDecision);
      when(quotationRepository.existsByReference(anyString())).thenReturn(true).thenReturn(false);
      when(quotationRepository.save(any(Quotation.class))).thenReturn(mockQuotation);

      quotationService.createQuote(mockRequest);

      verify(quotationRepository, times(2)).existsByReference(anyString());
    }
  }
}
