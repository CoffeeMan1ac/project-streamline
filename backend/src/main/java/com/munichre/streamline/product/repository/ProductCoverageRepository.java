package com.munichre.streamline.product.repository;

import com.munichre.streamline.product.model.Product;
import com.munichre.streamline.product.repository.dto.ProductCoverageRowDto;
import java.util.Collection;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;

public interface ProductCoverageRepository extends Repository<Product, UUID> {

  @Query(
      """
    SELECT new com.munichre.streamline.product.repository.dto.ProductCoverageRowDto(
      p.id,
      c.id, c.code, c.label,
      cat.id, cat.code, cat.label
    )
    FROM Product p
    JOIN p.coverages c
    JOIN c.category cat
    WHERE p.id in :productIds
  """)
  List<ProductCoverageRowDto> findCoverageRows(@Param("productIds") Collection<UUID> productIds);

  @Query(
      """
    SELECT new com.munichre.streamline.product.repository.dto.ProductCoverageRowDto(
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
