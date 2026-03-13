package com.munichre.streamline.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import jakarta.annotation.PostConstruct;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FirebaseConfig {

  @Value("${google.application.credentials:#{null}}")
  private String credentialsPath;

  @PostConstruct
  public void initialize() throws IOException {
    if (!FirebaseApp.getApps().isEmpty()) {
      return;
    }

    GoogleCredentials credentials;

    if (credentialsPath != null && !credentialsPath.isEmpty()) {
      try (InputStream is = new FileInputStream(credentialsPath)) {
        credentials = GoogleCredentials.fromStream(is);
      }
    } else {
      credentials = GoogleCredentials.getApplicationDefault();
    }

    FirebaseOptions options = FirebaseOptions.builder()
        .setCredentials(credentials)
        .build();

    FirebaseApp.initializeApp(options);
  }
}