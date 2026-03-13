package com.munichre.streamline.config;

import static com.munichre.streamline.constant.ApiRoutes.BACKOFFICE_API_ROOT;
import static com.munichre.streamline.constant.ApiRoutes.CUSTOMER_API_ROOT;
import static com.munichre.streamline.constant.ApiRoutes.SWAGGER_API_ROOT;

import com.munichre.streamline.security.exception.UnauthenticatedException;
import com.munichre.streamline.security.filter.FirebaseTokenFilter;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

  private final FirebaseTokenFilter firebaseTokenFilter;
  private final HandlerExceptionResolver resolver;

  public SecurityConfig(
      FirebaseTokenFilter firebaseTokenFilter,
      @Qualifier("handlerExceptionResolver") HandlerExceptionResolver resolver) {
    this.firebaseTokenFilter = firebaseTokenFilter;
    this.resolver = resolver;
  }

  @Bean
  public SecurityFilterChain securityFilterChain(final HttpSecurity http) throws Exception {
    return http.csrf(csrf -> csrf.disable())
        .sessionManagement(
            session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .exceptionHandling(
            eh ->
                eh.authenticationEntryPoint(
                    (request, response, authException) -> {
                      resolver.resolveException(
                          request, response, null, new UnauthenticatedException());
                    }))
        .authorizeHttpRequests(
            auth ->
                auth.requestMatchers(HttpMethod.OPTIONS, "/**")
                    .permitAll()
                    .requestMatchers(CUSTOMER_API_ROOT)
                    .permitAll()
                    .requestMatchers(BACKOFFICE_API_ROOT)
                    .authenticated()
                    .requestMatchers(SWAGGER_API_ROOT)
                    .permitAll()
                    .anyRequest()
                    .authenticated())
        .addFilterBefore(firebaseTokenFilter, UsernamePasswordAuthenticationFilter.class)
        .build();
  }
}
