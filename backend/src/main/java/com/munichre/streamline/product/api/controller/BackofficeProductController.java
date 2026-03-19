package com.munichre.streamline.product.api.controller;

import static com.munichre.streamline.constant.ApiRoutes.BACKOFFICE_API_BASE;

import com.munichre.streamline.product.api.dto.CoverageOptionDto;
import com.munichre.streamline.product.api.dto.CreateCoverageRequestDto;
import com.munichre.streamline.product.api.dto.CreateProductRequestDto;
import com.munichre.streamline.product.api.dto.CreateTagRequestDto;
import com.munichre.streamline.product.api.dto.ProductDto;
import com.munichre.streamline.product.api.dto.ProductOptionDto;
import com.munichre.streamline.product.api.dto.TagOptionDto;
import com.munichre.streamline.product.api.dto.UpdateCoverageRequestDto;
import com.munichre.streamline.product.api.dto.UpdateProductRequestDto;
import com.munichre.streamline.product.api.dto.UpdateTagRequestDto;
import com.munichre.streamline.product.service.ProductService;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(BACKOFFICE_API_BASE + "/products")
@RequiredArgsConstructor
public class BackofficeProductController {

  private final ProductService productService;

  @GetMapping("options")
  public ResponseEntity<List<ProductOptionDto>> getProductOptions() {
    List<ProductOptionDto> productOptions = productService.getAllProductOptions();
    return ResponseEntity.ok(productOptions);
  }

  @GetMapping()
  public ResponseEntity<List<ProductDto>> getProducts(
      @RequestParam(required = false) Boolean active) {
    return ResponseEntity.ok(productService.getProducts(active));
  }

  @PostMapping()
  public ResponseEntity<ProductDto> createProduct(@RequestBody CreateProductRequestDto request) {
    productService.createProduct(request);
    return ResponseEntity.status(HttpStatus.CREATED).build();
  }

  @PatchMapping("/{id}/active")
  public ResponseEntity<Void> toggleProductActive(@PathVariable UUID id) {
    productService.toggleProductActive(id);
    return ResponseEntity.ok().build();
  }

  @GetMapping("/coverages")
  public ResponseEntity<List<CoverageOptionDto>> getCoverages() {
    return ResponseEntity.ok(productService.getAllCoverages());
  }

  @PostMapping("/coverages")
  public ResponseEntity<CoverageOptionDto> createCoverage(
      @RequestBody CreateCoverageRequestDto request) {
    return ResponseEntity.status(HttpStatus.CREATED).body(productService.createCoverage(request));
  }

  @PutMapping("/coverages/{id}")
  public ResponseEntity<CoverageOptionDto> updateCoverage(
      @PathVariable UUID id, @RequestBody UpdateCoverageRequestDto request) {
    return ResponseEntity.ok(productService.updateCoverage(id, request));
  }

  @GetMapping("/tags")
  public ResponseEntity<List<TagOptionDto>> getTags() {
    return ResponseEntity.ok(productService.getAllTags());
  }

  @PostMapping("/tags")
  public ResponseEntity<TagOptionDto> createTag(@RequestBody CreateTagRequestDto request) {
    return ResponseEntity.status(HttpStatus.CREATED).body(productService.createTag(request));
  }

  @PutMapping("/tags/{id}")
  public ResponseEntity<TagOptionDto> updateTag(
      @PathVariable UUID id, @RequestBody UpdateTagRequestDto request) {
    return ResponseEntity.ok(productService.updateTag(id, request));
  }

  @GetMapping("/{id}")
  public ResponseEntity<ProductDto> getProduct(@PathVariable UUID id) {
    return ResponseEntity.ok(productService.getProductDto(id));
  }

  @PutMapping("/{id}")
  public ResponseEntity<Void> updateProduct(
      @PathVariable UUID id, @RequestBody UpdateProductRequestDto request) {
    productService.updateProduct(id, request);
    return ResponseEntity.ok().build();
  }
}
