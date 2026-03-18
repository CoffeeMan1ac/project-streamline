package com.munichre.streamline.rule.exception;

import com.munichre.streamline.exception.BaseApplicationException;
import java.util.UUID;
import org.springframework.http.HttpStatus;

public class RuleNotAssignedToProductException extends BaseApplicationException {
  public RuleNotAssignedToProductException(UUID ruleId, UUID productId) {
    super(
        String.format("Rule %s does not belong to the specified product %s", ruleId, productId),
        HttpStatus.NOT_FOUND);
  }
}
