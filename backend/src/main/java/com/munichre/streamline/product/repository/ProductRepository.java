package com.munichre.streamline.product.repository;

import com.munichre.streamline.product.api.dto.ProductOptionDto;
import com.munichre.streamline.product.model.Product;
import com.munichre.streamline.product.repository.dto.ProductRowDto;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductRepository extends JpaRepository<Product, UUID> {

  @Query(
      """
              SELECT new com.munichre.streamline.product.repository.dto.ProductRowDto(
                p.id,
                p.baseRate,
                p.name,
                p.description,
                p.startDate,
                p.endDate,
                p.active,
                t.id,
                t.code,
                t.label
              )
              FROM Product p
              JOIN p.type t
              WHERE p.active = true
                AND p.startDate <= :now
                AND (p.endDate is null or p.endDate >= :now)
              ORDER BY p.baseRate asc
            """)
  List<ProductRowDto> findActiveProductRows(@Param("now") LocalDateTime now);

  @Query(
      """
              SELECT new com.munichre.streamline.product.repository.dto.ProductRowDto(
                p.id,
                p.baseRate,
                p.name,
                p.description,
                p.startDate,
                p.endDate,
                p.active,
                t.id,
                t.code,
                t.label
              )
              FROM Product p
              JOIN p.type t
              WHERE NOT (p.active = true
                AND p.startDate <= :now
                AND (p.endDate is null or p.endDate >= :now))
              ORDER BY p.baseRate asc
            """)
  List<ProductRowDto> findInactiveProductRows(@Param("now") LocalDateTime now);

  @Query(
      """
              SELECT new com.munichre.streamline.product.repository.dto.ProductRowDto(
                p.id,
                p.baseRate,
                p.name,
                p.description,
                p.startDate,
                p.endDate,
                p.active,
                t.id,
                t.code,
                t.label
              )
              FROM Product p
              JOIN p.type t
              ORDER BY p.baseRate asc
            """)
  List<ProductRowDto> findProductRows();

  @Query(
      """
              SELECT new com.munichre.streamline.product.api.dto.ProductOptionDto(
                p.id,
                p.name
              )
              FROM Product p
              WHERE p.active = TRUE
                AND p.startDate <= :now
                AND (p.endDate IS NULL OR p.endDate >= :now)
              ORDER BY p.baseRate ASC
            """)
  List<ProductOptionDto> findActiveProductOptions(@Param("now") LocalDateTime now);

  @Query(
      """
              SELECT new com.munichre.streamline.product.api.dto.ProductOptionDto(
                p.id,
                p.name
              )
              FROM Product p
              ORDER BY p.baseRate ASC
            """)
  List<ProductOptionDto> findProductOptions();

  @Query(
      """
    SELECT new com.munichre.streamline.product.repository.dto.ProductRowDto(
      p.id, p.baseRate, p.name, p.description,
      p.startDate, p.endDate, p.active,
      t.id, t.code, t.label
    )
    FROM Product p
    JOIN p.type t
    WHERE p.id = :id
    """)
  List<ProductRowDto> findProductRowById(@Param("id") UUID id);
}
