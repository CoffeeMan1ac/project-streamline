package com.munichre.streamline.exception.handler;

import com.munichre.streamline.exception.BaseApplicationException;
import com.munichre.streamline.exception.dto.ErrorResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

  private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

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

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ErrorResponseDto> handleGeneralException(
      final Exception ex, final HttpServletRequest request) {
    log.error("Unexpected error on {}: ", request.getRequestURI(), ex);
    return response(HttpStatus.INTERNAL_SERVER_ERROR, "An unexpected error occured", request);
  }

  @ExceptionHandler(org.springframework.web.bind.MethodArgumentNotValidException.class)
  public ResponseEntity<ErrorResponseDto> handleValidationException(
      final org.springframework.web.bind.MethodArgumentNotValidException ex,
      final jakarta.servlet.http.HttpServletRequest request) {
    return response(
        HttpStatus.BAD_REQUEST,
        "Invalid request payload: " + ex.getBindingResult().getFieldError().getField(),
        request);
  }
}
