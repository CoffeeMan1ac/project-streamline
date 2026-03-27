package com.munichre.streamline.product.exception;

import com.munichre.streamline.exception.BaseApplicationException;
import java.util.UUID;
import org.springframework.http.HttpStatus;

public class FieldNotFoundException extends BaseApplicationException {
  public FieldNotFoundException(UUID id) {
    super("Field not found: " + id, HttpStatus.NOT_FOUND);
  }
}
