package com.munichre.streamline.rule.model;

import com.munichre.streamline.product.model.Product;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.type.SqlTypes;

@Entity
@Table(name = "rules")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Rule {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "product_id", nullable = false)
  private Product product;

  @Column(nullable = false)
  private String name;

  private String description;

  @Column(nullable = true)
  private String reason;

  @Column(nullable = false)
  private Integer priority;

  @Column(nullable = false)
  private Boolean active = true;

  @JdbcTypeCode(SqlTypes.JSON)
  @Column(name = "rule_config", columnDefinition = "jsonb", nullable = false)
  private RuleConfig ruleConfig;

  @CreationTimestamp private LocalDateTime createdAt;

  @UpdateTimestamp private LocalDateTime updatedAt;
}
