package com.munichre.streamline.security.exception;

import com.munichre.streamline.exception.BaseApplicationException;
import org.springframework.http.HttpStatus;

public class UnauthenticatedException extends BaseApplicationException {
  public UnauthenticatedException() {
    super("You must be authenticated to access this resource.", HttpStatus.UNAUTHORIZED);
  }
}
