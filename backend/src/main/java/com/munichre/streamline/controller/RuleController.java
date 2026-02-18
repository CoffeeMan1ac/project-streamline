package com.munichre.streamline.controller;

import com.munichre.streamline.dto.EvaluationResult;
import com.munichre.streamline.service.RuleService;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/rules")
@RequiredArgsConstructor
public class RuleController {

  private final RuleService ruleService;

  @PostMapping
  public boolean createRule(@RequestBody Map<String, Object> payload) {
    ruleService.createRule(payload);
    ResponseEntity.ok();
    return true;
  }
}
