package com.munichre.streamline.decision.exception;

import com.munichre.streamline.exception.BaseApplicationException;
import org.springframework.http.HttpStatus;

public class FieldNotFoundException extends BaseApplicationException {

  public FieldNotFoundException(String fieldName) {
    super(fieldName + " is required and was not found in request", HttpStatus.NOT_FOUND);
  }
}
