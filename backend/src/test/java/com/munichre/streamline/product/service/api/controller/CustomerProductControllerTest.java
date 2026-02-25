package com.munichre.streamline.product.service.api.controller;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.munichre.streamline.product.api.controller.CustomerProductController;
import com.munichre.streamline.product.api.dto.ProductDto;
import com.munichre.streamline.product.api.dto.ProductOptionDto;
import com.munichre.streamline.product.service.ProductService;
import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(CustomerProductController.class)
class CustomerProductControllerTest {

  @Autowired private MockMvc mockMvc;

  @MockitoBean private ProductService productService;

  @Nested
  @DisplayName("GET /api/customer/products")
  class GetProducts {

    @Test
    void returns200AndProducts() throws Exception {
      UUID id1 = UUID.randomUUID();
      UUID id2 = UUID.randomUUID();

      ProductDto p1 =
          new ProductDto(
              id1,
              new BigDecimal("9.99"),
              "Standard Shield",
              "Desc 1",
              List.of(),
              null,
              List.of(),
              List.of());

      ProductDto p2 =
          new ProductDto(
              id2,
              new BigDecimal("19.99"),
              "Premium Shield",
              "Desc 2",
              List.of(),
              null,
              List.of(),
              List.of());

      when(productService.getActiveProducts()).thenReturn(List.of(p1, p2));

      mockMvc
          .perform(get("/api/customer/products").accept(MediaType.APPLICATION_JSON))
          .andExpect(status().isOk())
          .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
          .andExpect(jsonPath("$.length()").value(2))
          .andExpect(jsonPath("$[0].id").value(id1.toString()))
          .andExpect(jsonPath("$[0].name").value("Standard Shield"))
          .andExpect(jsonPath("$[0].baseRate").value(9.99))
          .andExpect(jsonPath("$[1].id").value(id2.toString()))
          .andExpect(jsonPath("$[1].name").value("Premium Shield"))
          .andExpect(jsonPath("$[1].baseRate").value(19.99));

      verify(productService).getActiveProducts();
      verifyNoMoreInteractions(productService);
    }

    @Test
    void returns200AndEmptyList() throws Exception {
      when(productService.getActiveProducts()).thenReturn(List.of());

      mockMvc
          .perform(get("/api/customer/products").accept(MediaType.APPLICATION_JSON))
          .andExpect(status().isOk())
          .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
          .andExpect(jsonPath("$.length()").value(0));

      verify(productService).getActiveProducts();
      verifyNoMoreInteractions(productService);
    }
  }

  @Nested
  @DisplayName("GET /api/customer/products/options")
  class GetProductOptions {
    @Test
    void returns200AndOptions() throws Exception {
      UUID id1 = UUID.randomUUID();
      UUID id2 = UUID.randomUUID();

      ProductOptionDto o1 = new ProductOptionDto(id1, "Standard Shield");
      ProductOptionDto o2 = new ProductOptionDto(id2, "Premium Shield");

      when(productService.getActiveProductOptions()).thenReturn(List.of(o1, o2));

      mockMvc
          .perform(get("/api/customer/products/options").accept(MediaType.APPLICATION_JSON))
          .andExpect(status().isOk())
          .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
          .andExpect(jsonPath("$.length()").value(2));

      verify(productService).getActiveProductOptions();
      verifyNoMoreInteractions(productService);
    }

    @Test
    void returns200AndEmptyList() throws Exception {
      when(productService.getActiveProductOptions()).thenReturn(List.of());

      mockMvc
          .perform(get("/api/customer/products/options").accept(MediaType.APPLICATION_JSON))
          .andExpect(status().isOk())
          .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
          .andExpect(jsonPath("$.length()").value(0));

      verify(productService).getActiveProductOptions();
      verifyNoMoreInteractions(productService);
    }
  }
}
