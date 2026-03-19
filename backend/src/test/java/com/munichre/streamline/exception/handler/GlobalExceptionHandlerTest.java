package com.munichre.streamline.exception.handler;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

import com.munichre.streamline.exception.BaseApplicationException;
import com.munichre.streamline.exception.dto.ErrorResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@ExtendWith(MockitoExtension.class)
class GlobalExceptionHandlerTest {

  @InjectMocks private GlobalExceptionHandler globalExceptionHandler;

  @Mock private HttpServletRequest request;

  private static class ConcreteTestException extends BaseApplicationException {
    public ConcreteTestException(String message, HttpStatus status) {
      super(message, status);
    }
  }

  @Test
  @DisplayName("Should handle BaseApplicationException and map status and message correctly")
  void shouldHandleBaseApplicationException() {
    String message = "Rule not found with ID 123";
    HttpStatus status = HttpStatus.NOT_FOUND;
    String uri = "/api/v1/rules/123";

    ConcreteTestException ex = new ConcreteTestException(message, status);
    when(request.getRequestURI()).thenReturn(uri);

    ResponseEntity<ErrorResponseDto> response =
        globalExceptionHandler.handleApplicationException(ex, request);

    assertThat(response.getStatusCode()).isEqualTo(status);
    assertThat(response.getBody()).isNotNull();
    assertThat(response.getBody().status()).isEqualTo(status.value());
    assertThat(response.getBody().error()).isEqualTo(status.getReasonPhrase());
    assertThat(response.getBody().message()).isEqualTo(message);
    assertThat(response.getBody().path()).isEqualTo(uri);
    assertThat(response.getBody().timestamp()).isNotNull();
  }

  @Test
  @DisplayName("Should handle generic Exception and return 500 Internal Server Error")
  void shouldHandleGeneralException() {
    RuntimeException ex = new RuntimeException("Database connection timed out");
    String uri = "/api/v1/quotes";
    when(request.getRequestURI()).thenReturn(uri);

    ResponseEntity<ErrorResponseDto> response =
        globalExceptionHandler.handleGeneralException(ex, request);

    assertThat(response.getStatusCode()).isEqualTo(HttpStatus.INTERNAL_SERVER_ERROR);
    assertThat(response.getBody()).isNotNull();
    assertThat(response.getBody().status()).isEqualTo(500);
    assertThat(response.getBody().message()).isEqualTo("An unexpected error occured");
    assertThat(response.getBody().path()).isEqualTo(uri);
  }
}
