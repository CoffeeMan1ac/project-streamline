package com.munichre.streamline.product.repository;

import com.munichre.streamline.product.model.Product;
import com.munichre.streamline.product.model.ProductTag;
import com.munichre.streamline.product.repository.dto.ProductTagRowDto;
import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;

public interface ProductTagRepository extends Repository<Product, UUID> {

  @Query(
      """
    SELECT new com.munichre.streamline.product.repository.dto.ProductTagRowDto(
    p.id,
      t.id, t.code, t.label
    )
    FROM Product p
    JOIN p.tags t
    WHERE p.id in :productIds
  """)
  List<ProductTagRowDto> findTagRowsByProductIds(@Param("productIds") Collection<UUID> productIds);

  @Query(
      """
    SELECT pt
    FROM ProductTag pt
    WHERE pt.id
    IN :tagIds
  """)
  Set<ProductTag> findTagModelsByIds(@Param("tagIds") Collection<UUID> tagIds);

  @Query("SELECT pt FROM ProductTag pt ORDER BY pt.label ASC")
  List<ProductTag> findAllTags();
}
