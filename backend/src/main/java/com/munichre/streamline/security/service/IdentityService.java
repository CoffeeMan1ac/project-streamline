package com.munichre.streamline.security.service;

import com.munichre.streamline.security.exception.UnauthenticatedException;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class IdentityService {

  public String getUserId() {
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();

    if (isUnauthenticated(auth)) {
      throw new UnauthenticatedException("Action requires an authenticated user.");
    }

    return (String) auth.getPrincipal();
  }

  private boolean isUnauthenticated(Authentication auth) {
    return auth == null || !auth.isAuthenticated() || auth instanceof AnonymousAuthenticationToken;
  }
}
