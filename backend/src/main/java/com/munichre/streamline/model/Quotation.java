package com.munichre.streamline.model;

import com.munichre.streamline.dto.DecisionStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

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

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DecisionStatus status;

    @Column
    private String reason;

    @ElementCollection
    @CollectionTable(
            name = "quotation_rules_applied",
            joinColumns = @JoinColumn(name = "quotation_id")
    )
    @Column(name = "rule_name")
    private List<String> rulesApplied;

    @Column
    private BigDecimal premium;

    @Column(nullable = false)
    private long processingTimeMs;
}
