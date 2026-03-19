package com.munichre.streamline.security.filter;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.context.SecurityContextHolder;

@ExtendWith(MockitoExtension.class)
class FirebaseTokenFilterTest {

  private FirebaseTokenFilter filter;

  @Mock private HttpServletRequest request;
  @Mock private HttpServletResponse response;
  @Mock private FilterChain chain;
  @Mock private FirebaseAuth firebaseAuth;
  @Mock private FirebaseToken firebaseToken;

  private MockedStatic<FirebaseAuth> firebaseAuthStatic;

  @BeforeEach
  void setUp() {
    filter = new FirebaseTokenFilter();
    firebaseAuthStatic = mockStatic(FirebaseAuth.class);
    SecurityContextHolder.clearContext();
  }

  @AfterEach
  void tearDown() {
    firebaseAuthStatic.close();
    SecurityContextHolder.clearContext();
  }

  @Test
  @DisplayName("Should immediately proceed and skip logic for OPTIONS requests")
  void shouldSkipForOptionsRequest() throws ServletException, IOException {
    when(request.getMethod()).thenReturn("OPTIONS");

    filter.doFilterInternal(request, response, chain);

    verify(chain).doFilter(request, response);
    assertThat(SecurityContextHolder.getContext().getAuthentication()).isNull();
  }

  @Test
  @DisplayName("Should proceed without auth if Authorization header is missing")
  void shouldProceedWhenNoHeader() throws ServletException, IOException {
    when(request.getMethod()).thenReturn("GET");
    when(request.getHeader(HttpHeaders.AUTHORIZATION)).thenReturn(null);

    filter.doFilterInternal(request, response, chain);

    verify(chain).doFilter(request, response);
    assertThat(SecurityContextHolder.getContext().getAuthentication()).isNull();
  }

  @Test
  @DisplayName("Should set SecurityContext when Firebase token is valid")
  void shouldSetAuthenticationOnValidToken()
      throws ServletException, IOException, FirebaseAuthException {
    String token = "valid-firebase-token";
    String uid = "firebase-user-id-123";
    when(request.getMethod()).thenReturn("GET");
    when(request.getHeader(HttpHeaders.AUTHORIZATION)).thenReturn("Bearer " + token);

    firebaseAuthStatic.when(FirebaseAuth::getInstance).thenReturn(firebaseAuth);
    when(firebaseAuth.verifyIdToken(token)).thenReturn(firebaseToken);
    when(firebaseToken.getUid()).thenReturn(uid);

    filter.doFilterInternal(request, response, chain);

    var auth = SecurityContextHolder.getContext().getAuthentication();
    assertThat(auth).isNotNull();
    assertThat(auth.getPrincipal()).isEqualTo(uid);
    verify(chain).doFilter(request, response);
  }

  @Test
  @DisplayName("Should clear context and proceed if token verification fails")
  void shouldClearContextOnVerificationFailure()
      throws ServletException, IOException, FirebaseAuthException {
    String token = "expired-token";
    when(request.getMethod()).thenReturn("GET");
    when(request.getHeader(HttpHeaders.AUTHORIZATION)).thenReturn("Bearer " + token);

    firebaseAuthStatic.when(FirebaseAuth::getInstance).thenReturn(firebaseAuth);
    when(firebaseAuth.verifyIdToken(token)).thenThrow(mock(FirebaseAuthException.class));

    filter.doFilterInternal(request, response, chain);

    assertThat(SecurityContextHolder.getContext().getAuthentication()).isNull();
    verify(chain).doFilter(request, response);
  }
}
