package com.munichre.streamline.product.api.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.munichre.streamline.product.api.dto.CoverageOptionDto;
import com.munichre.streamline.product.api.dto.CreateCoverageRequestDto;
import com.munichre.streamline.product.api.dto.CreateFieldRequestDto;
import com.munichre.streamline.product.api.dto.CreateProductRequestDto;
import com.munichre.streamline.product.api.dto.CreateTagRequestDto;
import com.munichre.streamline.product.api.dto.FieldDto;
import com.munichre.streamline.product.api.dto.ProductFieldDto;
import com.munichre.streamline.product.api.dto.ProductOptionDto;
import com.munichre.streamline.product.api.dto.TagOptionDto;
import com.munichre.streamline.product.api.dto.UpdateCoverageRequestDto;
import com.munichre.streamline.product.api.dto.UpdateFieldRequestDto;
import com.munichre.streamline.product.api.dto.UpdateProductRequestDto;
import com.munichre.streamline.product.api.dto.UpdateTagRequestDto;
import com.munichre.streamline.product.exception.CoverageCategoryNotFoundException;
import com.munichre.streamline.product.exception.CoverageNotFoundException;
import com.munichre.streamline.product.exception.DuplicateFieldCodeException;
import com.munichre.streamline.product.exception.DuplicateTagCodeException;
import com.munichre.streamline.product.exception.FieldNotFoundException;
import com.munichre.streamline.product.exception.InvalidProductFieldException;
import com.munichre.streamline.product.exception.ProductNotFoundException;
import com.munichre.streamline.product.exception.ProductTagNotFoundException;
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

  @Nested
  @DisplayName("PUT /backoffice/products/{id}")
  class UpdateProduct {
    @Test
    void returns200Ok() throws Exception {
      UUID id = UUID.randomUUID();

      UpdateProductRequestDto request =
          UpdateProductRequestDto.builder()
              .name("Updated Name")
              .baseRate(new BigDecimal("150.00"))
              .startDate(LocalDateTime.now())
              .coverages(List.of())
              .exclusions(List.of())
              .tags(List.of())
              .build();

      mockMvc
          .perform(
              put("/backoffice/products/{id}", id)
                  .contentType(MediaType.APPLICATION_JSON)
                  .content(objectMapper.writeValueAsString(request)))
          .andExpect(status().isOk());

      verify(productService).updateProduct(eq(id), any(UpdateProductRequestDto.class));
    }
  }

  @Nested
  @DisplayName("POST /backoffice/products/coverages")
  class CreateCoverage {
    @Test
    void returns201Created() throws Exception {
      UUID catId = UUID.randomUUID();
      UUID typeId = UUID.randomUUID();
      CreateCoverageRequestDto request =
          new CreateCoverageRequestDto("NEW_COV", "New Coverage", catId, typeId);
      CoverageOptionDto response =
          new CoverageOptionDto(UUID.randomUUID(), "NEW_COV", "New Coverage");

      when(productService.createCoverage(any(CreateCoverageRequestDto.class))).thenReturn(response);

      mockMvc
          .perform(
              post("/backoffice/products/coverages")
                  .contentType(MediaType.APPLICATION_JSON)
                  .content(objectMapper.writeValueAsString(request)))
          .andExpect(status().isCreated())
          .andExpect(jsonPath("$.code").value("NEW_COV"))
          .andExpect(jsonPath("$.label").value("New Coverage"));

      verify(productService).createCoverage(any(CreateCoverageRequestDto.class));
    }

    @Test
    void returns404WhenCategoryNotFound() throws Exception {
      UUID catId = UUID.randomUUID();
      UUID typeId = UUID.randomUUID();
      CreateCoverageRequestDto request =
          new CreateCoverageRequestDto("COV", "Coverage", catId, typeId);

      when(productService.createCoverage(any(CreateCoverageRequestDto.class)))
          .thenThrow(new CoverageCategoryNotFoundException(catId));

      mockMvc
          .perform(
              post("/backoffice/products/coverages")
                  .contentType(MediaType.APPLICATION_JSON)
                  .content(objectMapper.writeValueAsString(request)))
          .andExpect(status().isNotFound());
    }
  }

  @Nested
  @DisplayName("PUT /backoffice/products/coverages/{id}")
  class UpdateCoverage {
    @Test
    void returns200Ok() throws Exception {
      UUID id = UUID.randomUUID();
      UUID catId = UUID.randomUUID();
      UpdateCoverageRequestDto request = new UpdateCoverageRequestDto("Updated Label", catId);
      CoverageOptionDto response = new CoverageOptionDto(id, "COV_CODE", "Updated Label");

      when(productService.updateCoverage(eq(id), any(UpdateCoverageRequestDto.class)))
          .thenReturn(response);

      mockMvc
          .perform(
              put("/backoffice/products/coverages/{id}", id)
                  .contentType(MediaType.APPLICATION_JSON)
                  .content(objectMapper.writeValueAsString(request)))
          .andExpect(status().isOk())
          .andExpect(jsonPath("$.label").value("Updated Label"));

      verify(productService).updateCoverage(eq(id), any(UpdateCoverageRequestDto.class));
    }

    @Test
    void returns404WhenCoverageNotFound() throws Exception {
      UUID id = UUID.randomUUID();
      UUID catId = UUID.randomUUID();
      UpdateCoverageRequestDto request = new UpdateCoverageRequestDto("Label", catId);

      when(productService.updateCoverage(eq(id), any(UpdateCoverageRequestDto.class)))
          .thenThrow(new CoverageNotFoundException(id));

      mockMvc
          .perform(
              put("/backoffice/products/coverages/{id}", id)
                  .contentType(MediaType.APPLICATION_JSON)
                  .content(objectMapper.writeValueAsString(request)))
          .andExpect(status().isNotFound());
    }
  }

  @Nested
  @DisplayName("POST /backoffice/products/tags")
  class CreateTag {
    @Test
    void returns201Created() throws Exception {
      CreateTagRequestDto request = new CreateTagRequestDto("NEW_TAG", "New Tag", "#FF0000");
      TagOptionDto response = new TagOptionDto(UUID.randomUUID(), "NEW_TAG", "New Tag", "#FF0000");

      when(productService.createTag(any(CreateTagRequestDto.class))).thenReturn(response);

      mockMvc
          .perform(
              post("/backoffice/products/tags")
                  .contentType(MediaType.APPLICATION_JSON)
                  .content(objectMapper.writeValueAsString(request)))
          .andExpect(status().isCreated())
          .andExpect(jsonPath("$.code").value("NEW_TAG"))
          .andExpect(jsonPath("$.label").value("New Tag"));

      verify(productService).createTag(any(CreateTagRequestDto.class));
    }

    @Test
    void returns400WhenDuplicateCode() throws Exception {
      CreateTagRequestDto request = new CreateTagRequestDto("EXISTING", "Tag", "#FF0000");

      when(productService.createTag(any(CreateTagRequestDto.class)))
          .thenThrow(new DuplicateTagCodeException("EXISTING"));

      mockMvc
          .perform(
              post("/backoffice/products/tags")
                  .contentType(MediaType.APPLICATION_JSON)
                  .content(objectMapper.writeValueAsString(request)))
          .andExpect(status().isBadRequest());
    }
  }

  @Nested
  @DisplayName("PUT /backoffice/products/tags/{id}")
  class UpdateTag {
    @Test
    void returns200Ok() throws Exception {
      UUID id = UUID.randomUUID();
      UpdateTagRequestDto request = new UpdateTagRequestDto("Updated Label", "#FF0000");
      TagOptionDto response = new TagOptionDto(id, "TAG_CODE", "Updated Label", "#FF0000");

      when(productService.updateTag(eq(id), any(UpdateTagRequestDto.class))).thenReturn(response);

      mockMvc
          .perform(
              put("/backoffice/products/tags/{id}", id)
                  .contentType(MediaType.APPLICATION_JSON)
                  .content(objectMapper.writeValueAsString(request)))
          .andExpect(status().isOk())
          .andExpect(jsonPath("$.label").value("Updated Label"));

      verify(productService).updateTag(eq(id), any(UpdateTagRequestDto.class));
    }

    @Test
    void returns404WhenTagNotFound() throws Exception {
      UUID id = UUID.randomUUID();
      UpdateTagRequestDto request = new UpdateTagRequestDto("Label", "#FF0000");

      when(productService.updateTag(eq(id), any(UpdateTagRequestDto.class)))
          .thenThrow(new ProductTagNotFoundException(id));

      mockMvc
          .perform(
              put("/backoffice/products/tags/{id}", id)
                  .contentType(MediaType.APPLICATION_JSON)
                  .content(objectMapper.writeValueAsString(request)))
          .andExpect(status().isNotFound());
    }
  }

  @Nested
  @DisplayName("GET /backoffice/products/fields")
  class GetFields {
    @Test
    void returnsFields() throws Exception {
      when(productService.getAllFields()).thenReturn(List.of());
      mockMvc.perform(get("/backoffice/products/fields")).andExpect(status().isOk());
      verify(productService).getAllFields();
    }
  }

  @Nested
  @DisplayName("POST /backoffice/products/fields")
  class CreateField {
    @Test
    void returns201Created() throws Exception {
      CreateFieldRequestDto request =
          new CreateFieldRequestDto("phone_make", "text", "Phone Make", true, null, null);
      FieldDto response =
          new FieldDto(UUID.randomUUID(), "phone_make", "text", "Phone Make", true, null, null);

      when(productService.createField(any(CreateFieldRequestDto.class))).thenReturn(response);

      mockMvc
          .perform(
              post("/backoffice/products/fields")
                  .contentType(MediaType.APPLICATION_JSON)
                  .content(objectMapper.writeValueAsString(request)))
          .andExpect(status().isCreated())
          .andExpect(jsonPath("$.code").value("phone_make"))
          .andExpect(jsonPath("$.label").value("Phone Make"));

      verify(productService).createField(any(CreateFieldRequestDto.class));
    }

    @Test
    void returns400WhenDuplicateCode() throws Exception {
      CreateFieldRequestDto request =
          new CreateFieldRequestDto("phone_make", "text", "Phone Make", true, null, null);

      when(productService.createField(any(CreateFieldRequestDto.class)))
          .thenThrow(new DuplicateFieldCodeException("phone_make"));

      mockMvc
          .perform(
              post("/backoffice/products/fields")
                  .contentType(MediaType.APPLICATION_JSON)
                  .content(objectMapper.writeValueAsString(request)))
          .andExpect(status().isBadRequest());
    }
  }

  @Nested
  @DisplayName("PUT /backoffice/products/fields/{id}")
  class UpdateField {
    @Test
    void returns200Ok() throws Exception {
      UUID id = UUID.randomUUID();
      UpdateFieldRequestDto request =
          new UpdateFieldRequestDto("text", "Updated Label", true, "^[A-Z]+$", null);
      FieldDto response =
          new FieldDto(id, "phone_make", "text", "Updated Label", true, "^[A-Z]+$", null);

      when(productService.updateField(eq(id), any(UpdateFieldRequestDto.class)))
          .thenReturn(response);

      mockMvc
          .perform(
              put("/backoffice/products/fields/{id}", id)
                  .contentType(MediaType.APPLICATION_JSON)
                  .content(objectMapper.writeValueAsString(request)))
          .andExpect(status().isOk())
          .andExpect(jsonPath("$.label").value("Updated Label"))
          .andExpect(jsonPath("$.regexPattern").value("^[A-Z]+$"));

      verify(productService).updateField(eq(id), any(UpdateFieldRequestDto.class));
    }

    @Test
    void returns404WhenFieldNotFound() throws Exception {
      UUID id = UUID.randomUUID();
      UpdateFieldRequestDto request =
          new UpdateFieldRequestDto("text", "Label", true, null, null);

      when(productService.updateField(eq(id), any(UpdateFieldRequestDto.class)))
          .thenThrow(new FieldNotFoundException(id));

      mockMvc
          .perform(
              put("/backoffice/products/fields/{id}", id)
                  .contentType(MediaType.APPLICATION_JSON)
                  .content(objectMapper.writeValueAsString(request)))
          .andExpect(status().isNotFound());
    }
  }

  @Nested
  @DisplayName("GET /backoffice/products/{id}/form-fields")
  class GetFormFields {
    @Test
    void returns200WithFields() throws Exception {
      UUID id = UUID.randomUUID();
      List<ProductFieldDto> fields =
          List.of(new ProductFieldDto("make", "text", "Phone Make", true, null));

      when(productService.getProductFormFields(id)).thenReturn(fields);

      mockMvc
          .perform(get("/backoffice/products/{id}/form-fields", id))
          .andExpect(status().isOk())
          .andExpect(jsonPath("$.length()").value(1))
          .andExpect(jsonPath("$[0].name").value("make"));

      verify(productService).getProductFormFields(id);
    }

    @Test
    void returns404WhenProductNotFound() throws Exception {
      UUID id = UUID.randomUUID();

      when(productService.getProductFormFields(id)).thenThrow(new ProductNotFoundException(id));

      mockMvc
          .perform(get("/backoffice/products/{id}/form-fields", id))
          .andExpect(status().isNotFound());
    }
  }

  @Nested
  @DisplayName("PUT /backoffice/products/{id}/form-fields")
  class UpdateFormFields {
    @Test
    void returns200OnValidReplacement() throws Exception {
      UUID id = UUID.randomUUID();
      List<ProductFieldDto> fields =
          List.of(new ProductFieldDto("make", "text", "Phone Make", true, null));

      when(productService.updateProductFormFields(eq(id), any())).thenReturn(fields);

      mockMvc
          .perform(
              put("/backoffice/products/{id}/form-fields", id)
                  .contentType(MediaType.APPLICATION_JSON)
                  .content(objectMapper.writeValueAsString(fields)))
          .andExpect(status().isOk())
          .andExpect(jsonPath("$[0].name").value("make"));

      verify(productService).updateProductFormFields(eq(id), any());
    }

    @Test
    void returns400WhenFieldMissingRequiredAttribute() throws Exception {
      UUID id = UUID.randomUUID();
      List<ProductFieldDto> fields =
          List.of(new ProductFieldDto(null, "text", "Label", true, null));

      when(productService.updateProductFormFields(eq(id), any()))
          .thenThrow(new InvalidProductFieldException("Each product field must have a name."));

      mockMvc
          .perform(
              put("/backoffice/products/{id}/form-fields", id)
                  .contentType(MediaType.APPLICATION_JSON)
                  .content(objectMapper.writeValueAsString(fields)))
          .andExpect(status().isBadRequest());
    }

    @Test
    void returns404WhenProductNotFound() throws Exception {
      UUID id = UUID.randomUUID();
      List<ProductFieldDto> fields =
          List.of(new ProductFieldDto("make", "text", "Phone Make", true, null));

      when(productService.updateProductFormFields(eq(id), any()))
          .thenThrow(new ProductNotFoundException(id));

      mockMvc
          .perform(
              put("/backoffice/products/{id}/form-fields", id)
                  .contentType(MediaType.APPLICATION_JSON)
                  .content(objectMapper.writeValueAsString(fields)))
          .andExpect(status().isNotFound());
    }
  }
}
