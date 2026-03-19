package com.munichre.streamline.rule.model;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.munichre.streamline.rule.exception.InvalidNumericValueException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
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

    @Test
    @DisplayName("IN operator handles whitespace and case-insensitivity")
    void testInOperator() {
      assertThat(Operator.IN.apply("doctor", "engineer, doctor , pilot")).isTrue();
      assertThat(Operator.IN.apply("DOCTOR", "Engineer, doctor")).isTrue();
      assertThat(Operator.IN.apply("nurse", "engineer, doctor")).isFalse();
    }
  }

  @Nested
  @DisplayName("Numeric Operators")
  class NumericOperators {
    @ParameterizedTest
    @CsvSource({
      "GREATER_THAN, 25, 20, true",
      "GREATER_THAN, 20, 25, false",
      "LESS_THAN, 10, 15, true",
      "GREATER_THAN_OR_EQUAL, 20, 20, true",
      "LESS_THAN_OR_EQUAL, 20, 20, true"
    })
    void testNumericLogic(Operator op, String actual, String expected, boolean result) {
      assertThat(op.apply(actual, expected)).isEqualTo(result);
    }

    @Test
    @DisplayName("BETWEEN operator correctly identifies range")
    void testBetween() {
      assertThat(Operator.BETWEEN.apply("25", "20,30")).isTrue();
      assertThat(Operator.BETWEEN.apply("20", "20,30")).isTrue();
      assertThat(Operator.BETWEEN.apply("15", "20,30")).isFalse();
    }
  }

  @Nested
  @DisplayName("Exception Handling")
  class ExceptionTests {
    @Test
    @DisplayName("Throws InvalidNumericValueException for non-numeric input")
    void throwsOnInvalidNumber() {
      assertThatThrownBy(() -> Operator.GREATER_THAN.apply("abc", "10"))
          .isInstanceOf(InvalidNumericValueException.class);
    }

    @Test
    @DisplayName("Throws InvalidNumericValueException for null input")
    void throwsOnNull() {
      assertThatThrownBy(() -> Operator.LESS_THAN.apply(null, "10"))
          .isInstanceOf(InvalidNumericValueException.class);
    }
  }

  @Nested
  @DisplayName("Numeric Boundary Tests")
  class NumericBoundaries {

    @ParameterizedTest
    @CsvSource({
      "GREATER_THAN, 11, 10, true",
      "GREATER_THAN, 10, 10, false",
      "GREATER_THAN, 9, 10, false",
      "GREATER_THAN_OR_EQUAL, 11, 10, true",
      "GREATER_THAN_OR_EQUAL, 10, 10, true",
      "GREATER_THAN_OR_EQUAL, 9, 10, false",
      "LESS_THAN, 9, 10, true",
      "LESS_THAN, 10, 10, false",
      "LESS_THAN, 11, 10, false",
      "LESS_THAN_OR_EQUAL, 9, 10, true",
      "LESS_THAN_OR_EQUAL, 10, 10, true",
      "LESS_THAN_OR_EQUAL, 11, 10, false"
    })
    void testComparisonBoundaries(Operator op, String actual, String expected, boolean result) {
      assertThat(op.apply(actual, expected)).isEqualTo(result);
    }

    @Test
    @DisplayName("BETWEEN hits all boundaries")
    void testBetweenBoundaries() {
      assertThat(Operator.BETWEEN.apply("20", "20,30")).isTrue();
      assertThat(Operator.BETWEEN.apply("30", "20,30")).isTrue();
      assertThat(Operator.BETWEEN.apply("25", "20,30")).isTrue();
      assertThat(Operator.BETWEEN.apply("19", "20,30")).isFalse();
      assertThat(Operator.BETWEEN.apply("31", "20,30")).isFalse();
    }
  }

  @Nested
  @DisplayName("String & Collection Logic")
  class StringLogic {
    @Test
    void testEqualsCaseInsensitive() {
      assertThat(Operator.EQUALS.apply("Dublin", "dublin")).isTrue();
      assertThat(Operator.NOT_EQUALS.apply("Dublin", "London")).isTrue();
    }

    @Test
    void testInOperatorSplitting() {
      assertThat(Operator.IN.apply("A", "A,B,C")).isTrue();
      assertThat(Operator.IN.apply("b", "A, B, C")).isTrue();
      assertThat(Operator.IN.apply("D", "A,B,C")).isFalse();
    }
  }
}
