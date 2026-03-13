package com.munichre.streamline.product.api.controller;

import static com.munichre.streamline.constant.ApiRoutes.CUSTOMER_API_BASE;

import com.munichre.streamline.product.api.dto.ProductDto;
import com.munichre.streamline.product.api.dto.ProductOptionDto;
import com.munichre.streamline.product.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(CUSTOMER_API_BASE + "/products")
@RequiredArgsConstructor
@Tag(name = "Customer Products", description = "Endpoints used by customers to browse products")
public class CustomerProductController {

  private final ProductService productService;

  @Operation(
      summary = "Get active products",
      description = "Returns all active products available to customers")
  @ApiResponses({
    @ApiResponse(responseCode = "200", description = "Products returned successfully"),
    @ApiResponse(responseCode = "500", description = "Internal server error")
  })
  @GetMapping
  public ResponseEntity<List<ProductDto>> getProducts() {
    return ResponseEntity.ok(productService.getActiveProducts());
  }

  @Operation(
      summary = "Get product options",
      description = "Returns selectable options for active customer products")
  @ApiResponses({
    @ApiResponse(responseCode = "200", description = "Options returned successfully"),
    @ApiResponse(responseCode = "500", description = "Internal server error")
  })
  @GetMapping("/options") // ← IMPORTANT FIX
  public ResponseEntity<List<ProductOptionDto>> getProductOptions() {
    return ResponseEntity.ok(productService.getActiveProductOptions());
  }
}
