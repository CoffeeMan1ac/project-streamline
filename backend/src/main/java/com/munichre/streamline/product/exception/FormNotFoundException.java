package com.munichre.streamline.product.exception;

import com.munichre.streamline.exception.BaseApplicationException;
import java.util.UUID;
import org.springframework.http.HttpStatus;

public class FormNotFoundException extends BaseApplicationException {
  public FormNotFoundException(UUID id) {
    super("Form not found: " + id, HttpStatus.NOT_FOUND);
  }
}
