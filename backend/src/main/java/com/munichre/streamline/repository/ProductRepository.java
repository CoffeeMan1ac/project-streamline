package com.munichre.streamline.repository;

import com.munichre.streamline.dto.ProductRowDto;
import com.munichre.streamline.model.Product;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductRepository extends JpaRepository<Product, UUID> {

  @Query(
      """
  SELECT new com.munichre.streamline.dto.ProductRowDto(
    p.id, p.baseRate, p.name, p.description,
    p.startDate, p.endDate, p.active,
    t.id, t.code, t.label
  )
  FROM Product p
  JOIN p.type t
  WHERE p.active = true
    AND p.startDate <= :now
    AND (p.endDate is null or p.endDate >= :now)
  ORDER BY p.baseRate asc
  """)
  List<ProductRowDto> findActiveProductRows(@Param("now") LocalDateTime now);
}
