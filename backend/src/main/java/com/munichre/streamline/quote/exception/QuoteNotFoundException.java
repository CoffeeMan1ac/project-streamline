package com.munichre.streamline.quote.exception;

import com.munichre.streamline.exception.BaseApplicationException;
import org.springframework.http.HttpStatus;

public class QuoteNotFoundException extends BaseApplicationException {
  public QuoteNotFoundException(String reference) {
    super(String.format("Quote %s not found.", reference), HttpStatus.NOT_FOUND);
  }
}
