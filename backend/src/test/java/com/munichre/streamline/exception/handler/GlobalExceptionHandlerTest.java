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
}
