package com.munichre.streamline.config;

import static com.munichre.streamline.constant.ApiRoutes.PING;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

// keeps the Render instance awake without touching the database (see keep-warm.yml)
@RestController
public class PingController {

  @GetMapping(PING)
  public ResponseEntity<String> ping() {
    return ResponseEntity.ok("pong");
  }
}
