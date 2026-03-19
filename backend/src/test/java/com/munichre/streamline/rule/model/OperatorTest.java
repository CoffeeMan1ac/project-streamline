package com.munichre.streamline.rule.model;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

class OperatorTest {

  @Nested
  @DisplayName("String Operators")
  class StringOperators {
    @ParameterizedTest
    @CsvSource({
      "EQUALS, Ireland, ireland, true",
      "EQUALS, Ireland, UK, false",
      "NOT_EQUALS, Ireland, UK, true",
      "NOT_EQUALS, Ireland, ireland, false"
    })
    void testStringLogic(Operator op, String actual, String expected, boolean result) {
      assertThat(op.apply(actual, expected)).isEqualTo(result);
    }
  }
}
