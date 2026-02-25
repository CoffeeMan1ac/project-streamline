package com.munichre.streamline.product.api.controller;

import com.munichre.streamline.product.api.dto.ProductDto;
import com.munichre.streamline.product.api.dto.ProductOptionDto;
import com.munichre.streamline.product.service.ProductService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/customer/products")
@RequiredArgsConstructor
public class CustomerProductController {

  private final ProductService productService;

  @GetMapping
  public ResponseEntity<List<ProductDto>> getProducts() {
    List<ProductDto> products = productService.getActiveProducts();
    return ResponseEntity.ok(products);
  }

  @GetMapping("options")
  public ResponseEntity<List<ProductOptionDto>> getProductOptions() {
    List<ProductOptionDto> productOptions = productService.getActiveProductOptions();
    return ResponseEntity.ok(productOptions);
  }
}
