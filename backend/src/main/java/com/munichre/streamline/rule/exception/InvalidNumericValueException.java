package com.munichre.streamline.rule.exception;

import com.munichre.streamline.exception.BaseApplicationException;
import org.springframework.http.HttpStatus;

public class InvalidNumericValueException extends BaseApplicationException {
  public InvalidNumericValueException(String invalidValue) {
    super(String.format("Value '%s' is not a valid number.", invalidValue), HttpStatus.BAD_REQUEST);
  }
}
