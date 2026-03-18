package com.munichre.streamline.decision.exception;

import com.munichre.streamline.decision.model.DecisionStatus;
import com.munichre.streamline.exception.BaseApplicationException;
import org.springframework.http.HttpStatus;

public class DecisionStatusNotImplementedException extends BaseApplicationException {

  public DecisionStatusNotImplementedException(DecisionStatus status) {
    super("Decision Status " + status + " is not implemented", HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
