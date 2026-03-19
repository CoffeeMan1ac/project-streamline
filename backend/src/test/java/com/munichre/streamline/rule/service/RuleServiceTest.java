package com.munichre.streamline.rule.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.*;

import com.munichre.streamline.product.model.Product;
import com.munichre.streamline.product.service.ProductService;
import com.munichre.streamline.rule.api.dto.RuleCreateRequest;
import com.munichre.streamline.rule.api.dto.RuleReorderRequest;
import com.munichre.streamline.rule.api.dto.RuleUpdateRequest;
import com.munichre.streamline.rule.exception.RuleNotAssignedToProductException;
import com.munichre.streamline.rule.exception.RuleNotFoundException;
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

    @Test
    @DisplayName("Should throw RuleNotFoundException when searching for non-existent ID")
    void shouldThrowExceptionWhenRuleIdIsInvalid() {
      when(ruleRepository.findById(ruleId)).thenReturn(Optional.empty());

      assertThatThrownBy(() -> ruleService.getRule(ruleId))
          .isInstanceOf(RuleNotFoundException.class);
    }

    @Test
    @DisplayName("Should call the correct repository methods for all active filter states")
    void shouldFilterRulesByActiveStatus() {
      ruleService.getRules(productId, null);
      verify(ruleRepository).findByProductIdOrderByPriorityAsc(productId);

      ruleService.getRules(productId, true);
      verify(ruleRepository).findByProductIdAndActiveTrueOrderByPriorityAsc(productId);

      ruleService.getRules(productId, false);
      verify(ruleRepository).findByProductIdAndActiveFalseOrderByPriorityAsc(productId);
    }

    @Test
    @DisplayName("Should return a RuleResponse when a valid ID is provided")
    void shouldReturnRuleResponseForValidId() {
      when(ruleRepository.findById(ruleId)).thenReturn(Optional.of(mockRule));

      var response = ruleService.getRule(ruleId);

      assertThat(response).isNotNull();
      assertThat(response.id()).isEqualTo(ruleId);
      verify(ruleRepository).findById(ruleId);
    }
  }

  @Nested
  @DisplayName("Rule Updates")
  class UpdateTests {

    @Test
    @DisplayName("Should update only provided fields and ignore nulls in request")
    void shouldPerformPartialUpdate() {
      var request = new RuleUpdateRequest("Updated Name", null, false, null, null);

      when(ruleRepository.findById(ruleId)).thenReturn(Optional.of(mockRule));
      when(ruleRepository.save(any(Rule.class))).thenAnswer(i -> i.getArgument(0));

      var response = ruleService.updateRule(ruleId, request);

      assertThat(response.name()).isEqualTo("Updated Name");
      assertThat(response.active()).isFalse();
      assertThat(mockRule.getPriority()).isEqualTo(5);
    }

    @Test
    @DisplayName("Should update rule configuration when present in request")
    void shouldUpdateRuleConfig() {
      var request = new RuleUpdateRequest(null, null, null, null, null);

      when(ruleRepository.findById(ruleId)).thenReturn(Optional.of(mockRule));
      when(ruleRepository.save(any(Rule.class))).thenReturn(mockRule);

      ruleService.updateRule(ruleId, request);
      verify(ruleRepository).save(mockRule);
    }
  }

  @Nested
  @DisplayName("Rule Reordering Logic")
  class ReorderTests {

    @Test
    @DisplayName("Should throw exception if the rule belongs to a different product than requested")
    void shouldThrowExceptionForProductMismatch() {
      Product otherProduct = new Product();
      otherProduct.setId(UUID.randomUUID());
      mockRule.setProduct(otherProduct);

      var request = new RuleReorderRequest(productId, ruleId, 1);
      when(ruleRepository.findById(ruleId)).thenReturn(Optional.of(mockRule));

      assertThatThrownBy(() -> ruleService.reorderRule(request))
          .isInstanceOf(RuleNotAssignedToProductException.class);
    }

    @Test
    @DisplayName("Should return rules list immediately if the priority remains unchanged")
    void shouldHandleNoChangeInPriority() {
      var request = new RuleReorderRequest(productId, ruleId, 5);
      when(ruleRepository.findById(ruleId)).thenReturn(Optional.of(mockRule));

      ruleService.reorderRule(request);

      verify(ruleRepository, never()).incrementPriorityBetween(any(), anyInt(), anyInt());
      verify(ruleRepository, never()).decrementPriorityBetween(any(), anyInt(), anyInt());
    }
  }
}
