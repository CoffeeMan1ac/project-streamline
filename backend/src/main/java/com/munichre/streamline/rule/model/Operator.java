package com.munichre.streamline.rule.model;

import com.munichre.streamline.rule.exception.InvalidNumericValueException;
import java.util.Arrays;
import java.util.function.BiPredicate;

public enum Operator {
  EQUALS((actual, expected) -> actual.equalsIgnoreCase(expected)),
  NOT_EQUALS((actual, expected) -> !actual.equalsIgnoreCase(expected)),
  GREATER_THAN((actual, expected) -> toDouble(actual) > toDouble(expected)),
  GREATER_THAN_OR_EQUAL((actual, expected) -> toDouble(actual) >= toDouble(expected)),
  LESS_THAN((actual, expected) -> toDouble(actual) < toDouble(expected)),
  LESS_THAN_OR_EQUAL((actual, expected) -> toDouble(actual) <= toDouble(expected)),
  BETWEEN(
      (actual, expected) -> {
        String[] parts = expected.split(",");
        double val = toDouble(actual);
        return val >= toDouble(parts[0]) && val <= toDouble(parts[1]);
      }),
  IN(
      (actual, expected) -> {
        String[] allowed = expected.split(",");
        return Arrays.stream(allowed).anyMatch(a -> actual.equalsIgnoreCase(a.trim()));
      });

  private final BiPredicate<String, String> matcher;

  Operator(BiPredicate<String, String> matcher) {
    this.matcher = matcher;
  }

  public boolean apply(String actual, String expected) {
    return matcher.test(actual, expected);
  }

  private static double toDouble(String val) {
    try {
      return Double.parseDouble(val.trim());
    } catch (NumberFormatException | NullPointerException e) {
      throw new InvalidNumericValueException(val);
    }
  }
}
