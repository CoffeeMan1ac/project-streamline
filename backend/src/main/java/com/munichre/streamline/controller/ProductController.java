package com.munichre.streamline.controller;

import com.munichre.streamline.dto.ProductDto;
import com.munichre.streamline.service.ProductService;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
public class ProductController {

  private final ProductService productService;

  // constructor injection
  public ProductController(ProductService productService) {
    this.productService = productService;
  }

  // returns all active products
  @GetMapping
  public ResponseEntity<List<ProductDto>> getProducts() {
    List<ProductDto> products = productService.getActiveProducts();
    return ResponseEntity.ok(products);
  }

  // deletes selected product
  // @DeleteMapping("/{id}")
  // public ResponseEntity<Void> deleteProduct(@PathVariable UUID id) {
  //    productService.deleteProduct(id);
  //    return ResponseEntity.noContent().build();
  // }
}
