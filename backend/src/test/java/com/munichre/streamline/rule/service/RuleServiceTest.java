package com.munichre.streamline.rule.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import com.munichre.streamline.product.model.Product;
import com.munichre.streamline.product.service.ProductService;
import com.munichre.streamline.rule.api.dto.RuleCreateRequest;
import com.munichre.streamline.rule.model.Rule;
import com.munichre.streamline.rule.repository.RuleRepository;
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
class RuleServiceTest {

  @Mock private RuleRepository ruleRepository;

  @Mock private ProductService productService;

  @InjectMocks private RuleService ruleService;

  private UUID productId;
  private UUID ruleId;
  private Product mockProduct;
  private Rule mockRule;

  @BeforeEach
  void setUp() {
    productId = UUID.randomUUID();
    ruleId = UUID.randomUUID();

    mockProduct = new Product();
    mockProduct.setId(productId);

    mockRule = new Rule();
    mockRule.setId(ruleId);
    mockRule.setProduct(mockProduct);
    mockRule.setPriority(5);
    mockRule.setName("Original Rule Name");
  }

  @Nested
  @DisplayName("Rule Creation and Retrieval")
  class CrudTests {

    @Test
    @DisplayName("Should create rule with incremented priority based on existing max")
    void shouldCreateRuleWithCorrectPriority() {
      var request = new RuleCreateRequest(productId, "New Rule", "Desc", true, "Reason", null);

      when(productService.getProduct(productId)).thenReturn(mockProduct);
      when(ruleRepository.findMaxPriorityByProductId(productId)).thenReturn(Optional.of(10));
      when(ruleRepository.save(any(Rule.class))).thenAnswer(i -> i.getArgument(0));

      var response = ruleService.createRule(request);

      assertThat(response.priority()).isEqualTo(11);
      verify(ruleRepository).save(any(Rule.class));
    }

    @Test
    @DisplayName("Should use priority 1 if no existing rules are found for product")
    void shouldCreateRuleWithFirstPriority() {
      var request = new RuleCreateRequest(productId, "New Rule", "Desc", true, "Reason", null);

      when(productService.getProduct(productId)).thenReturn(mockProduct);
      when(ruleRepository.findMaxPriorityByProductId(productId)).thenReturn(Optional.empty());
      when(ruleRepository.save(any(Rule.class))).thenAnswer(i -> i.getArgument(0));

      var response = ruleService.createRule(request);

      assertThat(response.priority()).isEqualTo(1);
    }
  }
}
