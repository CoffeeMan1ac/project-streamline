package com.munichre.streamline.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

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

    @Column(nullable = false)
    private Integer priority;

    @Column(nullable = false)
    private Boolean active = true;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String conditionField;

    @Column(nullable = false)
    private String conditionOperator;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String conditionValue;

    @Column(nullable = false)
    private String actionType;

    @Column(nullable = false)
    private String actionReason;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
