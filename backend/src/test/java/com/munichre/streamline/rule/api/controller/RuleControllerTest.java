package com.munichre.streamline.rule.api.controller;

import static com.munichre.streamline.constant.ApiRoutes.BACKOFFICE_API_BASE;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.munichre.streamline.rule.api.dto.RuleCreateRequest;
import com.munichre.streamline.rule.api.dto.RuleReorderRequest;
import com.munichre.streamline.rule.api.dto.RuleResponse;
import com.munichre.streamline.rule.api.dto.RuleUpdateRequest;
import com.munichre.streamline.rule.model.RuleConfig;
import com.munichre.streamline.rule.service.RuleService;
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

@WebMvcTest(RuleController.class)
@AutoConfigureMockMvc(addFilters = false)
class RuleControllerTest {

  @Autowired private MockMvc mockMvc;

  @Autowired private ObjectMapper objectMapper;

  @MockitoBean private RuleService ruleService;

  private final String baseUrl = BACKOFFICE_API_BASE + "/rules";

  private final UUID productId = UUID.randomUUID();
  private final UUID ruleId = UUID.randomUUID();

  @Nested
  @DisplayName("POST /rules")
  class CreateRule {
    @Test
    @DisplayName("should return 201 Created when request is valid")
    void returns201AndRule() throws Exception {
      var request =
          new RuleCreateRequest(
              productId,
              "New Rule",
              "Description",
              true,
              "Acceptance Reason",
              new RuleConfig(null, null) // Simple config object
              );

      var response =
          new RuleResponse(
              ruleId,
              productId,
              "New Rule",
              "Description",
              "Reason",
              1,
              true,
              null,
              LocalDateTime.now(),
              null);

      when(ruleService.createRule(any(RuleCreateRequest.class))).thenReturn(response);

      mockMvc
          .perform(
              post(baseUrl)
                  .contentType(MediaType.APPLICATION_JSON)
                  .content(objectMapper.writeValueAsString(request))
                  .accept(MediaType.APPLICATION_JSON))
          .andExpect(status().isCreated())
          .andExpect(jsonPath("$.id").value(ruleId.toString()))
          .andExpect(jsonPath("$.name").value("New Rule"));

      verify(ruleService).createRule(any(RuleCreateRequest.class));
    }
  }

  @Nested
  @DisplayName("GET /rules")
  class GetRules {
    @Test
    @DisplayName("should return 200 and filter rules by product and status")
    void returns200AndRuleList() throws Exception {
      var response =
          List.of(
              new RuleResponse(ruleId, productId, "Rule 1", null, null, 1, true, null, null, null));

      when(ruleService.getRules(eq(productId), eq(true))).thenReturn(response);

      mockMvc
          .perform(
              get(baseUrl)
                  .param("product", productId.toString())
                  .param("active", "true")
                  .accept(MediaType.APPLICATION_JSON))
          .andExpect(status().isOk())
          .andExpect(jsonPath("$.length()").value(1))
          .andExpect(jsonPath("$[0].productId").value(productId.toString()));

      verify(ruleService).getRules(productId, true);
    }
  }

  @Nested
  @DisplayName("GET /rules/{id}")
  class GetRule {
    @Test
    @DisplayName("should return 200 for a specific rule ID")
    void returns200AndRule() throws Exception {
      var response =
          new RuleResponse(ruleId, productId, "Found Rule", null, null, 1, true, null, null, null);

      when(ruleService.getRule(ruleId)).thenReturn(response);

      mockMvc
          .perform(get(baseUrl + "/{id}", ruleId).accept(MediaType.APPLICATION_JSON))
          .andExpect(status().isOk())
          .andExpect(jsonPath("$.id").value(ruleId.toString()))
          .andExpect(jsonPath("$.name").value("Found Rule"));

      verify(ruleService).getRule(ruleId);
    }
  }

  @Nested
  @DisplayName("PUT /rules/reorder")
  class ReorderRule {
    @Test
    @DisplayName("should return 200 after reordering rules")
    void returns200AndReorderedList() throws Exception {
      var request = new RuleReorderRequest(productId, ruleId, 1);
      var response =
          List.of(
              new RuleResponse(ruleId, productId, "Rule 1", null, null, 1, true, null, null, null));

      when(ruleService.reorderRule(any(RuleReorderRequest.class))).thenReturn(response);

      mockMvc
          .perform(
              put(baseUrl + "/reorder")
                  .contentType(MediaType.APPLICATION_JSON)
                  .content(objectMapper.writeValueAsString(request))
                  .accept(MediaType.APPLICATION_JSON))
          .andExpect(status().isOk())
          .andExpect(jsonPath("$.length()").value(1))
          .andExpect(jsonPath("$[0].priority").value(1));

      verify(ruleService).reorderRule(any(RuleReorderRequest.class));
    }
  }

  @Nested
  @DisplayName("PATCH /rules/{id}")
  class UpdateRule {
    @Test
    @DisplayName("should return 200 and updated fields")
    void returns200AndUpdatedRule() throws Exception {
      var request = new RuleUpdateRequest("Updated Name", null, false, "New Reason", null);
      var response =
          new RuleResponse(
              ruleId, productId, "Updated Name", null, "New Reason", 1, false, null, null, null);

      when(ruleService.updateRule(eq(ruleId), any(RuleUpdateRequest.class))).thenReturn(response);

      mockMvc
          .perform(
              patch(baseUrl + "/{id}", ruleId)
                  .contentType(MediaType.APPLICATION_JSON)
                  .content(objectMapper.writeValueAsString(request))
                  .accept(MediaType.APPLICATION_JSON))
          .andExpect(status().isOk())
          .andExpect(jsonPath("$.name").value("Updated Name"))
          .andExpect(jsonPath("$.active").value(false));

      verify(ruleService).updateRule(eq(ruleId), any(RuleUpdateRequest.class));
      verifyNoMoreInteractions(ruleService);
    }
  }
}
