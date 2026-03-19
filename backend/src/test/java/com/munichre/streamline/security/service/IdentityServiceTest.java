package com.munichre.streamline.security.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.munichre.streamline.security.exception.UnauthenticatedException;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

@ExtendWith(MockitoExtension.class)
class IdentityServiceTest {

  @InjectMocks private IdentityService identityService;

  @Mock private SecurityContext securityContext;

  @Mock private Authentication authentication;

  @BeforeEach
  void setUp() {
    SecurityContextHolder.setContext(securityContext);
  }

  @AfterEach
  void tearDown() {
    SecurityContextHolder.clearContext();
  }

  @Test
  @DisplayName("Should return user ID when authentication is valid and authenticated")
  void shouldReturnUserIdWhenAuthenticated() {
    String expectedUserId = "user-123-uuid";
    when(securityContext.getAuthentication()).thenReturn(authentication);
    when(authentication.isAuthenticated()).thenReturn(true);
    when(authentication.getPrincipal()).thenReturn(expectedUserId);

    String actualUserId = identityService.getUserId();

    assertThat(actualUserId).isEqualTo(expectedUserId);
  }

  @Test
  @DisplayName("Should throw UnauthenticatedException when authentication is null")
  void shouldThrowExceptionWhenAuthIsNull() {
    when(securityContext.getAuthentication()).thenReturn(null);

    assertThatThrownBy(() -> identityService.getUserId())
        .isInstanceOf(UnauthenticatedException.class);
  }

  @Test
  @DisplayName("Should throw UnauthenticatedException when isAuthenticated is false")
  void shouldThrowExceptionWhenNotAuthenticated() {
    when(securityContext.getAuthentication()).thenReturn(authentication);
    when(authentication.isAuthenticated()).thenReturn(false);

    assertThatThrownBy(() -> identityService.getUserId())
        .isInstanceOf(UnauthenticatedException.class);
  }

  @Test
  @DisplayName("Should throw UnauthenticatedException when token is anonymous")
  void shouldThrowExceptionWhenAnonymousToken() {
    AnonymousAuthenticationToken anonymousToken = mock(AnonymousAuthenticationToken.class);
    when(securityContext.getAuthentication()).thenReturn(anonymousToken);

    assertThatThrownBy(() -> identityService.getUserId())
        .isInstanceOf(UnauthenticatedException.class);
  }
}
