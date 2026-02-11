package com.munichre.streamline.controller;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    //constructor injection
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<Product>> get_products() {
        List<Product> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }
}
