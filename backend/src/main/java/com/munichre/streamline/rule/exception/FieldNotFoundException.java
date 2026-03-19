package com.munichre.streamline.rule.exception;

import com.munichre.streamline.exception.BaseApplicationException;
import org.springframework.http.HttpStatus;

public class FieldNotFoundException extends BaseApplicationException {

  public FieldNotFoundException(String field) {
    super("Field '" + field + "' is required and was not found in request", HttpStatus.NOT_FOUND);
  }
}
