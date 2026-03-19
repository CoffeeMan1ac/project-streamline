package com.munichre.streamline.decision.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.munichre.streamline.decision.dto.Decision;
import com.munichre.streamline.decision.model.DecisionStatus;
import com.munichre.streamline.product.model.Product;
import com.munichre.streamline.product.service.ProductService;
import com.munichre.streamline.quote.api.dto.QuoteRequest;
import com.munichre.streamline.quote.model.ApplicantData;
import com.munichre.streamline.rule.service.RuleService;
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
public class DecisionServiceTest {

  @Mock private ProductService productService;
  @Mock private RuleService ruleService;

  @InjectMocks private DecisionService decisionService;

  private UUID productId;
  private QuoteRequest request;
  private Product mockProduct;
  private ApplicantData mockApplicantData;

  @BeforeEach
  void setUp() {
    productId = UUID.randomUUID();
    mockApplicantData = mock(ApplicantData.class);
    request = new QuoteRequest(productId, mockApplicantData);

    mockProduct = new Product();
    mockProduct.setId(productId);
    mockProduct.setBaseRate(new BigDecimal("100.00"));
  }

  @Nested
  @DisplayName("decide()")
  public class Decide {

    @Test
    void returnsAutoAcceptWhenNoRulesExist() {
      when(productService.getProduct(productId)).thenReturn(mockProduct);
      when(ruleService.findByProductIdAndActiveTrueOrderByPriorityAsc(productId))
          .thenReturn(List.of());

      Decision result = decisionService.decide(request);

      assertThat(result.status()).isEqualTo(DecisionStatus.ACCEPT);
      assertThat(result.premium()).isEqualByComparingTo("100.00");
      assertThat(result.rulesApplied()).isEmpty();

      verify(productService).getProduct(productId);
      verify(ruleService).findByProductIdAndActiveTrueOrderByPriorityAsc(productId);
    }
  }
}
