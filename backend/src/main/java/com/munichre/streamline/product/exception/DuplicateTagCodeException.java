package com.munichre.streamline.product.exception;

import com.munichre.streamline.exception.BaseApplicationException;
import org.springframework.http.HttpStatus;

public class DuplicateTagCodeException extends BaseApplicationException {
  public DuplicateTagCodeException(String code) {
    super("A tag with code '" + code + "' already exists.", HttpStatus.BAD_REQUEST);
  }
}
