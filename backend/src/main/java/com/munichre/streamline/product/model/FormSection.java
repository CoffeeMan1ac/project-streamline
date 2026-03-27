package com.munichre.streamline.product.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OrderColumn;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "form_sections")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FormSection {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "form_id", nullable = false)
  private Form form;

  @Column(nullable = false)
  private String name;

  @Column(nullable = false)
  private String label;

  @Column(nullable = false)
  private Integer displayOrder = 0;

  @ManyToMany
  @JoinTable(
      name = "form_section_fields",
      joinColumns = @JoinColumn(name = "section_id"),
      inverseJoinColumns = @JoinColumn(name = "field_id"))
  @OrderColumn(name = "display_order")
  private List<Field> fields;

  @CreationTimestamp private LocalDateTime createdAt;

  @UpdateTimestamp private LocalDateTime updatedAt;
}
