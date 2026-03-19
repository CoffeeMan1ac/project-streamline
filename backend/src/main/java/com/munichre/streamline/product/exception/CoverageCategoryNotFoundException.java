package com.munichre.streamline.product.exception;

import com.munichre.streamline.exception.BaseApplicationException;
import java.util.UUID;
import org.springframework.http.HttpStatus;

public class CoverageCategoryNotFoundException extends BaseApplicationException {
  public CoverageCategoryNotFoundException(UUID id) {
    super("Coverage category not found: " + id, HttpStatus.NOT_FOUND);
  }
}
