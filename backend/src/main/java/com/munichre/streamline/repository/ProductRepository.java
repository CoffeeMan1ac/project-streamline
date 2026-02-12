package com.munichre.streamline.repository;

import com.munichre.streamline.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface ProductRepository extends JpaRepository<Product, UUID> {
    @Query("""
    SELECT p FROM Product p
    WHERE p.active = true
      AND p.startDate <= :now
      AND (p.endDate IS NULL OR p.endDate >= :now)
    """)
    List<Product> findActiveProducts(@Param("now") LocalDateTime now);
}