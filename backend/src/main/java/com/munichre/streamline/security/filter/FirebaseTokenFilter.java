package com.munichre.streamline.security.filter;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class FirebaseTokenFilter extends OncePerRequestFilter {

  private static final String BEARER_PREFIX = "Bearer ";

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
            new UsernamePasswordAuthenticationToken(
                decodedToken.getUid(), null, Collections.emptyList());

        SecurityContextHolder.getContext().setAuthentication(authenication);
      } catch (FirebaseAuthException e) {
        SecurityContextHolder.clearContext();
      }
    }
    chain.doFilter(request, response);
  }
}
