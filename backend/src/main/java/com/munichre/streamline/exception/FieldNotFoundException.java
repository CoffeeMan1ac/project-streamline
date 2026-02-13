package com.munichre.streamline.exception;

public class FieldNotFoundException extends RuntimeException {

  public FieldNotFoundException(String fieldName) {
    super("FIELD NOT FOUND: " + fieldName);
  }
}
