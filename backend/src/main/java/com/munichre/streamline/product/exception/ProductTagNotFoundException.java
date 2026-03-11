package com.munichre.streamline.product.exception;

public class ProductTagNotFoundException extends RuntimeException {
  public ProductTagNotFoundException() {
    super("Invalid product tag supplied.");
  }
}
