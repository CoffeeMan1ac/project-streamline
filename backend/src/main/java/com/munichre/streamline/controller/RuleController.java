package com.munichre.streamline.controller;

import com.munichre.streamline.service.RuleService;
import java.util.Map;
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
}
