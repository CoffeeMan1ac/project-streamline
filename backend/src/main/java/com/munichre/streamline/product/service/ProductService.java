package com.munichre.streamline.product.service;

import static java.util.stream.Collectors.groupingBy;

import com.munichre.streamline.product.api.dto.CoverageCategoryDto;
import com.munichre.streamline.product.api.dto.CoverageDto;
import com.munichre.streamline.product.api.dto.ProductDto;
import com.munichre.streamline.product.api.dto.ProductOptionDto;
import com.munichre.streamline.product.api.dto.ProductTagDto;
import com.munichre.streamline.product.api.dto.ProductTypeDto;
import com.munichre.streamline.product.exception.ProductNotFoundException;
import com.munichre.streamline.product.model.Product;
import com.munichre.streamline.product.repository.ProductCoverageRepository;
import com.munichre.streamline.product.repository.ProductRepository;
import com.munichre.streamline.product.repository.ProductTagRepository;
import com.munichre.streamline.product.repository.dto.ProductCoverageRowDto;
import com.munichre.streamline.product.repository.dto.ProductRowDto;
import com.munichre.streamline.product.repository.dto.ProductTagRowDto;
import java.time.Clock;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ProductService {
  private final ProductRepository productRepository;
  private final ProductCoverageRepository productCoverageRepository;
  private final ProductTagRepository productTagRepository;
  private final Clock clock;

  public List<ProductOptionDto> getActiveProductOptions() {
    LocalDateTime now = LocalDateTime.now(clock);
    return productRepository.findActiveProductOptions(now);
  }

  public List<ProductOptionDto> getAllProductOptions() {
    return productRepository.findProductOptions();
  }

  @Transactional(readOnly = true)
  public Product getProduct(@NonNull UUID id) {
    return productRepository.findById(id).orElseThrow(() -> new ProductNotFoundException(id));
  }

  /**
   * Assembles products them with their respective coverages and exclusions using a high-performance
   * batching strategy.
   */
  public List<ProductDto> assembleProducts(List<ProductRowDto> productRows) {
    if (productRows.isEmpty()) {
      return List.of();
    }

    List<UUID> productIds = productRows.stream().map(ProductRowDto::id).toList();

    Map<UUID, List<ProductCoverageRowDto>> coveragesByProduct =
        productCoverageRepository.findCoverageRows(productIds).stream()
            .collect(groupingBy(ProductCoverageRowDto::productId));

    Map<UUID, List<ProductCoverageRowDto>> exclusionsByProduct =
        productCoverageRepository.findExclusionRows(productIds).stream()
            .collect(groupingBy(ProductCoverageRowDto::productId));

    Map<UUID, List<ProductTagRowDto>> tagsByProduct =
        productTagRepository.findTagRowsByProductIds(productIds).stream()
            .collect(groupingBy(ProductTagRowDto::productId));

    return productRows.stream()
        .map(
            row ->
                ProductAssembler.toDto(
                    row,
                    coveragesByProduct.getOrDefault(row.id(), List.of()),
                    exclusionsByProduct.getOrDefault(row.id(), List.of()),
                    tagsByProduct.getOrDefault(row.id(), List.of())))
        .toList();
  }

  /** Fetches active products and returns them assembled with coverages, exclusions, tags */
  public List<ProductDto> getActiveProducts() {
    LocalDateTime now = LocalDateTime.now();

    List<ProductRowDto> productRows = productRepository.findActiveProductRows(now);
    return assembleProducts(productRows);
  }

  /** Fetches inactive products and returns them assembled with coverages, exclusions, tags */
  public List<ProductDto> getInactiveProducts() {
    LocalDateTime now = LocalDateTime.now();

    List<ProductRowDto> productRows = productRepository.findInactiveProductRows(now);
    return assembleProducts(productRows);
  }

  /** Fetches all products and returns them assembled with coverages, exclusions, tags */
  public List<ProductDto> getAllProducts() {
    List<ProductRowDto> productRows = productRepository.findProductRows();
    return assembleProducts(productRows);
  }

  /**
   * Fetches all products and returns them assembled with coverages, exclusions, tags
   *
   * @param active true returns just active products, false returns just inactive products. null
   *     returns all products.
   */
  public List<ProductDto> getProducts(Boolean active) {
    if (active == null) return getAllProducts();
    else if (active.booleanValue() == true) return getActiveProducts();
    else return getInactiveProducts();
  }

  private static class ProductAssembler {

    static ProductDto toDto(
        ProductRowDto row,
        List<ProductCoverageRowDto> coverageRows,
        List<ProductCoverageRowDto> exclusionRows,
        List<ProductTagRowDto> tags) {
      return new ProductDto(
          row.id(),
          row.baseRate(),
          row.name(),
          row.description(),
          mapTags(tags),
          new ProductTypeDto(row.typeId(), row.typeCode(), row.typeLabel()),
          mapCoverages(coverageRows),
          mapCoverages(exclusionRows));
    }

    private static List<CoverageDto> mapCoverages(List<ProductCoverageRowDto> rows) {
      return rows.stream().map(ProductAssembler::toCoverageDto).distinct().toList();
    }

    private static CoverageDto toCoverageDto(ProductCoverageRowDto r) {
      return new CoverageDto(
          r.coverageId(),
          r.coverageCode(),
          r.coverageLabel(),
          new CoverageCategoryDto(r.categoryId(), r.categoryCode(), r.categoryLabel()));
    }

    private static List<ProductTagDto> mapTags(List<ProductTagRowDto> rows) {
      return rows.stream().map(ProductAssembler::toProductTagDto).distinct().toList();
    }

    private static ProductTagDto toProductTagDto(ProductTagRowDto row) {
      return new ProductTagDto(row.id(), row.code(), row.label());
    }
  }
}
