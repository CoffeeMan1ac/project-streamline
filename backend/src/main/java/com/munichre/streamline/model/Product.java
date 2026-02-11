package com.munichre.streamline.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private List<Rule> rules;

    @Column(nullable = false)
    private String name;

    @Column
    private String description;
    
    @Column(nullable = false)
    private Boolean mostPopular;

    @Column(nullable = false)
    private Boolean active;

    @Column(nullable = false)
    private List<String> coverage;

    @Column(nullable = false)
    private List<String> exclusions;

    @Column(nullable = false)
    private BigDecimal baseRate;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

}
