package com.munichre.streamline.service;

import com.munichre.streamline.dto.RuleResponseDto;
import com.munichre.streamline.model.Rule;
import com.munichre.streamline.model.RuleConfig;
import com.munichre.streamline.model.RuleConfig.Condition;
import com.munichre.streamline.model.RuleConfig.Then;
import com.munichre.streamline.model.RuleConfig.When;
import com.munichre.streamline.product.model.Product;
import com.munichre.streamline.product.service.ProductService;
import com.munichre.streamline.repository.RuleRepository;
import io.micrometer.common.lang.NonNull;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    // Integer priority = (Integer) fields.get("priority");
    // for (Rule rule : currentRules) {
    //   Integer existingPriority = rule.getPriority();
    //   if (existingPriority.equals(priority)) throw new Error("New rule has duplicate priority");
    //   if (existingPriority > priority) break;
    // }
    // newRule.setPriority(priority);
    Integer nextPriority =
        currentRules.isEmpty() ? 1 : currentRules.get(currentRules.size() - 1).getPriority() + 1;
    newRule.setPriority(nextPriority);

    newRule.setName((String) fields.get("name"));
    newRule.setDescription((String) fields.get("description"));
    newRule.setActive((Boolean) fields.get("active"));
    newRule.setReason((String) fields.get("reason"));

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
    Object premiumDelta = thenField.get("premiumDelta");
    Object premiumOverride = thenField.get("premiumOverride");
    newThen.setPremiumDelta(premiumDelta != null ? new BigDecimal(premiumDelta.toString()) : null);
    newThen.setPremiumOverride(
        premiumOverride != null ? new BigDecimal(premiumOverride.toString()) : null);

    Boolean newStop = (Boolean) ruleConfigFields.get("stop");

    RuleConfig newRuleConfig = new RuleConfig(newWhen, newThen, newStop);
    newRule.setRuleConfig(newRuleConfig);

    ruleRepository.saveAndFlush(newRule);
  }

  public List<RuleResponseDto> getRules(@NonNull UUID product, Boolean active) {
    List<Rule> rules;
    if (active == null) rules = ruleRepository.findByProductIdOrderByPriorityAsc(product);
    else if (active) rules = ruleRepository.findByProductIdAndActiveTrueOrderByPriorityAsc(product);
    else rules = ruleRepository.findByProductIdAndActiveFalseOrderByPriorityAsc(product);

    return rules.stream().map(rule -> RuleResponseDto.of(rule)).toList();
  }

  public RuleResponseDto getRule(@NonNull UUID id) {
    Rule rule = ruleRepository.findById(id).orElseThrow();
    return RuleResponseDto.of(rule);
  }

  public RuleResponseDto updateRule(@NonNull UUID id, Map<String, Object> fields) {
    Rule rule = ruleRepository.findById(id).orElseThrow();

    if (fields.containsKey("name")) rule.setName((String) fields.get("name"));
    if (fields.containsKey("description")) rule.setDescription((String) fields.get("description"));
    if (fields.containsKey("active")) rule.setActive((Boolean) fields.get("active"));
    if (fields.containsKey("reason")) rule.setReason((String) fields.get("reason"));

    if (fields.containsKey("rule_config")) {
      @SuppressWarnings("unchecked")
      Map<String, Object> ruleConfigFields = (Map<String, Object>) fields.get("rule_config");
      @SuppressWarnings("unchecked")
      Map<String, Object> whenField = (Map<String, Object>) ruleConfigFields.get("when");
      @SuppressWarnings("unchecked")
      Map<String, Object> thenField = (Map<String, Object>) ruleConfigFields.get("then");

      When newWhen = new When();
      newWhen.setMatch((String) whenField.get("match"));

      @SuppressWarnings("unchecked")
      List<Map<String, Object>> conditionFields =
          (List<Map<String, Object>>) whenField.get("conditions");
      List<Condition> newConditions = new ArrayList<>();
      for (Map<String, Object> conditionField : conditionFields) {
        newConditions.add(
            new Condition(
                (String) conditionField.get("field"),
                (String) conditionField.get("operator"),
                (String) conditionField.get("value")));
      }
      newWhen.setConditions(newConditions);

      Then newThen = new Then();
      newThen.setDecision((String) thenField.get("decision"));
      Object premiumDelta = thenField.get("premiumDelta");
      Object premiumOverride = thenField.get("premiumOverride");
      newThen.setPremiumDelta(
          premiumDelta != null ? new BigDecimal(premiumDelta.toString()) : null);
      newThen.setPremiumOverride(
          premiumOverride != null ? new BigDecimal(premiumOverride.toString()) : null);

      Boolean stop = (Boolean) ruleConfigFields.get("stop");
      rule.setRuleConfig(new RuleConfig(newWhen, newThen, stop));
    }

    ruleRepository.save(rule);
    return RuleResponseDto.of(rule);
  }

  @Transactional
  public List<RuleResponseDto> reorderRule(Map<String, Object> fields) {
    UUID productUUID = UUID.fromString(fields.get("product").toString());
    if (productUUID == null) throw new Error("Invalid product ID.");
    Product product = productService.getProduct(productUUID);
    if (product == null) throw new Error("Product not found.");

    UUID ruleToChangeUUID = UUID.fromString(fields.get("rule").toString());
    if (ruleToChangeUUID == null) throw new Error("Invalid rule ID.");
    Rule ruleToChange = ruleRepository.findById(ruleToChangeUUID).orElseThrow();

    Integer newPriority = (Integer) fields.get("priority");
    if (newPriority == null || newPriority < 1) throw new Error("Invalid priority.");

    List<Rule> rules = ruleRepository.findByProductIdOrderByPriorityAsc(productUUID);

    if (!rules.contains(ruleToChange)) throw new Error("Rule does not belong to product");

    Integer oldPriority = ruleToChange.getPriority();

    if (newPriority.equals(oldPriority)) {
      return rules.stream().map(rule -> RuleResponseDto.of(rule)).toList();
    }

    if (newPriority < oldPriority)
      // If moving up, lower priority of all inbetween
      ruleRepository.incrementPriorityBetween(productUUID, newPriority, oldPriority - 1);
    else
      // If moving down, increase priority of all inbetween
      ruleRepository.decrementPriorityBetween(productUUID, oldPriority + 1, newPriority);

    ruleToChange.setPriority(newPriority);
    ruleRepository.save(ruleToChange);

    return ruleRepository.findByProductIdOrderByPriorityAsc(productUUID).stream()
        .map(rule -> RuleResponseDto.of(rule))
        .toList();
  }
}
