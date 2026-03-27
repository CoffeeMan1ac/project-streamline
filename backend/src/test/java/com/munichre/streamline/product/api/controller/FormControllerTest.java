package com.munichre.streamline.product.api.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.munichre.streamline.product.api.dto.CreateFormRequestDto;
import com.munichre.streamline.product.api.dto.FieldDto;
import com.munichre.streamline.product.api.dto.FormDto;
import com.munichre.streamline.product.api.dto.FormSectionDto;
import com.munichre.streamline.product.api.dto.FormSectionInput;
import com.munichre.streamline.product.api.dto.UpdateFormRequestDto;
import com.munichre.streamline.product.exception.FieldNotFoundException;
import com.munichre.streamline.product.exception.FormNotFoundException;
import com.munichre.streamline.product.service.FormService;
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

@WebMvcTest(FormController.class)
@AutoConfigureMockMvc(addFilters = false)
class FormControllerTest {

  @Autowired private MockMvc mockMvc;

  @Autowired private ObjectMapper objectMapper;

  @MockitoBean private FormService formService;

  @Nested
  @DisplayName("GET /backoffice/forms")
  class GetForms {
    @Test
    void returnsFormsList() throws Exception {
      when(formService.getAllForms()).thenReturn(List.of());
      mockMvc.perform(get("/backoffice/forms")).andExpect(status().isOk());
      verify(formService).getAllForms();
    }
  }

  @Nested
  @DisplayName("GET /backoffice/forms/{id}")
  class GetForm {
    @Test
    void returnsForm() throws Exception {
      UUID id = UUID.randomUUID();
      FormDto form = new FormDto(id, "Mobile Form", "For mobile products", List.of());

      when(formService.getForm(id)).thenReturn(form);

      mockMvc
          .perform(get("/backoffice/forms/{id}", id))
          .andExpect(status().isOk())
          .andExpect(jsonPath("$.name").value("Mobile Form"));

      verify(formService).getForm(id);
    }

    @Test
    void returns404WhenNotFound() throws Exception {
      UUID id = UUID.randomUUID();
      when(formService.getForm(id)).thenThrow(new FormNotFoundException(id));

      mockMvc.perform(get("/backoffice/forms/{id}", id)).andExpect(status().isNotFound());
    }
  }

  @Nested
  @DisplayName("POST /backoffice/forms")
  class CreateForm {
    @Test
    void returns201WithSections() throws Exception {
      UUID fieldId = UUID.randomUUID();
      FormSectionInput section =
          new FormSectionInput("personal", "Personal Info", 0, List.of(fieldId));
      CreateFormRequestDto request =
          new CreateFormRequestDto("Mobile Form", "For mobile products", List.of(section));

      UUID formId = UUID.randomUUID();
      UUID sectionId = UUID.randomUUID();
      FieldDto fieldDto =
          new FieldDto(fieldId, "first_name", "text", "First Name", true, null, null);
      FormSectionDto sectionDto =
          new FormSectionDto(sectionId, "personal", "Personal Info", 0, List.of(fieldDto));
      FormDto response =
          new FormDto(formId, "Mobile Form", "For mobile products", List.of(sectionDto));

      when(formService.createForm(any(CreateFormRequestDto.class))).thenReturn(response);

      mockMvc
          .perform(
              post("/backoffice/forms")
                  .contentType(MediaType.APPLICATION_JSON)
                  .content(objectMapper.writeValueAsString(request)))
          .andExpect(status().isCreated())
          .andExpect(jsonPath("$.name").value("Mobile Form"))
          .andExpect(jsonPath("$.sections.length()").value(1))
          .andExpect(jsonPath("$.sections[0].fields.length()").value(1));

      verify(formService).createForm(any(CreateFormRequestDto.class));
    }

    @Test
    void returns404WhenFieldNotFound() throws Exception {
      UUID fieldId = UUID.randomUUID();
      FormSectionInput section =
          new FormSectionInput("personal", "Personal Info", 0, List.of(fieldId));
      CreateFormRequestDto request =
          new CreateFormRequestDto("Form", "Desc", List.of(section));

      when(formService.createForm(any(CreateFormRequestDto.class)))
          .thenThrow(new FieldNotFoundException(fieldId));

      mockMvc
          .perform(
              post("/backoffice/forms")
                  .contentType(MediaType.APPLICATION_JSON)
                  .content(objectMapper.writeValueAsString(request)))
          .andExpect(status().isNotFound());
    }
  }

  @Nested
  @DisplayName("PUT /backoffice/forms/{id}")
  class UpdateForm {
    @Test
    void returns200Ok() throws Exception {
      UUID id = UUID.randomUUID();
      UpdateFormRequestDto request =
          new UpdateFormRequestDto("Updated Form", "Updated desc", List.of());
      FormDto response = new FormDto(id, "Updated Form", "Updated desc", List.of());

      when(formService.updateForm(eq(id), any(UpdateFormRequestDto.class))).thenReturn(response);

      mockMvc
          .perform(
              put("/backoffice/forms/{id}", id)
                  .contentType(MediaType.APPLICATION_JSON)
                  .content(objectMapper.writeValueAsString(request)))
          .andExpect(status().isOk())
          .andExpect(jsonPath("$.name").value("Updated Form"));

      verify(formService).updateForm(eq(id), any(UpdateFormRequestDto.class));
    }

    @Test
    void returns404WhenFormNotFound() throws Exception {
      UUID id = UUID.randomUUID();
      UpdateFormRequestDto request = new UpdateFormRequestDto("Form", "Desc", List.of());

      when(formService.updateForm(eq(id), any(UpdateFormRequestDto.class)))
          .thenThrow(new FormNotFoundException(id));

      mockMvc
          .perform(
              put("/backoffice/forms/{id}", id)
                  .contentType(MediaType.APPLICATION_JSON)
                  .content(objectMapper.writeValueAsString(request)))
          .andExpect(status().isNotFound());
    }
  }
}
