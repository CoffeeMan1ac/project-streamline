package com.munichre.streamline.controller;

import com.munichre.streamline.model.Rule;
import com.munichre.streamline.service.RuleService;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/rules")
@RequiredArgsConstructor
public class RuleController {

  private final RuleService ruleService;

  @PostMapping
  public ResponseEntity<Boolean> createRule(@RequestBody Map<String, Object> payload) {
    ruleService.createRule(payload);
    return ResponseEntity.status(HttpStatus.CREATED).build();
  }

  /**
   * 
   * @param product UUID of product to check.
   * @param active Optional. Will return only active rules if true, and only inactive rules if
   * false. If not present, will return all rules.
   * @return List of matching rules.
   */
  @GetMapping
  public ResponseEntity<List<Rule>> getRules(
    @RequestParam UUID product,
    @RequestParam(required = false) Boolean active
  ) {
    List<Rule> rules = ruleService.getRules(product, active);
    return ResponseEntity.ok(rules);
  }

}
