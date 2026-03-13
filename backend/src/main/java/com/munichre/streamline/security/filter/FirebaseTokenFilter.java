package com.munichre.streamline.security.filter;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.munichre.streamline.security.exception.UnauthenticatedException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class FirebaseTokenFilter extends OncePerRequestFilter {

  private static final String BEARER_PREFIX = "Bearer ";
  private static final String INVAILD_TOKEN_MESSAGE = "Invalid Firebase Token";

  @Override
  protected void doFilterInternal(
      HttpServletRequest request, HttpServletResponse response, FilterChain chain)
      throws ServletException, IOException {
    final String header = request.getHeader(HttpHeaders.AUTHORIZATION);

    if (header != null && header.startsWith(BEARER_PREFIX)) {
      final String idToken = header.substring(BEARER_PREFIX.length());
      try {
        final FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);

        final UsernamePasswordAuthenticationToken authenication =
            new UsernamePasswordAuthenticationToken(decodedToken.getUid(), null);

        SecurityContextHolder.getContext().setAuthentication(authenication);
      } catch (FirebaseAuthException e) {
        SecurityContextHolder.clearContext();
        throw new UnauthenticatedException(INVAILD_TOKEN_MESSAGE);
      }
    }
    chain.doFilter(request, response);
  }
}
