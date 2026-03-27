package com.munichre.streamline.product.api.controller;

import static com.munichre.streamline.constant.ApiRoutes.BACKOFFICE_API_BASE;

import com.munichre.streamline.product.api.dto.CreateFormRequestDto;
import com.munichre.streamline.product.api.dto.FormDto;
import com.munichre.streamline.product.api.dto.UpdateFormRequestDto;
import com.munichre.streamline.product.service.FormService;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(BACKOFFICE_API_BASE + "/forms")
@RequiredArgsConstructor
public class FormController {

  private final FormService formService;

  @GetMapping
  public ResponseEntity<List<FormDto>> getForms() {
    return ResponseEntity.ok(formService.getAllForms());
  }

  @GetMapping("/{id}")
  public ResponseEntity<FormDto> getForm(@PathVariable UUID id) {
    return ResponseEntity.ok(formService.getForm(id));
  }

  @PostMapping
  public ResponseEntity<FormDto> createForm(@RequestBody CreateFormRequestDto request) {
    return ResponseEntity.status(HttpStatus.CREATED).body(formService.createForm(request));
  }

  @PutMapping("/{id}")
  public ResponseEntity<FormDto> updateForm(
      @PathVariable UUID id, @RequestBody UpdateFormRequestDto request) {
    return ResponseEntity.ok(formService.updateForm(id, request));
  }
}
