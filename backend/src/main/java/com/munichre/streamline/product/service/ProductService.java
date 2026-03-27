package com.munichre.streamline.product.service;

import static java.util.stream.Collectors.groupingBy;
import static java.util.stream.Collectors.toMap;

import com.munichre.streamline.product.api.dto.CoverageCategoryDto;
import com.munichre.streamline.product.api.dto.CoverageDto;
import com.munichre.streamline.product.api.dto.CoverageOptionDto;
import com.munichre.streamline.product.api.dto.CreateCoverageRequestDto;
import com.munichre.streamline.product.api.dto.CreateFieldRequestDto;
import com.munichre.streamline.product.api.dto.CreateProductRequestDto;
import com.munichre.streamline.product.api.dto.CreateTagRequestDto;
import com.munichre.streamline.product.api.dto.FieldDto;
import com.munichre.streamline.product.api.dto.FormDto;
import com.munichre.streamline.product.api.dto.FormSectionDto;
import com.munichre.streamline.product.api.dto.ProductDto;
import com.munichre.streamline.product.api.dto.ProductFieldDto;
import com.munichre.streamline.product.api.dto.ProductOptionDto;
import com.munichre.streamline.product.api.dto.ProductTagDto;
import com.munichre.streamline.product.api.dto.ProductTypeDto;
import com.munichre.streamline.product.api.dto.TagOptionDto;
import com.munichre.streamline.product.api.dto.UpdateCoverageRequestDto;
import com.munichre.streamline.product.api.dto.UpdateFieldRequestDto;
import com.munichre.streamline.product.api.dto.UpdateProductRequestDto;
import com.munichre.streamline.product.api.dto.UpdateTagRequestDto;
import com.munichre.streamline.product.exception.CoverageCategoryNotFoundException;
import com.munichre.streamline.product.exception.CoverageNotFoundException;
import com.munichre.streamline.product.exception.DuplicateFieldCodeException;
import com.munichre.streamline.product.exception.DuplicateTagCodeException;
import com.munichre.streamline.product.exception.FieldNotFoundException;
import com.munichre.streamline.product.exception.FormNotFoundException;
import com.munichre.streamline.product.exception.InvalidProductFieldException;
import com.munichre.streamline.product.exception.ProductNotFoundException;
import com.munichre.streamline.product.exception.ProductTagNotFoundException;
import com.munichre.streamline.product.exception.ProductTypeNotFoundException;
import com.munichre.streamline.product.model.Coverage;
import com.munichre.streamline.product.model.CoverageCategory;
import com.munichre.streamline.product.model.Field;
import com.munichre.streamline.product.model.Form;
import com.munichre.streamline.product.model.FormSection;
import com.munichre.streamline.product.model.Product;
import com.munichre.streamline.product.model.ProductField;
import com.munichre.streamline.product.model.ProductTag;
import com.munichre.streamline.product.model.ProductType;
import com.munichre.streamline.product.repository.CoverageCategoryRepository;
import com.munichre.streamline.product.repository.CoverageRepository;
import com.munichre.streamline.product.repository.FieldRepository;
import com.munichre.streamline.product.repository.FormRepository;
import com.munichre.streamline.product.repository.ProductCoverageRepository;
import com.munichre.streamline.product.repository.ProductRepository;
import com.munichre.streamline.product.repository.ProductTagRepository;
import com.munichre.streamline.product.repository.ProductTypeRepository;
import com.munichre.streamline.product.repository.TagRepository;
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
  private final CoverageRepository coverageRepository;
  private final CoverageCategoryRepository coverageCategoryRepository;
  private final FieldRepository fieldRepository;
  private final FormRepository formRepository;
  private final ProductTagRepository productTagRepository;
  private final TagRepository tagRepository;
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

    List<Product> products = productRepository.findAllById(productIds);

    Map<UUID, List<ProductField>> fieldsByProduct =
        products.stream()
            .collect(
                toMap(
                    Product::getId,
                    p -> p.getProductFields() != null ? p.getProductFields() : List.of()));

    Map<UUID, Form> formByProduct =
        products.stream()
            .filter(p -> p.getForm() != null)
            .collect(toMap(Product::getId, Product::getForm));

    return productRows.stream()
        .map(
            row ->
                ProductAssembler.toDto(
                    row,
                    coveragesByProduct.getOrDefault(row.id(), List.of()),
                    exclusionsByProduct.getOrDefault(row.id(), List.of()),
                    tagsByProduct.getOrDefault(row.id(), List.of()),
                    fieldsByProduct.getOrDefault(row.id(), List.of()),
                    formByProduct.get(row.id())))
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

  public ProductDto createProduct(CreateProductRequestDto productRequest) {
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

    // Form (optional)
    if (productRequest.getFormId() != null) {
      Form form =
          formRepository
              .findById(productRequest.getFormId())
              .orElseThrow(() -> new FormNotFoundException(productRequest.getFormId()));
      product.setForm(form);
    }

    Product saved = productRepository.saveAndFlush(product);
    return getProductDto(saved.getId());
  }

  public List<TagOptionDto> getAllTags() {
    return productTagRepository.findAllTags().stream()
        .map(t -> new TagOptionDto(t.getId(), t.getCode(), t.getLabel(), t.getColor()))
        .toList();
  }

  @Transactional
  public TagOptionDto createTag(CreateTagRequestDto request) {
    if (tagRepository.existsByCode(request.code())) {
      throw new DuplicateTagCodeException(request.code());
    }

    ProductTag tag = new ProductTag();
    tag.setCode(request.code());
    tag.setLabel(request.label());
    tag.setColor(request.color());

    ProductTag saved = tagRepository.save(tag);
    return new TagOptionDto(saved.getId(), saved.getCode(), saved.getLabel(), saved.getColor());
  }

  @Transactional
  public TagOptionDto updateTag(UUID id, UpdateTagRequestDto request) {
    ProductTag tag =
        tagRepository.findById(id).orElseThrow(() -> new ProductTagNotFoundException(id));

    tag.setLabel(request.label());
    tag.setColor(request.color());

    ProductTag saved = tagRepository.save(tag);
    return new TagOptionDto(saved.getId(), saved.getCode(), saved.getLabel(), saved.getColor());
  }

  public List<CoverageOptionDto> getAllCoverages() {
    return productCoverageRepository.findAllCoverages().stream()
        .map(c -> new CoverageOptionDto(c.getId(), c.getCode(), c.getLabel()))
        .toList();
  }

  @Transactional
  public CoverageOptionDto createCoverage(CreateCoverageRequestDto request) {
    CoverageCategory category =
        coverageCategoryRepository
            .findById(request.categoryId())
            .orElseThrow(() -> new CoverageCategoryNotFoundException(request.categoryId()));

    ProductType type = getProductType(request.typeId());
    if (type == null) throw new ProductTypeNotFoundException();

    Coverage coverage = new Coverage();
    coverage.setCode(request.code());
    coverage.setLabel(request.label());
    coverage.setCategory(category);
    coverage.setType(type);

    Coverage saved = coverageRepository.save(coverage);
    return new CoverageOptionDto(saved.getId(), saved.getCode(), saved.getLabel());
  }

  @Transactional
  public CoverageOptionDto updateCoverage(UUID id, UpdateCoverageRequestDto request) {
    Coverage coverage =
        coverageRepository.findById(id).orElseThrow(() -> new CoverageNotFoundException(id));

    CoverageCategory category =
        coverageCategoryRepository
            .findById(request.categoryId())
            .orElseThrow(() -> new CoverageCategoryNotFoundException(request.categoryId()));

    coverage.setLabel(request.label());
    coverage.setCategory(category);

    Coverage saved = coverageRepository.save(coverage);
    return new CoverageOptionDto(saved.getId(), saved.getCode(), saved.getLabel());
  }

  public List<FieldDto> getAllFields() {
    return fieldRepository.findAll().stream()
        .map(
            f ->
                new FieldDto(
                    f.getId(),
                    f.getCode(),
                    f.getType(),
                    f.getLabel(),
                    f.getRequired(),
                    f.getRegexPattern(),
                    f.getOptions()))
        .toList();
  }

  @Transactional
  public FieldDto createField(CreateFieldRequestDto request) {
    if (fieldRepository.existsByCode(request.code())) {
      throw new DuplicateFieldCodeException(request.code());
    }

    Field field = new Field();
    field.setCode(request.code());
    field.setType(request.type());
    field.setLabel(request.label());
    field.setRequired(request.required() != null ? request.required() : false);
    field.setRegexPattern(request.regexPattern());
    field.setOptions(request.options());

    Field saved = fieldRepository.save(field);
    return new FieldDto(
        saved.getId(),
        saved.getCode(),
        saved.getType(),
        saved.getLabel(),
        saved.getRequired(),
        saved.getRegexPattern(),
        saved.getOptions());
  }

  @Transactional
  public FieldDto updateField(UUID id, UpdateFieldRequestDto request) {
    Field field = fieldRepository.findById(id).orElseThrow(() -> new FieldNotFoundException(id));

    field.setType(request.type());
    field.setLabel(request.label());
    field.setRequired(request.required() != null ? request.required() : false);
    field.setRegexPattern(request.regexPattern());
    field.setOptions(request.options());

    Field saved = fieldRepository.save(field);
    return new FieldDto(
        saved.getId(),
        saved.getCode(),
        saved.getType(),
        saved.getLabel(),
        saved.getRequired(),
        saved.getRegexPattern(),
        saved.getOptions());
  }

  @Transactional(readOnly = true)
  public List<ProductFieldDto> getProductFormFields(UUID productId) {
    Product product =
        productRepository
            .findById(productId)
            .orElseThrow(() -> new ProductNotFoundException(productId));
    List<ProductField> fields = product.getProductFields();
    if (fields == null) return List.of();
    return fields.stream()
        .map(
            f ->
                new ProductFieldDto(
                    f.getName(), f.getType(), f.getLabel(), f.getRequired(), f.getOptions()))
        .toList();
  }

  @Transactional
  public List<ProductFieldDto> updateProductFormFields(
      UUID productId, List<ProductFieldDto> fields) {
    Product product =
        productRepository
            .findById(productId)
            .orElseThrow(() -> new ProductNotFoundException(productId));

    for (ProductFieldDto field : fields) {
      if (field.name() == null || field.name().isBlank()) {
        throw new InvalidProductFieldException("Each product field must have a name.");
      }
      if (field.type() == null || field.type().isBlank()) {
        throw new InvalidProductFieldException("Each product field must have a type.");
      }
      if (field.label() == null || field.label().isBlank()) {
        throw new InvalidProductFieldException("Each product field must have a label.");
      }
    }

    List<ProductField> productFields =
        fields.stream()
            .map(f -> new ProductField(f.name(), f.type(), f.label(), f.required(), f.options()))
            .toList();

    product.setProductFields(productFields);
    productRepository.save(product);

    return fields;
  }

  @Transactional
  public void toggleProductActive(UUID id) {
    Product product =
        productRepository.findById(id).orElseThrow(() -> new ProductNotFoundException(id));
    product.setActive(!product.getActive());
    productRepository.save(product);
  }

  @Transactional
  public void deleteProduct(UUID id) {
    Product product =
        productRepository.findById(id).orElseThrow(() -> new ProductNotFoundException(id));
    product.setDeleted(true);
    productRepository.save(product);
  }

  public ProductType getProductType(UUID productTypeId) {
    return productTypeRepository.findProductTypeById(productTypeId);
  }

  public ProductDto getProductDto(@NonNull UUID id) {
    List<ProductRowDto> rows = productRepository.findProductRowById(id);
    List<ProductDto> assembled = assembleProducts(rows);
    if (assembled.isEmpty()) throw new ProductNotFoundException(id);
    return assembled.get(0);
  }

  @Transactional
  public void updateProduct(UUID id, UpdateProductRequestDto request) {
    Product product =
        productRepository.findById(id).orElseThrow(() -> new ProductNotFoundException(id));

    product.setName(request.getName());
    product.setDescription(request.getDescription());
    product.setBaseRate(request.getBaseRate());
    product.setStartDate(request.getStartDate());
    product.setEndDate(request.getEndDate());

    Set<UUID> coverageIds = new HashSet<>(request.getCoverages());
    Set<Coverage> coverages = productCoverageRepository.findCoverageModels(coverageIds);
    if (coverageIds.size() != coverages.size()) throw new CoverageNotFoundException();
    product.setCoverages(coverages);

    Set<UUID> exclusionIds = new HashSet<>(request.getExclusions());
    Set<Coverage> exclusions = productCoverageRepository.findExclusionModels(exclusionIds);
    if (exclusionIds.size() != exclusions.size()) throw new CoverageNotFoundException();
    product.setExclusions(exclusions);

    Set<UUID> tagIds = new HashSet<>(request.getTags());
    Set<ProductTag> tags = productTagRepository.findTagModelsByIds(tagIds);
    if (tagIds.size() != tags.size()) throw new ProductTagNotFoundException();
    product.setTags(tags);

    // Form (optional)
    if (request.getFormId() != null) {
      Form form =
          formRepository
              .findById(request.getFormId())
              .orElseThrow(() -> new FormNotFoundException(request.getFormId()));
      product.setForm(form);
    } else {
      product.setForm(null);
    }

    productRepository.save(product);
  }

  private static class ProductAssembler {

    static ProductDto toDto(
        ProductRowDto row,
        List<ProductCoverageRowDto> coverageRows,
        List<ProductCoverageRowDto> exclusionRows,
        List<ProductTagRowDto> tags,
        List<ProductField> productFields,
        Form form) {
      return new ProductDto(
          row.id(),
          row.baseRate(),
          row.name(),
          row.description(),
          row.active(),
          row.startDate(),
          row.endDate(),
          mapTags(tags),
          new ProductTypeDto(row.typeId(), row.typeCode(), row.typeLabel()),
          mapCoverages(coverageRows),
          mapCoverages(exclusionRows),
          mapProductFields(productFields),
          mapForm(form));
    }

    private static FormDto mapForm(Form form) {
      if (form == null) return null;
      List<FormSectionDto> sectionDtos =
          form.getSections() != null
              ? form.getSections().stream()
                  .map(ProductAssembler::mapFormSection)
                  .toList()
              : List.of();
      return new FormDto(form.getId(), form.getName(), form.getDescription(), sectionDtos);
    }

    private static FormSectionDto mapFormSection(FormSection section) {
      List<FieldDto> fieldDtos =
          section.getFields() != null
              ? section.getFields().stream()
                  .map(
                      f ->
                          new FieldDto(
                              f.getId(),
                              f.getCode(),
                              f.getType(),
                              f.getLabel(),
                              f.getRequired(),
                              f.getRegexPattern(),
                              f.getOptions()))
                  .toList()
              : List.of();
      return new FormSectionDto(
          section.getId(),
          section.getName(),
          section.getLabel(),
          section.getDisplayOrder(),
          fieldDtos);
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
      return new ProductTagDto(row.id(), row.code(), row.label(), row.color());
    }
  }
}
