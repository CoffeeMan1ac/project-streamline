package com.munichre.streamline.product.api.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.munichre.streamline.product.api.dto.CreateProductRequestDto;
import com.munichre.streamline.product.api.dto.ProductOptionDto;
import com.munichre.streamline.product.service.ProductService;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(BackofficeProductController.class)
@AutoConfigureMockMvc(addFilters = false)
class BackofficeProductControllerTest {

  @Autowired private MockMvc mockMvc;

  @Autowired private ObjectMapper objectMapper;

  @MockitoBean private ProductService productService;

  @Nested
  @DisplayName("GET /backoffice/products/options")
  class GetProductOptions {
    @Test
    void returns200AndOptions() throws Exception {
      UUID id1 = UUID.randomUUID();
      UUID id2 = UUID.randomUUID();

      ProductOptionDto o1 = new ProductOptionDto(id1, "Standard Shield");
      ProductOptionDto o2 = new ProductOptionDto(id2, "Premium Shield");

      when(productService.getAllProductOptions()).thenReturn(List.of(o1, o2));

      mockMvc
          .perform(get("/backoffice/products/options").accept(MediaType.APPLICATION_JSON))
          .andExpect(status().isOk())
          .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
          .andExpect(jsonPath("$.length()").value(2));

      verify(productService).getAllProductOptions();
      verifyNoMoreInteractions(productService);
    }

    @Test
    void returns200AndEmptyList() throws Exception {
      when(productService.getAllProductOptions()).thenReturn(List.of());

      mockMvc
          .perform(get("/backoffice/products/options").accept(MediaType.APPLICATION_JSON))
          .andExpect(status().isOk())
          .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
          .andExpect(jsonPath("$.length()").value(0));

      verify(productService).getAllProductOptions();
      verifyNoMoreInteractions(productService);
    }
  }

  @Nested
  @DisplayName("GET /backoffice/products")
  class GetProducts {
    @Test
    void returnsProductsFilteredByActive() throws Exception {
      when(productService.getProducts(true)).thenReturn(List.of());
      mockMvc
          .perform(get("/backoffice/products").param("active", "true"))
          .andExpect(status().isOk());
      verify(productService).getProducts(true);
    }

    @Test
    void returnsAllProductsWhenActiveIsNull() throws Exception {
      when(productService.getProducts(null)).thenReturn(List.of());
      mockMvc.perform(get("/backoffice/products")).andExpect(status().isOk());
      verify(productService).getProducts(null);
    }
  }

  @Nested
  @DisplayName("POST /backoffice/products")
  class CreateProduct {
    @Test
    void returns201Created() throws Exception {
      CreateProductRequestDto request =
          CreateProductRequestDto.builder()
              .name("New Product")
              .description("Description")
              .baseRate(new BigDecimal("100.00"))
              .type(UUID.randomUUID())
              .startDate(LocalDateTime.now())
              .coverages(List.of())
              .exclusions(List.of())
              .tags(List.of())
              .build();

      mockMvc
          .perform(
              post("/backoffice/products")
                  .contentType(MediaType.APPLICATION_JSON)
                  .content(objectMapper.writeValueAsString(request)))
          .andExpect(status().isCreated());

      verify(productService).createProduct(any(CreateProductRequestDto.class));
    }
  }

  @Nested
  @DisplayName("PATCH /backoffice/products/{id}/active")
  class ToggleActive {
    @Test
    void returns200Ok() throws Exception {
      UUID id = UUID.randomUUID();
      mockMvc.perform(patch("/backoffice/products/{id}/active", id)).andExpect(status().isOk());
      verify(productService).toggleProductActive(id);
    }
  }

  @Nested
  @DisplayName("GET /backoffice/products/coverages")
  class GetCoverages {
    @Test
    void returnsCoverages() throws Exception {
      when(productService.getAllCoverages()).thenReturn(List.of());
      mockMvc.perform(get("/backoffice/products/coverages")).andExpect(status().isOk());
      verify(productService).getAllCoverages();
    }
  }

  @Nested
  @DisplayName("GET /backoffice/products/tags")
  class GetTags {
    @Test
    void returnsTags() throws Exception {
      when(productService.getAllTags()).thenReturn(List.of());
      mockMvc.perform(get("/backoffice/products/tags")).andExpect(status().isOk());
      verify(productService).getAllTags();
    }
  }

  @Nested
  @DisplayName("GET /backoffice/products/{id}")
  class GetProductById {
    @Test
    void returnsProductDto() throws Exception {
      UUID id = UUID.randomUUID();
      mockMvc.perform(get("/backoffice/products/{id}", id)).andExpect(status().isOk());
      verify(productService).getProductDto(id);
    }
  }
}
