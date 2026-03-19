package com.munichre.streamline.rule.exception;

import com.munichre.streamline.exception.BaseApplicationException;
import org.springframework.http.HttpStatus;

public class FieldNullException extends BaseApplicationException {
  public FieldNullException(String field) {
    super(
        "Field '" + field + "' was found in applicant data but the value is null",
        HttpStatus.BAD_REQUEST);
  }
}
