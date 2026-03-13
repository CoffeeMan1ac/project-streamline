package com.munichre.streamline.config;

import static com.munichre.streamline.constant.ApiRoutes.BACKOFFICE_API_ROOT;
import static com.munichre.streamline.constant.ApiRoutes.CUSTOMER_API_ROOT;

import com.munichre.streamline.security.filter.FirebaseTokenFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

  private final FirebaseTokenFilter firebaseTokenFilter;

  @Bean
  public SecurityFilterChain securityFilterChain(final HttpSecurity http) throws Exception {
    return http.csrf(csrf -> csrf.disable())
        .sessionManagement(
            session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authorizeHttpRequests(
            auth ->
                auth.requestMatchers(CUSTOMER_API_ROOT)
                    .permitAll()
                    .requestMatchers(BACKOFFICE_API_ROOT)
                    .authenticated()
                    .anyRequest()
                    .authenticated())
        .addFilterBefore(firebaseTokenFilter, UsernamePasswordAuthenticationFilter.class)
        .build();
  }
}
