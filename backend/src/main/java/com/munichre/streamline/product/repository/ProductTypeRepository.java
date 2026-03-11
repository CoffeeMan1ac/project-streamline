package com.munichre.streamline.product.repository;

import com.munichre.streamline.product.model.ProductType;
import java.util.UUID;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;

public interface ProductTypeRepository extends Repository<ProductType, UUID> {
  @Query(
      """
    SELECT pt
    FROM ProductType pt
    WHERE pt.id = :typeId
  """)
  ProductType findProductTypeById(@Param("typeId") UUID typeId);
}
