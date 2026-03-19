package com.munichre.streamline.rule.api.dto;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;

import com.munichre.streamline.rule.model.RuleConfig;
import java.util.UUID;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class RuleCreateRequestTest {

  @Test
  @DisplayName("Should default active to true when passed as null")
  void shouldDefaultActiveToTrueWhenNull() {
    RuleCreateRequest request =
        new RuleCreateRequest(
            UUID.randomUUID(),
            "My Rule",
            "Rule Description",
            null,
            "Business Reason",
            mock(RuleConfig.class));

    assertThat(request.active()).isTrue();
  }

  @Test
  @DisplayName("Should keep active as false when explicitly passed as false")
  void shouldKeepActiveFalseWhenExplicit() {
    RuleCreateRequest request =
        new RuleCreateRequest(
            UUID.randomUUID(),
            "My Rule",
            "Rule Description",
            false,
            "Business Reason",
            mock(RuleConfig.class));

    assertThat(request.active()).isFalse();
  }

  @Test
  @DisplayName("Should keep active as true when explicitly passed as true")
  void shouldKeepActiveTrueWhenExplicit() {
    RuleCreateRequest request =
        new RuleCreateRequest(
            UUID.randomUUID(),
            "My Rule",
            "Rule Description",
            true,
            "Business Reason",
            mock(RuleConfig.class));

    assertThat(request.active()).isTrue();
  }
}
