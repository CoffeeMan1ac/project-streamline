package com.munichre.streamline.rule.api.controller;

import static com.munichre.streamline.constant.ApiRoutes.BACKOFFICE_API_BASE;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.munichre.streamline.rule.api.dto.RuleCreateRequest;
import com.munichre.streamline.rule.api.dto.RuleResponse;
import com.munichre.streamline.rule.model.RuleConfig;
import com.munichre.streamline.rule.service.RuleService;
import java.time.LocalDateTime;
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
}
