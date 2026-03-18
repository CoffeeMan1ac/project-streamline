package com.munichre.streamline.rule.exception;

import com.munichre.streamline.exception.BaseApplicationException;
import java.util.UUID;
import org.springframework.http.HttpStatus;

public class RuleNotFoundException extends BaseApplicationException {
  public RuleNotFoundException(UUID id) {
    super(String.format("Rule %s not found.", id), HttpStatus.NOT_FOUND);
  }
}
