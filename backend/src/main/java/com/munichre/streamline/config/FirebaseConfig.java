package com.munichre.streamline.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import jakarta.annotation.PostConstruct;
import java.io.IOException;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FirebaseConfig {

  @PostConstruct
  public void initialize() throws IOException {
    FirebaseOptions options =
        FirebaseOptions.builder().setCredentials(GoogleCredentials.getApplicationDefault()).build();

    FirebaseApp.initializeApp(options);
  }
}