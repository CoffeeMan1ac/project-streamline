package com.munichre.streamline.rule.api.controller;

import static com.munichre.streamline.constant.ApiRoutes.BACKOFFICE_API_BASE;

import com.munichre.streamline.rule.api.dto.RuleCreateRequest;
import com.munichre.streamline.rule.api.dto.RuleReorderRequest;
import com.munichre.streamline.rule.api.dto.RuleResponse;
import com.munichre.streamline.rule.api.dto.RuleUpdateRequest;
import com.munichre.streamline.rule.api.dto.RuleValidationResponse;
import com.munichre.streamline.rule.service.RuleService;
import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(BACKOFFICE_API_BASE + "/rules")
@RequiredArgsConstructor
public class RuleController {

  private final RuleService ruleService;

  @PostMapping("/validate")
  public ResponseEntity<RuleValidationResponse> validateRule(
      @RequestBody RuleCreateRequest request) {
    List<String> errors = ruleService.validateRule(request);
    if (errors.isEmpty()) {
      return ResponseEntity.ok(new RuleValidationResponse(true, List.of()));
    }
    return ResponseEntity.badRequest().body(new RuleValidationResponse(false, errors));
  }

  @PostMapping
  public ResponseEntity<RuleResponse> createRule(@Valid @RequestBody RuleCreateRequest request) {
    RuleResponse repsonse = ruleService.createRule(request);
    return ResponseEntity.status(HttpStatus.CREATED).body(repsonse);
  }

  /**
   * @param product UUID of product to check.
   * @param active Optional. Will return only active rules if true, and only inactive rules if
   *     false. If not present, will return all rules.
   * @return List of matching rules.
   */
  @GetMapping
  public ResponseEntity<List<RuleResponse>> getRules(
      @RequestParam UUID product, @RequestParam(required = false) Boolean active) {
    List<RuleResponse> response = ruleService.getRules(product, active);
    return ResponseEntity.ok(response);
  }

  /**
   * @param id UUID of the rule to fetch.
   * @return The matching rule.
   */
  @GetMapping("/{id}")
  public ResponseEntity<RuleResponse> getRule(@PathVariable UUID id) {
    RuleResponse response = ruleService.getRule(id);
    return ResponseEntity.ok(response);
  }

  @PutMapping("/reorder")
  public ResponseEntity<List<RuleResponse>> reorderRule(
      @Valid @RequestBody RuleReorderRequest request) {
    List<RuleResponse> response = ruleService.reorderRule(request);
    return ResponseEntity.ok(response);
  }

  /**
   * @param id UUID of the rule to update.
   * @param payload Map of fields to update.
   * @return The updated rule.
   */
  @PatchMapping("/{id}")
  public ResponseEntity<RuleResponse> updateRule(
      @PathVariable UUID id, @Valid @RequestBody RuleUpdateRequest request) {
    RuleResponse response = ruleService.updateRule(id, request);
    return ResponseEntity.ok(response);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteRule(@PathVariable UUID id) {
    ruleService.deleteRule(id);
    return ResponseEntity.noContent().build();
  }
}
