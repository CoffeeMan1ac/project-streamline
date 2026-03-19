package com.munichre.streamline.quote.api.controller;

import static com.munichre.streamline.constant.ApiRoutes.CUSTOMER_API_BASE;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.munichre.streamline.quote.api.dto.QuoteRequest;
import com.munichre.streamline.quote.api.dto.QuoteResponse;
import com.munichre.streamline.quote.model.ApplicantData;
import com.munichre.streamline.quote.model.QuotationStatus;
import com.munichre.streamline.quote.service.QuotationService;
import java.math.BigDecimal;
import java.util.UUID;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(QuotationController.class)
@AutoConfigureMockMvc(addFilters = false)
class QuotationControllerTest {

  @Autowired private MockMvc mockMvc;

  @Autowired private ObjectMapper objectMapper;

  @MockitoBean private QuotationService quotationService;

  private final String baseUrl = CUSTOMER_API_BASE + "/quote";

  @Nested
  @DisplayName("POST /quote")
  class CreateQuote {
    @Test
    @DisplayName("should return 200 and the 4-field quote response")
    void returns200AndQuoteResponse() throws Exception {
      var request = new QuoteRequest(UUID.randomUUID(), new ApplicantData());
      var response =
          new QuoteResponse(
              "REF-123", QuotationStatus.ACCEPTED, new BigDecimal("150.00"), "Criteria met");

      when(quotationService.createQuote(any(QuoteRequest.class))).thenReturn(response);

      mockMvc
          .perform(
              post(baseUrl)
                  .contentType(MediaType.APPLICATION_JSON)
                  .content(objectMapper.writeValueAsString(request))
                  .accept(MediaType.APPLICATION_JSON))
          .andExpect(status().isOk())
          .andExpect(jsonPath("$.reference").value("REF-123"))
          .andExpect(jsonPath("$.status").value("ACCEPTED"))
          .andExpect(jsonPath("$.premium").value(150.00));

      verify(quotationService).createQuote(any(QuoteRequest.class));
    }

    @Test
    @DisplayName("POST /quote: Should return 400 when applicantData is missing")
    void shouldReturn400WhenRequestIsInvalid() throws Exception {
      var invalidRequest = new QuoteRequest(UUID.randomUUID(), null);

      mockMvc
          .perform(
              post(baseUrl)
                  .contentType(MediaType.APPLICATION_JSON)
                  .content(objectMapper.writeValueAsString(invalidRequest)))
          .andExpect(status().isBadRequest())
          .andExpect(jsonPath("$.message").value("Invalid request payload: applicantData"));
    }
  }

  @Nested
  @DisplayName("GET /quote/{reference}")
  class GetQuoteByReference {
    @Test
    @DisplayName("should return 200 and the quote when reference is valid")
    void returns200AndQuote() throws Exception {
      String reference = "REF-456";
      var response =
          new QuoteResponse(reference, QuotationStatus.REFERRED, null, "Manual check required");

      when(quotationService.getQuoteByReference(reference)).thenReturn(response);

      mockMvc
          .perform(get(baseUrl + "/{reference}", reference).accept(MediaType.APPLICATION_JSON))
          .andExpect(status().isOk())
          .andExpect(jsonPath("$.reference").value(reference))
          .andExpect(jsonPath("$.status").value("REFERRED"));

      verify(quotationService).getQuoteByReference(reference);
      verifyNoMoreInteractions(quotationService);
    }
  }
}
