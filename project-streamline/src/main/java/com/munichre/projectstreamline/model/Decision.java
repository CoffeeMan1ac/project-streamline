package com.munichre.projectstreamline.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "decisions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Decision {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String requestData;

    @Column(nullable = false)
    private String status;

    private BigDecimal premium;

    private String reason;

    @Column(columnDefinition = "TEXT")
    private String rulesApplied;

    private Long processingTimeMs;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
