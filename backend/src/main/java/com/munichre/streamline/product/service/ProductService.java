package com.munichre.streamline.product.service;

import static java.util.stream.Collectors.groupingBy;
import static java.util.stream.Collectors.toMap;

import com.munichre.streamline.product.api.dto.CoverageCategoryDto;
import com.munichre.streamline.product.api.dto.CoverageDto;
import com.munichre.streamline.product.api.dto.CreateProductRequestDto;
import com.munichre.streamline.product.api.dto.ProductDto;
import com.munichre.streamline.product.api.dto.ProductFieldDto;
import com.munichre.streamline.product.api.dto.ProductOptionDto;
import com.munichre.streamline.product.api.dto.ProductTagDto;
import com.munichre.streamline.product.api.dto.ProductTypeDto;
import com.munichre.streamline.product.exception.CoverageNotFoundException;
import com.munichre.streamline.product.exception.ProductNotFoundException;
import com.munichre.streamline.product.exception.ProductTagNotFoundException;
import com.munichre.streamline.product.exception.ProductTypeNotFoundException;
import com.munichre.streamline.product.model.Coverage;
import com.munichre.streamline.product.model.Product;
import com.munichre.streamline.product.model.ProductField;
import com.munichre.streamline.product.model.ProductTag;
import com.munichre.streamline.product.model.ProductType;
import com.munichre.streamline.product.repository.ProductCoverageRepository;
import com.munichre.streamline.product.repository.ProductRepository;
import com.munichre.streamline.product.repository.ProductTagRepository;
import com.munichre.streamline.product.repository.ProductTypeRepository;
import com.munichre.streamline.product.repository.dto.ProductCoverageRowDto;
import com.munichre.streamline.product.repository.dto.ProductRowDto;
import com.munichre.streamline.product.repository.dto.ProductTagRowDto;
import java.time.Clock;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
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
  private final ProductTypeRepository productTypeRepository;
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

    Map<UUID, List<ProductField>> fieldsByProduct =
        productRepository.findAllById(productIds).stream()
            .collect(
                toMap(
                    Product::getId,
                    p -> p.getProductFields() != null ? p.getProductFields() : List.of()));

    return productRows.stream()
        .map(
            row ->
                ProductAssembler.toDto(
                    row,
                    coveragesByProduct.getOrDefault(row.id(), List.of()),
                    exclusionsByProduct.getOrDefault(row.id(), List.of()),
                    tagsByProduct.getOrDefault(row.id(), List.of()),
                    fieldsByProduct.getOrDefault(row.id(), List.of())))
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

  public void createProduct(CreateProductRequestDto productRequest) {
    Product product = new Product();
    product.setName(productRequest.getName());
    product.setDescription(productRequest.getDescription());
    product.setBaseRate(productRequest.getBaseRate());
    product.setStartDate(productRequest.getStartDate());
    product.setEndDate(productRequest.getEndDate());

    // Type
    UUID typeId = productRequest.getType();
    ProductType productType = getProductType(typeId);
    if (productType == null) throw new ProductTypeNotFoundException();
    product.setType(productType);

    // Tags
    Set<UUID> tagIds = new HashSet<>(productRequest.getTags());
    Set<ProductTag> tags = productTagRepository.findTagModelsByIds(tagIds);
    if (tagIds.size() != tags.size()) throw new ProductTagNotFoundException();
    product.setTags(tags);

    // Coverages
    Set<UUID> coverageIds = new HashSet<>(productRequest.getCoverages());
    Set<Coverage> coverages = productCoverageRepository.findCoverageModels(coverageIds);
    if (coverageIds.size() != coverages.size()) throw new CoverageNotFoundException();
    product.setCoverages(coverages);

    // Exclusions
    Set<UUID> exclusionsIds = new HashSet<>(productRequest.getExclusions());
    Set<Coverage> exclusions = productCoverageRepository.findExclusionModels(exclusionsIds);
    if (exclusionsIds.size() != exclusions.size()) throw new CoverageNotFoundException();
    product.setExclusions(exclusions);

    productRepository.saveAndFlush(product);
  }

  @Transactional
  public void toggleProductActive(UUID id) {
    Product product =
        productRepository.findById(id).orElseThrow(() -> new ProductNotFoundException(id));
    product.setActive(!product.getActive());
    productRepository.save(product);
  }

  public ProductType getProductType(UUID productTypeId) {
    return productTypeRepository.findProductTypeById(productTypeId);
  }

  private static class ProductAssembler {

    static ProductDto toDto(
        ProductRowDto row,
        List<ProductCoverageRowDto> coverageRows,
        List<ProductCoverageRowDto> exclusionRows,
        List<ProductTagRowDto> tags,
        List<ProductField> productFields) {
      return new ProductDto(
          row.id(),
          row.baseRate(),
          row.name(),
          row.description(),
          row.active(),
          mapTags(tags),
          new ProductTypeDto(row.typeId(), row.typeCode(), row.typeLabel()),
          mapCoverages(coverageRows),
          mapCoverages(exclusionRows),
          mapProductFields(productFields));
    }

    private static List<ProductFieldDto> mapProductFields(List<ProductField> fields) {
      return fields.stream()
          .map(
              f ->
                  new ProductFieldDto(
                      f.getName(), f.getType(), f.getLabel(), f.getRequired(), f.getOptions()))
          .toList();
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
