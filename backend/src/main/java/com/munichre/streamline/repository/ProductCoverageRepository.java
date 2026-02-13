package com.munichre.streamline.repository;

import com.munichre.streamline.dto.ProductCoverageRowDto;
import com.munichre.streamline.model.Product;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

public interface ProductCoverageRepository extends Repository<Product, UUID> {

  @Query("""
    SELECT new com.munichre.streamline.dto.ProductCoverageRowDto(
      p.id,
      c.id, c.code, c.label,
      cat.id, cat.code, cat.label
    )
    FROM Product p
    JOIN p.coverages c
    JOIN c.category cat
    where p.id in :productIds
  """)
  List<ProductCoverageRowDto> findCoverageRows(@Param("productIds") Collection<UUID> productIds);

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
  List<ProductCoverageRowDto> findExclusionRows(@Param("productIds") Collection<UUID> productIds);
}
