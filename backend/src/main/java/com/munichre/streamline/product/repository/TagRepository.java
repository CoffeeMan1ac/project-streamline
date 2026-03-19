package com.munichre.streamline.product.repository;

import com.munichre.streamline.product.model.ProductTag;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<ProductTag, UUID> {
  boolean existsByCode(String code);
}
