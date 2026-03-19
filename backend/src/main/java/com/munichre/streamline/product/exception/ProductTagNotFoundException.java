package com.munichre.streamline.product.exception;

import com.munichre.streamline.exception.BaseApplicationException;
import java.util.UUID;
import org.springframework.http.HttpStatus;

public class ProductTagNotFoundException extends BaseApplicationException {
  public ProductTagNotFoundException() {
    super("Invalid product tag supplied.", HttpStatus.NOT_FOUND);
  }

  public ProductTagNotFoundException(UUID id) {
    super("Product tag not found: " + id, HttpStatus.NOT_FOUND);
  }
}
