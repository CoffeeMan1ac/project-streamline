package com.munichre.streamline.product.exception;

import com.munichre.streamline.exception.BaseApplicationException;
import java.util.UUID;
import org.springframework.http.HttpStatus;

public class ProductNotFoundException extends BaseApplicationException {
  public ProductNotFoundException(UUID id) {
    super("Product not found: " + id, HttpStatus.NOT_FOUND);
  }
}
