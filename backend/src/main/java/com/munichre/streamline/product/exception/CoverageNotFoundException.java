package com.munichre.streamline.product.exception;

import com.munichre.streamline.exception.BaseApplicationException;
import java.util.UUID;
import org.springframework.http.HttpStatus;

public class CoverageNotFoundException extends BaseApplicationException {
  public CoverageNotFoundException() {
    super("Invalid coverage supplied.", HttpStatus.NOT_FOUND);
  }

  public CoverageNotFoundException(UUID id) {
    super("Coverage not found: " + id, HttpStatus.NOT_FOUND);
  }
}
