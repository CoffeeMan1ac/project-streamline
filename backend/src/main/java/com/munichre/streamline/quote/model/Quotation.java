package com.munichre.streamline.quote.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import lombok.*;

@Entity
@Table(name = "quotations")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Quotation {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @Column(name = "reference", unique = true, nullable = false, length = 6)
  private String reference;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private QuotationStatus status;

  @Column private String reason;

  @ElementCollection
  @CollectionTable(
      name = "quotation_rules_applied",
      joinColumns = @JoinColumn(name = "quotation_id"))
  @Column(name = "rule_name")
  private List<String> rulesApplied;

  @Column(columnDefinition = "jsonb")
  @JdbcTypeCode(SqlTypes.JSON)
  private ApplicantData customerInput;

  @Column private BigDecimal premium;

  @Column(nullable = false)
  private long processingTimeMs;

  @CreationTimestamp private LocalDateTime createdAt;
}
