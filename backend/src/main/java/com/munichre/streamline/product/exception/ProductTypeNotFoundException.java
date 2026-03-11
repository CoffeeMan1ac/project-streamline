package com.munichre.streamline.product.exception;

public class ProductTypeNotFoundException extends RuntimeException {
  public ProductTypeNotFoundException() {
    super("Invalid product tag supplied.");
  }
}
