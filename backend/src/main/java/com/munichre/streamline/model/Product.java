package com.munichre.streamline.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @Column(nullable = false)
  private BigDecimal baseRate;

  @Column(nullable = false, unique = true)
  private String name;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "product_type_id", nullable = false)
  private ProductType type;

  @Column private String description;

  @ManyToMany
  @JoinTable(
      name = "product_product_tags",
      joinColumns = @JoinColumn(name = "product_id"),
      inverseJoinColumns = @JoinColumn(name = "product_tag_id"))
  private List<ProductTag> tags;

  @ManyToMany
  @JoinTable(
      name = "product_coverages",
      joinColumns = @JoinColumn(name = "product_id"),
      inverseJoinColumns = @JoinColumn(name = "coverage_id"))
  private List<Coverage> coverages;

  @ManyToMany
  @JoinTable(
      name = "product_exclusions",
      joinColumns = @JoinColumn(name = "product_id"),
      inverseJoinColumns = @JoinColumn(name = "coverage_id"))
  private List<Coverage> exclusions;

  /** When the product was launched, or when it should be launched. */
  @Column(nullable = false)
  private LocalDateTime startDate;

  /** When the product should stop being offered. Can be null. */
  @Column() private LocalDateTime endDate;

  /**
   * Whether or not the product is active, even if it's within <code>startDate</code> and <code>
   * endDate</code>.
   */
  @Column(nullable = false)
  private Boolean active = true;

  @CreationTimestamp private LocalDateTime createdAt;

  @UpdateTimestamp private LocalDateTime updatedAt;
}
