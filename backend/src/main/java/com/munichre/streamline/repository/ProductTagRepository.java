package com.munichre.streamline.repository;

import com.munichre.streamline.dto.ProductTagRowDto;
import com.munichre.streamline.model.Product;
import java.util.Collection;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;

public interface ProductTagRepository extends Repository<Product, UUID> {

  @Query(
      """
    SELECT new com.munichre.streamline.dto.ProductTagRowDto(
      p.id,
      t.id, t.code, t.label
    )
    FROM Product p
    JOIN p.tags t
    where p.id in :productIds
  """)
  List<ProductTagRowDto> findTagRows(@Param("productIds") Collection<UUID> productIds);
}
