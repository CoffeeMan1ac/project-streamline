package com.munichre.streamline.product.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.type.SqlTypes;

@Entity
@Table(name = "fields")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Field {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @Column(nullable = false, unique = true)
  private String code;

  @Column(nullable = false)
  private String type;

  @Column(nullable = false)
  private String label;

  @Column(nullable = false)
  private Boolean required = false;

  @Column private String regexPattern;

  @JdbcTypeCode(SqlTypes.JSON)
  @Column(columnDefinition = "jsonb")
  private List<String> options;

  @CreationTimestamp private LocalDateTime createdAt;

  @UpdateTimestamp private LocalDateTime updatedAt;
}
