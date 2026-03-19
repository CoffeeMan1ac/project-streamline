package com.munichre.streamline.product.api.controller;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.munichre.streamline.product.api.dto.ProductOptionDto;
import com.munichre.streamline.product.service.ProductService;
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
}
