package com.munichre.streamline.service;

import com.munichre.streamline.model.Product;
import com.munichre.streamline.model.Rule;
import com.munichre.streamline.model.RuleConfig;
import com.munichre.streamline.model.RuleConfig.Condition;
import com.munichre.streamline.model.RuleConfig.Then;
import com.munichre.streamline.model.RuleConfig.When;
import com.munichre.streamline.repository.RuleRepository;
import io.micrometer.common.lang.NonNull;
import java.math.BigDecimal;
import java.util.ArrayList;
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
    if (productUUID == null) throw new Error("Product ID cannot be null");
    Product product = productService.getProduct(productUUID);
    newRule.setProduct(product);

    List<Rule> currentRules =
        ruleRepository.findByProductIdAndActiveTrueOrderByPriorityAsc(productUUID);

    // Check for duplicate priorities in existing rules.
    Integer priority = (Integer) fields.get("priority");
    for (Rule rule : currentRules) {
      Integer existingPriority = rule.getPriority();
      if (existingPriority == priority) throw new Error("New rule has duplicate priority");
      if (existingPriority > priority) break;
    }
    newRule.setPriority(priority);

    newRule.setName((String) fields.get("name"));
    newRule.setDescription((String) fields.get("description"));
    newRule.setActive((Boolean) fields.get("active"));
    newRule.setReason((String) fields.get("reason"));
    ;

    @SuppressWarnings("unchecked")
    Map<String, Object> ruleConfigFields = (Map<String, Object>) fields.get("rule_config");
    @SuppressWarnings("unchecked")
    Map<String, Object> whenField = (Map<String, Object>) ruleConfigFields.get("when");
    @SuppressWarnings("unchecked")
    Map<String, Object> thenField = (Map<String, Object>) ruleConfigFields.get("then");

    // WHEN

    When newWhen = new When();
    newWhen.setMatch((String) whenField.get("match"));

    @SuppressWarnings("unchecked")
    List<Map<String, Object>> conditionFields =
        (List<Map<String, Object>>) whenField.get("conditions");
    List<Condition> newConditions = new ArrayList<>();
    for (Map<String, Object> conditionField : conditionFields) {
      String field = (String) conditionField.get("field");
      String value = (String) conditionField.get("value");
      String operator = (String) conditionField.get("operator");
      newConditions.add(new Condition(field, operator, value));
    }
    newWhen.setConditions(newConditions);

    // THEN

    Then newThen = new Then();
    newThen.setDecision((String) thenField.get("decision"));
    newThen.setPremiumDelta((BigDecimal) thenField.get("premiumDelta"));
    newThen.setPremiumOverride((BigDecimal) thenField.get("premiumOverride"));

    Boolean newStop = (Boolean) ruleConfigFields.get("stop");

    RuleConfig newRuleConfig = new RuleConfig(newWhen, newThen, newStop);
    newRule.setRuleConfig(newRuleConfig);

    ruleRepository.saveAndFlush(newRule);
  }

  public List<Rule> getRules(@NonNull UUID product, Boolean active) {
    List<Rule> rules = ruleRepository.findByProductIdAndActiveTrueOrderByPriorityAsc(product);
    if (active == null) return rules;

    if (active) rules.removeIf(rule -> !rule.getActive()); // Remove inactive rules
    else rules.removeIf(rule -> rule.getActive()); // Remove active rules

    return rules;
  }
}
