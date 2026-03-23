package com.munichre.streamline.product.exception;

import com.munichre.streamline.exception.BaseApplicationException;
import org.springframework.http.HttpStatus;

public class ProductTypeNotFoundException extends BaseApplicationException {
  public ProductTypeNotFoundException() {
    super("Invalid product type supplied.", HttpStatus.NOT_FOUND);
  }
}
