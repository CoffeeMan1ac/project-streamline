package com.munichre.streamline.product.api.controller;

import com.munichre.streamline.product.api.dto.ProductDto;
import com.munichre.streamline.product.api.dto.ProductOptionDto;
import com.munichre.streamline.product.service.ProductService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/backoffice/products")
@RequiredArgsConstructor
public class BackofficeProductController {

  private final ProductService productService;

  @GetMapping("options")
  public ResponseEntity<List<ProductOptionDto>> getProductOptions() {
    List<ProductOptionDto> productOptions = productService.getAllProductOptions();
    return ResponseEntity.ok(productOptions);
  }

  @GetMapping()
  public ResponseEntity<List<ProductDto>> getProducts() {
    return ResponseEntity.ok(productService.getProducts());
  }
}
