package com.munichre.streamline.rule.service;

import com.munichre.streamline.product.model.Product;
import com.munichre.streamline.product.service.ProductService;
import com.munichre.streamline.rule.api.dto.RuleCreateRequest; // Recommended New DTO
import com.munichre.streamline.rule.api.dto.RuleReorderRequest;
import com.munichre.streamline.rule.api.dto.RuleResponse;
import com.munichre.streamline.rule.api.dto.RuleUpdateRequest;
import com.munichre.streamline.rule.exception.RuleNotAssignedToProductException;
import com.munichre.streamline.rule.exception.RuleNotFoundException;
import com.munichre.streamline.rule.model.Rule;
import com.munichre.streamline.rule.repository.RuleRepository;
import io.micrometer.common.lang.NonNull;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class RuleService {

  private final RuleRepository ruleRepository;
  private final ProductService productService;

  @Transactional
  public RuleResponse createRule(RuleCreateRequest request) {
    final Product product = productService.getProduct(request.product());

    final Integer nextPriority =
        ruleRepository.findMaxPriorityByProductId(product.getId()).orElse(0) + 1;

    final Rule rule =
        Rule.builder()
            .product(product)
            .name(request.name())
            .description(request.description())
            .active(request.active())
            .reason(request.reason())
            .priority(nextPriority)
            .ruleConfig(request.ruleConfig())
            .build();

    final Rule savedRule = ruleRepository.save(rule);

    return RuleResponse.of(savedRule);
  }

  public RuleResponse getRule(@NonNull UUID id) {
    final Rule rule = findRule(id);
    return RuleResponse.of(rule);
  }

  public List<RuleResponse> getRules(@NonNull UUID productId, Boolean active) {
    List<Rule> rules;
    if (active == null) rules = ruleRepository.findByProductIdOrderByPriorityAsc(productId);
    else if (active)
      rules = ruleRepository.findByProductIdAndActiveTrueOrderByPriorityAsc(productId);
    else rules = ruleRepository.findByProductIdAndActiveFalseOrderByPriorityAsc(productId);

    return rules.stream().map(RuleResponse::of).toList();
  }

  @Transactional
  public RuleResponse updateRule(@NonNull UUID id, RuleUpdateRequest request) {
    Rule rule = findRule(id);

    if (request.name() != null) rule.setName(request.name());
    if (request.description() != null) rule.setDescription(request.description());
    if (request.active() != null) rule.setActive(request.active());
    if (request.reason() != null) rule.setReason(request.reason());

    if (request.ruleConfig() != null) {
      rule.setRuleConfig(request.ruleConfig());
    }

    return RuleResponse.of(ruleRepository.save(rule));
  }

  @Transactional
  public List<RuleResponse> reorderRule(RuleReorderRequest request) {
    final UUID productId = request.product();
    final UUID ruleId = request.rule();
    final Integer newPriority = request.priority();
    final Rule ruleToChange = findRule(ruleId);

    if (!ruleToChange.getProduct().getId().equals(productId)) {
      throw new RuleNotAssignedToProductException(ruleId, productId);
    }

    final Integer oldPriority = ruleToChange.getPriority();
    if (newPriority.equals(oldPriority)) {
      return getRules(productId, null);
    }

    if (newPriority < oldPriority) {
      ruleRepository.incrementPriorityBetween(productId, newPriority, oldPriority - 1);
    } else {
      ruleRepository.decrementPriorityBetween(productId, oldPriority + 1, newPriority);
    }

    ruleToChange.setPriority(newPriority);
    ruleRepository.save(ruleToChange);

    return getRules(productId, null);
  }

  private Rule findRule(UUID id) {
    return ruleRepository.findById(id).orElseThrow(() -> new RuleNotFoundException(id));
  }

  public List<Rule> findByProductIdAndActiveTrueOrderByPriorityAsc(UUID productid) {
    return ruleRepository.findByProductIdAndActiveTrueOrderByPriorityAsc(productid);
  }
}
