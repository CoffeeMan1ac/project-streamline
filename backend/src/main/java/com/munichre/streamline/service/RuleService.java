package com.munichre.streamline.service;

import com.munichre.streamline.model.Product;
import com.munichre.streamline.model.Rule;
import com.munichre.streamline.repository.RuleRepository;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RuleService {
  private final RuleRepository ruleRepository;
  private final ProductService productService;

  public void createRule(Map<String, Object> fields) {

    Rule newRule = new Rule();

    UUID productUUID = UUID.fromString(fields.get("product").toString());
    Product product = productService.getProduct(productUUID);
    newRule.setProduct(product);

    List<Rule> currentRules =
        ruleRepository.findByProductIdAndActiveTrueOrderByPriorityAsc(productUUID);

    newRule.setName((String) fields.get("name"));
    newRule.setDescription((String) fields.get("description"));

    // Check for duplicate priorities in existing rules.
    Integer priority = (Integer) fields.get("priority");
    for (Rule rule : currentRules) {
      Integer existingPriority = rule.getPriority();
      if (existingPriority == priority) throw new Error();
      if (existingPriority > priority) break;
    }
    newRule.setPriority(priority);

    newRule.setActive((Boolean) fields.get("active"));
    newRule.setConditionField((String) fields.get("conditionField"));
    newRule.setConditionOperator((String) fields.get("conditionOperator"));
    newRule.setConditionValue((String) fields.get("conditionValue"));
    newRule.setActionType((String) fields.get("actionType"));
    newRule.setActionReason((String) fields.get("actionReason"));

    ruleRepository.saveAndFlush(newRule);
  }
}
