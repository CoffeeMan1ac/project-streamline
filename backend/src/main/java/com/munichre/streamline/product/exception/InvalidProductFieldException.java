package com.munichre.streamline.product.exception;

import com.munichre.streamline.exception.BaseApplicationException;
import org.springframework.http.HttpStatus;

public class InvalidProductFieldException extends BaseApplicationException {
  public InvalidProductFieldException(String message) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
