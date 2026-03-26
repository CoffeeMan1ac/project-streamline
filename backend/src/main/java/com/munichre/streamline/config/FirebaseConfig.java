package com.munichre.streamline.config;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

import jakarta.annotation.PostConstruct;

@Configuration
@Profile("!test")
public class FirebaseConfig {

  @Value("${google.application.credentials:}")
  private String credentialsPath;

  @Value("${firebase.project-id}")
  private String projectId;

  @PostConstruct
  public void initialize() throws IOException {
    if (!FirebaseApp.getApps().isEmpty()) {
      return;
    }

    GoogleCredentials credentials;

    try {
      credentials = GoogleCredentials.getApplicationDefault();
    } catch (IOException adcException) {
      if (credentialsPath != null && !credentialsPath.isBlank()) {
        try (InputStream is = new FileInputStream(credentialsPath)) {
          credentials = GoogleCredentials.fromStream(is);
        }
      } else {
        throw new RuntimeException("Failed to load Google credentials", adcException);
      }
    }

    FirebaseOptions options =
        FirebaseOptions.builder().setCredentials(credentials).setProjectId(projectId).build();

    FirebaseApp.initializeApp(options);
  }
}
