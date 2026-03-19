package com.munichre.streamline.quote.model;

import static org.assertj.core.api.Assertions.assertThat;

import com.munichre.streamline.decision.model.DecisionStatus;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

class QuotationStatusTest {

  @ParameterizedTest(name = "DecisionStatus {0} should map to QuotationStatus {1}")
  @CsvSource({"ACCEPT, ACCEPTED", "DECLINE, DECLINED", "REFER, REFERRED"})
  @DisplayName("Should correctly map all DecisionStatus values to QuotationStatus")
  void shouldMapDecisionStatusToQuotationStatus(DecisionStatus input, QuotationStatus expected) {
    assertThat(QuotationStatus.from(input)).isEqualTo(expected);
  }

  @Test
  @DisplayName("Verify enum boilerplate (values and valueOf)")
  void verifyEnumBoilerplate() {
    assertThat(QuotationStatus.values()).hasSize(3);
    assertThat(QuotationStatus.valueOf("ACCEPTED")).isEqualTo(QuotationStatus.ACCEPTED);
  }
}
