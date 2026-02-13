package com.munichre.streamline.repository;

import com.munichre.streamline.dto.ProductCoverageRowDto;
import com.munichre.streamline.dto.ProductRowDto;
import com.munichre.streamline.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface ProductRepository extends JpaRepository<Product, UUID> {

  @Query("""
  SELECT new com.munichre.streamline.dto.ProductRowDto(
    p.id, p.baseRate, p.name, p.description, p.mostPopular,
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

  @Query("""
  SELECT new com.munichre.streamline.dto.ProductCoverageRowDto(
    p.id,
    c.id, c.code, c.label,
    cat.id, cat.code, cat.label
  )
  FROM Product p
  JOIN p.coverages c
  JOIN c.category cat
  WHERE p.id in :productIds
  """)
  List<ProductCoverageRowDto> findCoverageRows(@Param("productIds") List<UUID> productIds);

  @Query("""
  SELECT new com.munichre.streamline.dto.ProductCoverageRowDto(
    p.id,
    c.id, c.code, c.label,
    cat.id, cat.code, cat.label
  )
  FROM Product p
  JOIN p.exclusions c
  JOIN c.category cat
  WHERE p.id in :productIds
  """)
  List<ProductCoverageRowDto> findExclusionRows(@Param("productIds") List<UUID> productIds);
}
