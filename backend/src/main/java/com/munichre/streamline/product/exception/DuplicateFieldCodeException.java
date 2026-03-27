package com.munichre.streamline.product.exception;

import com.munichre.streamline.exception.BaseApplicationException;
import org.springframework.http.HttpStatus;

public class DuplicateFieldCodeException extends BaseApplicationException {
  public DuplicateFieldCodeException(String code) {
    super("A field with code '" + code + "' already exists.", HttpStatus.BAD_REQUEST);
  }
}
