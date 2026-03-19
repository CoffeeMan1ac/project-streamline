package com.munichre.streamline.decision.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;

import com.munichre.streamline.decision.dto.Decision;
import com.munichre.streamline.decision.model.DecisionStatus;
import com.munichre.streamline.product.model.Product;
import com.munichre.streamline.product.service.ProductService;
import com.munichre.streamline.quote.api.dto.QuoteRequest;
import com.munichre.streamline.quote.model.ApplicantData;
import com.munichre.streamline.rule.model.PremiumState;
import com.munichre.streamline.rule.model.Rule;
import com.munichre.streamline.rule.model.RuleConfig;
import com.munichre.streamline.rule.model.RuleConfig.Then;
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

    @Test
    void skipsRulesThatAreNotTriggered() {
      when(productService.getProduct(productId)).thenReturn(mockProduct);

      Rule rule = mock(Rule.class);
      when(rule.isTriggeredBy(mockApplicantData)).thenReturn(false);

      when(ruleService.findByProductIdAndActiveTrueOrderByPriorityAsc(productId))
          .thenReturn(List.of(rule));

      Decision result = decisionService.decide(request);

      assertThat(result.status()).isEqualTo(DecisionStatus.ACCEPT);
      assertThat(result.rulesApplied()).isEmpty();
      verify(rule).isTriggeredBy(mockApplicantData);
    }

    @Test
    void returnsTerminalDecisionImmediately() {
      when(productService.getProduct(productId)).thenReturn(mockProduct);

      Rule terminalRule = mock(Rule.class);
      RuleConfig config = mock(RuleConfig.class);
      Then thenOutcome = mock(Then.class);

      when(terminalRule.getName()).thenReturn("Terminal Rule");
      when(terminalRule.isTriggeredBy(mockApplicantData)).thenReturn(true);
      when(terminalRule.getRuleConfig()).thenReturn(config);
      when(config.then()).thenReturn(thenOutcome);

      when(thenOutcome.isTerminal()).thenReturn(true);
      when(thenOutcome.apply(any(PremiumState.class)))
          .thenReturn(new PremiumState(BigDecimal.ZERO, BigDecimal.ZERO));

      Rule secondRule = mock(Rule.class);

      when(ruleService.findByProductIdAndActiveTrueOrderByPriorityAsc(productId))
          .thenReturn(List.of(terminalRule, secondRule));

      Decision result = decisionService.decide(request);

      assertThat(result.rulesApplied()).containsExactly("Terminal Rule");
      verifyNoInteractions(secondRule);
    }

    @Test
    void accumulatesPremiumAcrossMultipleTriggeredRules() {
      when(productService.getProduct(productId)).thenReturn(mockProduct);

      Rule rule1 =
          createMockRule(
              "Rule 1", false, new PremiumState(new BigDecimal("120.00"), BigDecimal.ZERO));

      Rule rule2 =
          createMockRule(
              "Rule 2", false, new PremiumState(new BigDecimal("130.00"), BigDecimal.ZERO));

      when(ruleService.findByProductIdAndActiveTrueOrderByPriorityAsc(productId))
          .thenReturn(List.of(rule1, rule2));

      Decision result = decisionService.decide(request);

      assertThat(result.status()).isEqualTo(DecisionStatus.ACCEPT);
      assertThat(result.premium()).isEqualByComparingTo("130.00");
      assertThat(result.rulesApplied()).containsExactly("Rule 1", "Rule 2");
    }
  }

  private Rule createMockRule(String name, boolean isTerminal, PremiumState resultingState) {
    Rule rule = mock(Rule.class);
    RuleConfig config = mock(RuleConfig.class);
    Then then = mock(Then.class);

    when(rule.getName()).thenReturn(name);
    when(rule.isTriggeredBy(any())).thenReturn(true);
    when(rule.getRuleConfig()).thenReturn(config);
    when(config.then()).thenReturn(then);
    when(then.isTerminal()).thenReturn(isTerminal);
    when(then.apply(any(PremiumState.class))).thenReturn(resultingState);

    return rule;
  }
}
