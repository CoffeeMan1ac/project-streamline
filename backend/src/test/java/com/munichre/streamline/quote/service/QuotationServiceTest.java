package com.munichre.streamline.quote.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import com.munichre.streamline.decision.dto.Decision;
import com.munichre.streamline.decision.model.DecisionStatus;
import com.munichre.streamline.decision.service.DecisionService;
import com.munichre.streamline.quote.api.dto.QuoteRequest;
import com.munichre.streamline.quote.api.dto.QuoteResponse;
import com.munichre.streamline.quote.exception.MissingQuoteFieldException;
import com.munichre.streamline.quote.exception.QuoteNotFoundException;
import com.munichre.streamline.quote.model.ApplicantData;
import com.munichre.streamline.quote.model.Quotation;
import com.munichre.streamline.quote.repository.QuotationRepository;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
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
    mockRequest = new QuoteRequest(UUID.randomUUID(), new ApplicantData());

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
      when(quotationRepository.getNextReferenceValue()).thenReturn(1L);
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

  @Nested
  @DisplayName("getQuoteByReference: Retrieval")
  class GetQuoteTests {

    @Test
    @DisplayName("Should return quote response when reference is valid")
    void shouldReturnQuoteForValidReference() {
      String ref = "456XYZ";
      when(quotationRepository.findByReference(ref)).thenReturn(Optional.of(mockQuotation));

      QuoteResponse response = quotationService.getQuoteByReference(ref);

      assertThat(response).isNotNull();
      verify(quotationRepository).findByReference(ref);
    }

    @Test
    @DisplayName("Should throw QuoteNotFoundException when reference does not exist")
    void shouldThrowExceptionForMissingReference() {
      String ref = "INVALID";
      when(quotationRepository.findByReference(ref)).thenReturn(Optional.empty());

      assertThatThrownBy(() -> quotationService.getQuoteByReference(ref))
          .isInstanceOf(QuoteNotFoundException.class);
    }
  }

  @Nested
  @DisplayName("createQuote: Required Field Validation")
  class RequiredFieldValidation {

    @Test
    @DisplayName("Should throw when productId is null")
    void shouldThrowWhenProductIdIsNull() {
      QuoteRequest request = new QuoteRequest(null, new ApplicantData());

      assertThatThrownBy(() -> quotationService.createQuote(request))
          .isInstanceOf(MissingQuoteFieldException.class)
          .hasMessageContaining("productId");
    }

    @Test
    @DisplayName("Should throw when applicantData is null")
    void shouldThrowWhenApplicantDataIsNull() {
      QuoteRequest request = new QuoteRequest(UUID.randomUUID(), null);

      assertThatThrownBy(() -> quotationService.createQuote(request))
          .isInstanceOf(MissingQuoteFieldException.class)
          .hasMessageContaining("applicantData");
    }
  }
}
