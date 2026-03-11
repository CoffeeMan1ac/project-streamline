package com.munichre.streamline.product.exception;

public class CoverageNotFoundException extends RuntimeException {
  public CoverageNotFoundException() {
    super("Invalid coverage supplied.");
  }
}
