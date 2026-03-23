package com.munichre.streamline.quote.exception;

import com.munichre.streamline.exception.BaseApplicationException;
import org.springframework.http.HttpStatus;

public class MissingQuoteFieldException extends BaseApplicationException {
  public MissingQuoteFieldException(String fieldName) {
    super("Required quote field is missing: " + fieldName, HttpStatus.BAD_REQUEST);
  }
}
