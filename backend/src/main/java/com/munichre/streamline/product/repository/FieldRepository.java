package com.munichre.streamline.product.repository;

import com.munichre.streamline.product.model.Field;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FieldRepository extends JpaRepository<Field, UUID> {
  boolean existsByCode(String code);
}
