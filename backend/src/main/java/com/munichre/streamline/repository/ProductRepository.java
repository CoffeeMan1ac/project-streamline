package com.munichre.streamline.repository;

import com.munichre.streamline.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface ProductRepository extends JpaRepository<Product, UUID> {

    /**
     * @param now The time that we want to check that products are within.
     */
    @Query("""
    SELECT p FROM Product p
    join fetch p.type
    WHERE p.active = true
      AND p.startDate <= :now
      AND (p.endDate IS NULL OR p.endDate >= :now)
    ORDER BY p.baseRate ASC
    """)
    public List<Product> findActiveProducts(@Param("now") LocalDateTime now);
}