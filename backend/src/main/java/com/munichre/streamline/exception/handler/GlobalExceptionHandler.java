package com.munichre.streamline.exception.handler;

import com.munichre.streamline.exception.BaseApplicationException;
import com.munichre.streamline.exception.dto.ErrorResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

  private ResponseEntity<ErrorResponseDto> response(
      final HttpStatus status, final String message, final HttpServletRequest request) {

    final ErrorResponseDto errorResponse =
        new ErrorResponseDto(
            LocalDateTime.now(),
            status.value(),
            status.getReasonPhrase(),
            message,
            request.getRequestURI());

    return new ResponseEntity<>(errorResponse, status);
  }

  @ExceptionHandler(BaseApplicationException.class)
  public ResponseEntity<ErrorResponseDto> handleApplicationException(
      final BaseApplicationException ex, final HttpServletRequest request) {
    return response(ex.getStatus(), ex.getMessage(), request);
  }
  
}
