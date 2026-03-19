package com.munichre.streamline.product.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;

import com.munichre.streamline.product.api.dto.CoverageCategoryDto;
import com.munichre.streamline.product.api.dto.CoverageDto;
import com.munichre.streamline.product.api.dto.CreateProductRequestDto;
import com.munichre.streamline.product.api.dto.ProductDto;
import com.munichre.streamline.product.api.dto.ProductOptionDto;
import com.munichre.streamline.product.api.dto.ProductTagDto;
import com.munichre.streamline.product.api.dto.ProductTypeDto;
import com.munichre.streamline.product.api.dto.UpdateProductRequestDto;
import com.munichre.streamline.product.exception.CoverageNotFoundException;
import com.munichre.streamline.product.exception.ProductNotFoundException;
import com.munichre.streamline.product.exception.ProductTagNotFoundException;
import com.munichre.streamline.product.exception.ProductTypeNotFoundException;
import com.munichre.streamline.product.model.Coverage;
import com.munichre.streamline.product.model.Product;
import com.munichre.streamline.product.model.ProductTag;
import com.munichre.streamline.product.model.ProductType;
import com.munichre.streamline.product.repository.ProductCoverageRepository;
import com.munichre.streamline.product.repository.ProductRepository;
import com.munichre.streamline.product.repository.ProductTagRepository;
import com.munichre.streamline.product.repository.ProductTypeRepository;
import com.munichre.streamline.product.repository.dto.ProductCoverageRowDto;
import com.munichre.streamline.product.repository.dto.ProductRowDto;
import com.munichre.streamline.product.repository.dto.ProductTagRowDto;
import java.math.BigDecimal;
import java.time.Clock;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.Period;
import java.time.ZoneId;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class ProductServiceTest {
  @Mock private ProductRepository productRepository;
  @Mock private ProductTagRepository productTagRepository;
  @Mock private ProductTypeRepository productTypeRepository;
  @Mock private ProductCoverageRepository productCoverageRepository;

  private Clock clock;

  @InjectMocks private ProductService productService;

  @BeforeEach
  void setUp() {
    clock = Clock.fixed(Instant.parse("2026-02-24T12:34:56Z"), ZoneId.of("Europe/Dublin"));
    productService =
        new ProductService(
            productRepository,
            productCoverageRepository,
            productTagRepository,
            productTypeRepository,
            clock);
  }

  @Nested
  @DisplayName("getActiveProductOptions()")
  public class getActiveProductOptions {

    @Test
    void returnsEmptyWhenNoProducts() {
      LocalDateTime expectedNow = LocalDateTime.now(clock);

      when(productRepository.findActiveProductOptions(expectedNow)).thenReturn(List.of());

      List<ProductOptionDto> productOptions = productService.getActiveProductOptions();

      assertThat(productOptions).isEmpty();
      verify(productRepository).findActiveProductOptions(expectedNow);
      verifyNoMoreInteractions(productRepository);
    }

    @Test
    void returnsSingleProduct() {
      LocalDateTime expectedNow = LocalDateTime.now(clock);
      List<ProductOptionDto> productOptionRows =
          List.of(new ProductOptionDto(UUID.randomUUID(), "Product 1"));

      when(productRepository.findActiveProductOptions(expectedNow)).thenReturn(productOptionRows);

      List<ProductOptionDto> productOptions = productService.getActiveProductOptions();

      List<ProductOptionDto> expectedProductOptions =
          productOptionRows.stream().map(r -> new ProductOptionDto(r.id(), r.name())).toList();

      assertThat(productOptions).hasSize(expectedProductOptions.size());
      assertThat(productOptions).containsExactlyElementsOf(expectedProductOptions);
      verify(productRepository).findActiveProductOptions(expectedNow);
      verifyNoMoreInteractions(productRepository);
    }

    @Test
    void returnsMultipleProducts() {
      LocalDateTime expectedNow = LocalDateTime.now(clock);
      List<ProductOptionDto> productOptionRows =
          List.of(
              new ProductOptionDto(UUID.randomUUID(), "Product 1"),
              new ProductOptionDto(UUID.randomUUID(), "Product 2"),
              new ProductOptionDto(UUID.randomUUID(), "Product 3"));

      when(productRepository.findActiveProductOptions(expectedNow)).thenReturn(productOptionRows);

      List<ProductOptionDto> productOptions = productService.getActiveProductOptions();

      List<ProductOptionDto> expectedProductOptions =
          productOptionRows.stream().map(r -> new ProductOptionDto(r.id(), r.name())).toList();

      assertThat(productOptions).hasSize(expectedProductOptions.size());
      assertThat(productOptions).containsExactlyElementsOf(expectedProductOptions);
      verify(productRepository).findActiveProductOptions(expectedNow);
      verifyNoMoreInteractions(productRepository);
    }
  }

  @Nested
  @DisplayName("getAllProductOptions()")
  public class getAllProductOptions {

    @Test
    void returnsEmptyWhenNoProducts() {

      when(productRepository.findProductOptions()).thenReturn(List.of());

      List<ProductOptionDto> productOptions = productService.getAllProductOptions();

      assertThat(productOptions).isEmpty();
      verify(productRepository).findProductOptions();
      verifyNoMoreInteractions(productRepository);
    }

    @Test
    void returnsSingleProduct() {
      List<ProductOptionDto> productOptionRows =
          List.of(new ProductOptionDto(UUID.randomUUID(), "Product 1"));

      when(productRepository.findProductOptions()).thenReturn(productOptionRows);

      List<ProductOptionDto> productOptions = productService.getAllProductOptions();

      List<ProductOptionDto> expectedProductOptions =
          productOptionRows.stream().map(r -> new ProductOptionDto(r.id(), r.name())).toList();

      assertThat(productOptions).hasSize(expectedProductOptions.size());
      assertThat(productOptions).containsExactlyElementsOf(expectedProductOptions);
      verify(productRepository).findProductOptions();
      verifyNoMoreInteractions(productRepository);
    }

    @Test
    void returnsMultipleProducts() {
      List<ProductOptionDto> productOptionRows =
          List.of(
              new ProductOptionDto(UUID.randomUUID(), "Product 1"),
              new ProductOptionDto(UUID.randomUUID(), "Product 2"),
              new ProductOptionDto(UUID.randomUUID(), "Product 3"));

      when(productRepository.findProductOptions()).thenReturn(productOptionRows);

      List<ProductOptionDto> productOptions = productService.getAllProductOptions();

      List<ProductOptionDto> expectedProductOptions =
          productOptionRows.stream().map(r -> new ProductOptionDto(r.id(), r.name())).toList();

      assertThat(productOptions).hasSize(expectedProductOptions.size());
      assertThat(productOptions).containsExactlyElementsOf(expectedProductOptions);
      verify(productRepository).findProductOptions();
      verifyNoMoreInteractions(productRepository);
    }
  }

  @Nested
  @DisplayName("getProduct()")
  public class GetProduct {
    @Test
    void throwsProductNotFoundExceptionWhenNotFound() {
      UUID id = Objects.requireNonNull(UUID.randomUUID());

      when(productRepository.findById(id)).thenReturn(Optional.empty());

      assertThrows(ProductNotFoundException.class, () -> productService.getProduct(id));
      verify(productRepository).findById(id);
      verifyNoMoreInteractions(productRepository);
    }

    @Test
    void throwsNullPointerExceptionOnNullId() {
      assertThrows(NullPointerException.class, () -> productService.getProduct(null));
      verifyNoInteractions(productRepository);
    }

    @Test
    void returnsProductWhenFound() {
      UUID productId = Objects.requireNonNull(UUID.randomUUID());

      Product expectedProduct = new Product();
      expectedProduct.setId(productId);
      expectedProduct.setBaseRate(new BigDecimal("9.99"));
      expectedProduct.setName("Standard Shield");
      expectedProduct.setDescription("Test product");
      expectedProduct.setActive(true);
      expectedProduct.setStartDate(LocalDateTime.now());
      expectedProduct.setEndDate(LocalDateTime.now().plus(Period.ofYears(5)));

      when(productRepository.findById(productId)).thenReturn(Optional.of(expectedProduct));

      Product product = productService.getProduct(productId);

      assertThat(product).isSameAs(expectedProduct);
      verify(productRepository).findById(productId);
      verifyNoMoreInteractions(productRepository);
    }
  }

  @Nested
  @DisplayName("getActiveProducts()")
  public class GetActiveProducts {

    private static ProductRowDto productRow(UUID id, int n) {
      return new ProductRowDto(
          id,
          BigDecimal.valueOf(n),
          "Product " + n,
          "Product Description " + n,
          LocalDateTime.now().minusDays(1),
          null,
          true,
          UUID.nameUUIDFromBytes(("type-" + n).getBytes()),
          "TYPE_CODE",
          "TYPE_LABEL");
    }

    private static ProductCoverageRowDto coverageRow(UUID productId, int n) {
      return new ProductCoverageRowDto(
          productId,
          UUID.nameUUIDFromBytes(("coverage-" + productId + "-" + n).getBytes()),
          "COVERAGE CODE " + n,
          "COVERAGE " + n,
          UUID.nameUUIDFromBytes(("category-" + n).getBytes()),
          "CATEGORY CODE " + n,
          "CATEGORY " + n);
    }

    private static ProductCoverageRowDto exclusionRow(UUID productId, int n) {
      return new ProductCoverageRowDto(
          productId,
          UUID.nameUUIDFromBytes(("exclusion-" + productId + "-" + n).getBytes()),
          "EXCLUSION CODE " + n,
          "EXCLUSION " + n,
          UUID.nameUUIDFromBytes(("category-" + n).getBytes()),
          "CATEGORY CODE " + n,
          "CATEGORY " + n);
    }

    private static ProductTagRowDto tagRow(UUID productId, int n) {
      return new ProductTagRowDto(
          productId,
          UUID.nameUUIDFromBytes(("tag-" + productId + "-" + n).getBytes()),
          "TAG CODE " + n,
          "TAG LABEL " + n);
    }

    private static ProductDto expectedProduct(
        ProductRowDto productRow,
        List<ProductTagRowDto> tagRows,
        List<ProductCoverageRowDto> coverageRows,
        List<ProductCoverageRowDto> exclusionsRows) {

      List<ProductTagDto> tags = tagRows.stream().map(r -> expectedTag(r)).distinct().toList();

      List<CoverageDto> coverages =
          coverageRows.stream().map(r -> expectedCoverage(r)).distinct().toList();
      List<CoverageDto> exclusions =
          exclusionsRows.stream().map(r -> expectedCoverage(r)).distinct().toList();

      return new ProductDto(
          productRow.id(),
          productRow.baseRate(),
          productRow.name(),
          productRow.description(),
          productRow.active(),
          productRow.startDate(),
          productRow.endDate(),
          tags,
          new ProductTypeDto(productRow.typeId(), productRow.typeCode(), productRow.typeLabel()),
          coverages,
          exclusions,
          List.of());
    }

    private static CoverageDto expectedCoverage(ProductCoverageRowDto r) {
      return new CoverageDto(
          r.coverageId(),
          r.coverageCode(),
          r.coverageLabel(),
          new CoverageCategoryDto(r.categoryId(), r.categoryCode(), r.categoryLabel()));
    }

    private static List<CoverageDto> expectedCoverages(List<ProductCoverageRowDto> coverageRows) {
      return coverageRows.stream().map(r -> expectedCoverage(r)).distinct().toList();
    }

    private static ProductTagDto expectedTag(ProductTagRowDto r) {
      return new ProductTagDto(r.id(), r.code(), r.label());
    }

    private static List<ProductTagDto> expectedTags(List<ProductTagRowDto> tagRows) {
      return tagRows.stream().map(r -> expectedTag(r)).distinct().toList();
    }

    @Test
    void returnsEmptyListWhenNoActiveProducts() {
      when(productRepository.findActiveProductRows(any())).thenReturn(List.of());

      List<ProductDto> products = productService.getActiveProducts();

      assertThat(products).isEmpty();

      verify(productRepository).findActiveProductRows(any());
      verifyNoInteractions(productCoverageRepository, productTagRepository);
    }

    @Test
    void returnsProductWhenSingleActiveProduct() {
      ProductRowDto product = productRow(UUID.randomUUID(), 1);

      List<ProductRowDto> productRows = List.of(product);
      List<ProductTagRowDto> tagRows = List.of();
      List<ProductCoverageRowDto> coverageRows = List.of();
      List<ProductCoverageRowDto> exclusionRows = List.of();

      when(productRepository.findActiveProductRows(any())).thenReturn(productRows);
      when(productTagRepository.findTagRowsByProductIds(any())).thenReturn(tagRows);
      when(productCoverageRepository.findCoverageRows(any())).thenReturn(coverageRows);
      when(productCoverageRepository.findExclusionRows(any())).thenReturn(exclusionRows);

      List<ProductDto> products = productService.getActiveProducts();
      ProductDto expectedProduct = expectedProduct(product, tagRows, coverageRows, exclusionRows);

      assertThat(products).singleElement();
      assertThat(products.getFirst()).isEqualTo(expectedProduct);
    }

    @Test
    void returnsCompleteProductWhenSingleActiveProduct() {
      UUID productId = UUID.randomUUID();
      ProductRowDto product = productRow(productId, 1);

      List<ProductRowDto> productRows = List.of(product);
      List<ProductTagRowDto> tagRows = List.of(tagRow(productId, 0));
      List<ProductCoverageRowDto> coverageRows =
          List.of(coverageRow(productId, 0), coverageRow(productId, 1));
      List<ProductCoverageRowDto> exclusionRows =
          List.of(
              exclusionRow(productId, 0), exclusionRow(productId, 1), exclusionRow(productId, 2));

      when(productRepository.findActiveProductRows(any())).thenReturn(productRows);
      when(productTagRepository.findTagRowsByProductIds(any())).thenReturn(tagRows);
      when(productCoverageRepository.findCoverageRows(any())).thenReturn(coverageRows);
      when(productCoverageRepository.findExclusionRows(any())).thenReturn(exclusionRows);

      List<ProductDto> products = productService.getActiveProducts();
      ProductDto expectedProduct = expectedProduct(product, tagRows, coverageRows, exclusionRows);

      assertThat(products).singleElement();
      assertThat(products.getFirst()).isEqualTo(expectedProduct);
    }

    @Test
    void returnsMultipleProductWhenMultipleActiveProducts() {
      List<ProductRowDto> productRows =
          List.of(
              productRow(UUID.randomUUID(), 1),
              productRow(UUID.randomUUID(), 2),
              productRow(UUID.randomUUID(), 3));
      List<ProductTagRowDto> tagRows = List.of();
      List<ProductCoverageRowDto> coverageRows = List.of();
      List<ProductCoverageRowDto> exclusionRows = List.of();

      when(productRepository.findActiveProductRows(any())).thenReturn(productRows);
      when(productTagRepository.findTagRowsByProductIds(any())).thenReturn(tagRows);
      when(productCoverageRepository.findCoverageRows(any())).thenReturn(coverageRows);
      when(productCoverageRepository.findExclusionRows(any())).thenReturn(exclusionRows);

      List<ProductDto> products = productService.getActiveProducts();
      List<ProductDto> expectedProducts =
          productRows.stream()
              .map(r -> expectedProduct(r, tagRows, coverageRows, exclusionRows))
              .toList();

      assertThat(products).hasSize(3);
      assertThat(products)
          .usingRecursiveFieldByFieldElementComparator()
          .containsExactlyElementsOf(expectedProducts);
    }

    @Test
    void returnsCompleteMultipleProductWhenMultipleActiveProducts() {
      final UUID product1Id = UUID.randomUUID();
      final UUID product2Id = UUID.randomUUID();
      final UUID product3Id = UUID.randomUUID();

      List<ProductRowDto> productRows =
          List.of(productRow(product1Id, 1), productRow(product2Id, 2), productRow(product3Id, 3));

      List<ProductTagRowDto> tagRows =
          List.of(tagRow(product2Id, 1), tagRow(product3Id, 1), tagRow(product3Id, 2));
      List<ProductCoverageRowDto> coverageRows =
          List.of(
              coverageRow(product2Id, 1), coverageRow(product3Id, 1), coverageRow(product3Id, 3));
      List<ProductCoverageRowDto> exclusionRows =
          List.of(
              exclusionRow(product2Id, 1),
              exclusionRow(product3Id, 1),
              exclusionRow(product3Id, 3));

      when(productRepository.findActiveProductRows(any())).thenReturn(productRows);
      when(productTagRepository.findTagRowsByProductIds(any())).thenReturn(tagRows);
      when(productCoverageRepository.findCoverageRows(any())).thenReturn(coverageRows);
      when(productCoverageRepository.findExclusionRows(any())).thenReturn(exclusionRows);

      List<ProductDto> products = productService.getActiveProducts();
      List<ProductDto> expectedProducts =
          productRows.stream()
              .map(
                  r ->
                      expectedProduct(
                          r,
                          tagRows.stream().filter(t -> r.id().equals(t.productId())).toList(),
                          coverageRows.stream().filter(c -> r.id().equals(c.productId())).toList(),
                          exclusionRows.stream()
                              .filter(e -> r.id().equals(e.productId()))
                              .toList()))
              .toList();

      assertThat(products).hasSize(3);
      assertThat(products)
          .usingRecursiveFieldByFieldElementComparator()
          .containsExactlyElementsOf(expectedProducts);
    }

    @Test
    void returnsSingleProductTag() {
      ProductRowDto product = productRow(UUID.randomUUID(), 1);
      ProductTagRowDto tag = tagRow(product.id(), 0);

      List<ProductRowDto> productRows = List.of(product);
      List<ProductTagRowDto> tagRows = List.of(tag);
      List<ProductCoverageRowDto> coverageRows = List.of();
      List<ProductCoverageRowDto> exclusionRows = List.of();

      when(productRepository.findActiveProductRows(any())).thenReturn(productRows);
      when(productTagRepository.findTagRowsByProductIds(any())).thenReturn(tagRows);
      when(productCoverageRepository.findCoverageRows(any())).thenReturn(coverageRows);
      when(productCoverageRepository.findExclusionRows(any())).thenReturn(exclusionRows);

      List<ProductDto> products = productService.getActiveProducts();
      List<ProductTagDto> expectedTag = expectedTags(tagRows);

      assertThat(products.getFirst().tags()).singleElement();
      assertThat(products.getFirst().tags())
          .usingRecursiveFieldByFieldElementComparator()
          .containsExactlyElementsOf(expectedTag);
    }

    @Test
    void returnsMultipleProductTags() {
      ProductRowDto product = productRow(UUID.randomUUID(), 1);

      List<ProductRowDto> productRows = List.of(product);
      List<ProductTagRowDto> tagRows =
          List.of(tagRow(product.id(), 0), tagRow(product.id(), 1), tagRow(product.id(), 2));
      List<ProductCoverageRowDto> coverageRows = List.of();
      List<ProductCoverageRowDto> exclusionRows = List.of();

      when(productRepository.findActiveProductRows(any())).thenReturn(productRows);
      when(productTagRepository.findTagRowsByProductIds(any())).thenReturn(tagRows);
      when(productCoverageRepository.findCoverageRows(any())).thenReturn(coverageRows);
      when(productCoverageRepository.findExclusionRows(any())).thenReturn(exclusionRows);

      List<ProductDto> products = productService.getActiveProducts();
      List<ProductTagDto> expectedTags = expectedTags(tagRows);

      assertThat(products.getFirst().tags()).hasSize(3);
      assertThat(products.getFirst().tags())
          .usingRecursiveFieldByFieldElementComparator()
          .containsExactlyElementsOf(expectedTags);
    }

    @Test
    void returnsSingleProductCoverage() {
      ProductRowDto product = productRow(UUID.randomUUID(), 1);
      ProductCoverageRowDto coverage = coverageRow(product.id(), 0);

      List<ProductRowDto> productRows = List.of(product);
      List<ProductTagRowDto> tagRows = List.of();
      List<ProductCoverageRowDto> coverageRows = List.of(coverage);
      List<ProductCoverageRowDto> exclusionRows = List.of();

      when(productRepository.findActiveProductRows(any())).thenReturn(productRows);
      when(productTagRepository.findTagRowsByProductIds(any())).thenReturn(tagRows);
      when(productCoverageRepository.findCoverageRows(any())).thenReturn(coverageRows);
      when(productCoverageRepository.findExclusionRows(any())).thenReturn(exclusionRows);

      List<ProductDto> products = productService.getActiveProducts();
      List<CoverageDto> expectedCoverage = expectedCoverages(coverageRows);

      assertThat(products.getFirst().coverages()).singleElement();
      assertThat(products.getFirst().coverages())
          .usingRecursiveFieldByFieldElementComparator()
          .containsExactlyElementsOf(expectedCoverage);
    }

    @Test
    void returnsMultipleProductCoverage() {
      ProductRowDto product = productRow(UUID.randomUUID(), 1);

      List<ProductRowDto> productRows = List.of(product);
      List<ProductTagRowDto> tagRows = List.of();
      List<ProductCoverageRowDto> coverageRows =
          List.of(
              coverageRow(product.id(), 0),
              coverageRow(product.id(), 1),
              coverageRow(product.id(), 2));
      List<ProductCoverageRowDto> exclusionRows = List.of();

      when(productRepository.findActiveProductRows(any())).thenReturn(productRows);
      when(productTagRepository.findTagRowsByProductIds(any())).thenReturn(tagRows);
      when(productCoverageRepository.findCoverageRows(any())).thenReturn(coverageRows);
      when(productCoverageRepository.findExclusionRows(any())).thenReturn(exclusionRows);

      List<ProductDto> products = productService.getActiveProducts();
      List<CoverageDto> expectedCoverage = expectedCoverages(coverageRows);

      assertThat(products.getFirst().coverages()).hasSize(3);
      assertThat(products.getFirst().coverages())
          .usingRecursiveFieldByFieldElementComparator()
          .containsExactlyElementsOf(expectedCoverage);
    }

    @Test
    void returnsSingleProductExclusion() {
      ProductRowDto product = productRow(UUID.randomUUID(), 1);
      ProductCoverageRowDto exclusion = exclusionRow(product.id(), 0);

      List<ProductRowDto> productRows = List.of(product);
      List<ProductTagRowDto> tagRows = List.of();
      List<ProductCoverageRowDto> coverageRows = List.of();
      List<ProductCoverageRowDto> exclusionRows = List.of(exclusion);

      when(productRepository.findActiveProductRows(any())).thenReturn(productRows);
      when(productTagRepository.findTagRowsByProductIds(any())).thenReturn(tagRows);
      when(productCoverageRepository.findCoverageRows(any())).thenReturn(coverageRows);
      when(productCoverageRepository.findExclusionRows(any())).thenReturn(exclusionRows);

      List<ProductDto> products = productService.getActiveProducts();
      List<CoverageDto> expectedExclusion = expectedCoverages(exclusionRows);

      assertThat(products.getFirst().exclusions()).singleElement();
      assertThat(products.getFirst().exclusions())
          .usingRecursiveFieldByFieldElementComparator()
          .containsExactlyElementsOf(expectedExclusion);
    }

    @Test
    void returnsMultipleProductExclusions() {
      ProductRowDto product = productRow(UUID.randomUUID(), 1);

      List<ProductRowDto> productRows = List.of(product);
      List<ProductTagRowDto> tagRows = List.of();
      List<ProductCoverageRowDto> coverageRows = List.of();
      List<ProductCoverageRowDto> exclusionRows =
          List.of(
              exclusionRow(product.id(), 0),
              exclusionRow(product.id(), 1),
              exclusionRow(product.id(), 2));

      when(productRepository.findActiveProductRows(any())).thenReturn(productRows);
      when(productTagRepository.findTagRowsByProductIds(any())).thenReturn(tagRows);
      when(productCoverageRepository.findCoverageRows(any())).thenReturn(coverageRows);
      when(productCoverageRepository.findExclusionRows(any())).thenReturn(exclusionRows);

      List<ProductDto> products = productService.getActiveProducts();
      List<CoverageDto> expectedExclusions = expectedCoverages(exclusionRows);

      assertThat(products.getFirst().exclusions()).hasSize(3);
      assertThat(products.getFirst().exclusions())
          .usingRecursiveFieldByFieldElementComparator()
          .containsExactlyElementsOf(expectedExclusions);
    }
  }

  @Nested
  @DisplayName("getInactiveProducts()")
  class GetInactiveProducts {
    @Test
    void callsRepositoryWithCurrentTime() {
      when(productRepository.findInactiveProductRows(any())).thenReturn(List.of());
      productService.getInactiveProducts();
      verify(productRepository).findInactiveProductRows(any());
    }
  }

  @Nested
  @DisplayName("getAllProducts()")
  class GetAllProducts {
    @Test
    void callsRepositoryAndAssembles() {
      when(productRepository.findProductRows()).thenReturn(List.of());
      productService.getAllProducts();
      verify(productRepository).findProductRows();
    }
  }

  @Nested
  @DisplayName("getProducts(Boolean active)")
  class GetProducts {
    @Test
    void callsAllProductsWhenNull() {
      when(productRepository.findProductRows()).thenReturn(List.of());
      productService.getProducts(null);
      verify(productRepository).findProductRows();
    }

    @Test
    void callsActiveProductsWhenTrue() {
      when(productRepository.findActiveProductRows(any())).thenReturn(List.of());
      productService.getProducts(true);
      verify(productRepository).findActiveProductRows(any());
    }

    @Test
    void callsInactiveProductsWhenFalse() {
      when(productRepository.findInactiveProductRows(any())).thenReturn(List.of());
      productService.getProducts(false);
      verify(productRepository).findInactiveProductRows(any());
    }
  }

  @Nested
  @DisplayName("assembleProducts()")
  class AssembleProducts {
    @Test
    void returnsEmptyListImmediatelyWhenInputIsEmpty() {
      List<ProductDto> result = productService.assembleProducts(List.of());
      assertThat(result).isEmpty();
      verifyNoInteractions(productCoverageRepository, productTagRepository);
    }
  }

  @Nested
  @DisplayName("createProduct()")
  class CreateProduct {

    @Test
    void successfullyCreatesAndAssemblesProduct() {
      UUID typeId = UUID.randomUUID();
      UUID tagId = UUID.randomUUID();
      UUID coverageId = UUID.randomUUID();
      UUID exclusionId = UUID.randomUUID();

      CreateProductRequestDto request =
          CreateProductRequestDto.builder()
              .name("Test Product")
              .type(typeId)
              .tags(List.of(tagId))
              .coverages(List.of(coverageId))
              .exclusions(List.of(exclusionId))
              .build();

      ProductType mockType = new ProductType();
      ProductTag mockTag = new ProductTag();
      Coverage mockCoverage = new Coverage();
      Coverage mockExclusion = new Coverage();

      Product savedProduct = new Product();
      savedProduct.setId(UUID.randomUUID());

      when(productTypeRepository.findProductTypeById(typeId)).thenReturn(mockType);
      when(productTagRepository.findTagModelsByIds(any())).thenReturn(Set.of(mockTag));
      when(productCoverageRepository.findCoverageModels(Set.of(coverageId)))
          .thenReturn(Set.of(mockCoverage));
      when(productCoverageRepository.findExclusionModels(Set.of(exclusionId)))
          .thenReturn(Set.of(mockExclusion));
      when(productRepository.saveAndFlush(any(Product.class))).thenReturn(savedProduct);

      when(productRepository.findProductRowById(savedProduct.getId()))
          .thenReturn(
              List.of(
                  new ProductRowDto(
                      savedProduct.getId(),
                      BigDecimal.ONE,
                      "T",
                      "D",
                      null, // startDate
                      null, // endDate
                      true, // active
                      typeId,
                      "C",
                      "L")));

      ProductDto result = productService.createProduct(request);

      assertThat(result).isNotNull();
      verify(productRepository).saveAndFlush(any(Product.class));
    }

    @Test
    void throwsProductTypeNotFoundExceptionWhenTypeIsNull() {
      CreateProductRequestDto request =
          CreateProductRequestDto.builder().type(UUID.randomUUID()).build();
      when(productTypeRepository.findProductTypeById(any())).thenReturn(null);

      assertThrows(ProductTypeNotFoundException.class, () -> productService.createProduct(request));
    }

    @Test
    void throwsProductTagNotFoundExceptionWhenTagsMismatch() {
      CreateProductRequestDto request =
          CreateProductRequestDto.builder()
              .type(UUID.randomUUID())
              .tags(List.of(UUID.randomUUID()))
              .build();

      when(productTypeRepository.findProductTypeById(any())).thenReturn(new ProductType());
      when(productTagRepository.findTagModelsByIds(any())).thenReturn(Set.of()); // Mismatch

      assertThrows(ProductTagNotFoundException.class, () -> productService.createProduct(request));
    }

    @Test
    void throwsCoverageNotFoundExceptionWhenCoveragesMismatch() {
      CreateProductRequestDto request =
          CreateProductRequestDto.builder()
              .type(UUID.randomUUID())
              .tags(List.of())
              .coverages(List.of(UUID.randomUUID()))
              .build();

      when(productTypeRepository.findProductTypeById(any())).thenReturn(new ProductType());
      when(productTagRepository.findTagModelsByIds(any())).thenReturn(Set.of());
      when(productCoverageRepository.findCoverageModels(any())).thenReturn(Set.of()); // Mismatch

      assertThrows(CoverageNotFoundException.class, () -> productService.createProduct(request));
    }

    @Test
    @DisplayName("Throws CoverageNotFoundException when exclusions mismatch during creation")
    void throwsCoverageNotFoundWhenExclusionsMismatch() {
      CreateProductRequestDto request =
          CreateProductRequestDto.builder()
              .type(UUID.randomUUID())
              .tags(List.of())
              .coverages(List.of())
              .exclusions(List.of(UUID.randomUUID()))
              .build();

      when(productTypeRepository.findProductTypeById(any())).thenReturn(new ProductType());
      when(productTagRepository.findTagModelsByIds(any())).thenReturn(Set.of());
      when(productCoverageRepository.findCoverageModels(any())).thenReturn(Set.of());
      when(productCoverageRepository.findExclusionModels(any())).thenReturn(Set.of());

      assertThrows(CoverageNotFoundException.class, () -> productService.createProduct(request));
    }
  }

  @Nested
  @DisplayName("toggleProductActive()")
  class ToggleProductActive {
    @Test
    void negatesActiveStatusAndSaves() {
      UUID id = UUID.randomUUID();
      Product product = new Product();
      product.setActive(true);

      when(productRepository.findById(id)).thenReturn(Optional.of(product));

      productService.toggleProductActive(id);

      assertThat(product.getActive()).isFalse();
      verify(productRepository).save(product);
    }

    @Test
    void throwsNotFoundException() {
      UUID id = UUID.randomUUID();
      when(productRepository.findById(id)).thenReturn(Optional.empty());
      assertThrows(ProductNotFoundException.class, () -> productService.toggleProductActive(id));
    }

    @Test
    @DisplayName("Toggles active status from false to true")
    void togglesActiveStatusFromFalseToTrue() {
      UUID id = UUID.randomUUID();
      Product product = new Product();
      product.setActive(false);

      when(productRepository.findById(id)).thenReturn(Optional.of(product));

      productService.toggleProductActive(id);

      assertThat(product.getActive()).isTrue();
      verify(productRepository).save(product);
    }
  }

  @Nested
  @DisplayName("getProductDto()")
  class GetProductDto {
    @Test
    void throwsNotFoundIfAssemblyResultIsEmpty() {
      UUID id = UUID.randomUUID();
      when(productRepository.findProductRowById(id)).thenReturn(List.of());

      assertThrows(ProductNotFoundException.class, () -> productService.getProductDto(id));
    }

    @Test
    @DisplayName("Throws NPE when ID is null to satisfy Lombok @NonNull")
    void throwsNullPointerExceptionWhenIdIsNull() {
      assertThrows(NullPointerException.class, () -> productService.getProductDto(null));
    }
  }

  @Nested
  @DisplayName("updateProduct()")
  class UpdateProduct {

    @Test
    void successfullyUpdatesProduct() {
      UUID id = UUID.randomUUID();
      UpdateProductRequestDto request =
          UpdateProductRequestDto.builder()
              .name("Updated")
              .coverages(List.of())
              .exclusions(List.of())
              .tags(List.of())
              .build();

      Product product = new Product();
      when(productRepository.findById(id)).thenReturn(Optional.of(product));
      when(productCoverageRepository.findCoverageModels(any())).thenReturn(Set.of());
      when(productCoverageRepository.findExclusionModels(any())).thenReturn(Set.of());
      when(productTagRepository.findTagModelsByIds(any())).thenReturn(Set.of());

      productService.updateProduct(id, request);
      verify(productRepository).save(product);
    }

    @Test
    void throwsCoverageNotFoundWhenExclusionsMismatch() {
      UUID id = UUID.randomUUID();
      UpdateProductRequestDto request =
          UpdateProductRequestDto.builder()
              .coverages(List.of())
              .exclusions(List.of(UUID.randomUUID()))
              .build();

      Product product = new Product();
      when(productRepository.findById(id)).thenReturn(Optional.of(product));
      when(productCoverageRepository.findCoverageModels(any())).thenReturn(Set.of());
      when(productCoverageRepository.findExclusionModels(any())).thenReturn(Set.of());

      assertThrows(
          CoverageNotFoundException.class, () -> productService.updateProduct(id, request));
    }

    @Test
    @DisplayName("Throws ProductNotFoundException when updating an unknown product")
    void throwsProductNotFoundWhenUpdatingUnknownProduct() {
      UUID id = UUID.randomUUID();
      UpdateProductRequestDto request = UpdateProductRequestDto.builder().build();

      when(productRepository.findById(id)).thenReturn(Optional.empty());

      assertThrows(ProductNotFoundException.class, () -> productService.updateProduct(id, request));
    }
  }
}
