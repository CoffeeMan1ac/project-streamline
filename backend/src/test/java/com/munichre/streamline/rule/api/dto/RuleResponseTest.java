package com.munichre.streamline.rule.api.dto;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.munichre.streamline.product.model.Product;
import com.munichre.streamline.rule.model.Rule;
import com.munichre.streamline.rule.model.RuleConfig;
import java.time.LocalDateTime;
import java.util.UUID;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

class RuleResponseTest {

  @Nested
  @DisplayName("RuleResponse.of()")
  class OfRule {

    @Test
    @DisplayName("Should return null when the rule is null")
    void returnsNullWhenRuleIsNull() {
      assertThat(RuleResponse.of(null)).isNull();
    }

    @Test
    @DisplayName("Should map rule correctly when product is present")
    void mapsRuleWithProduct() {
      UUID ruleId = UUID.randomUUID();
      UUID productId = UUID.randomUUID();
      LocalDateTime now = LocalDateTime.now();

      Product mockProduct = mock(Product.class);
      when(mockProduct.getId()).thenReturn(productId);

      Rule mockRule = mock(Rule.class);
      when(mockRule.getId()).thenReturn(ruleId);
      when(mockRule.getProduct()).thenReturn(mockProduct);
      when(mockRule.getName()).thenReturn("Test Rule");
      when(mockRule.getDescription()).thenReturn("Description");
      when(mockRule.getReason()).thenReturn("Reason");
      when(mockRule.getPriority()).thenReturn(1);
      when(mockRule.getActive()).thenReturn(true);
      when(mockRule.getRuleConfig()).thenReturn(mock(RuleConfig.class));
      when(mockRule.getCreatedAt()).thenReturn(now);
      when(mockRule.getUpdatedAt()).thenReturn(now);

      RuleResponse response = RuleResponse.of(mockRule);

      assertThat(response).isNotNull();
      assertThat(response.id()).isEqualTo(ruleId);
      assertThat(response.productId()).isEqualTo(productId); // Verifies the ternary 'true' branch
      assertThat(response.name()).isEqualTo("Test Rule");
      assertThat(response.description()).isEqualTo("Description");
      assertThat(response.reason()).isEqualTo("Reason");
      assertThat(response.priority()).isEqualTo(1);
      assertThat(response.active()).isTrue();
      assertThat(response.createdAt()).isEqualTo(now);
      assertThat(response.updatedAt()).isEqualTo(now);
    }
  }
}
