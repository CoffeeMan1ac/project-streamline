package com.munichre.streamline.quote.exception;

import com.munichre.streamline.exception.BaseApplicationException;
import java.util.List;
import org.springframework.http.HttpStatus;

public class MissingRequiredFieldsException extends BaseApplicationException {
  public MissingRequiredFieldsException(List<String> missingFields) {
    super(
        "Missing required product fields: " + String.join(", ", missingFields),
        HttpStatus.BAD_REQUEST);
  }
}
