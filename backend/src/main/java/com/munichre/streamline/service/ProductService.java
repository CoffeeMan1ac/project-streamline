package com.munichre.streamline.service;

import com.munichre.streamline.dto.ProductCoverageRowDto;
import com.munichre.streamline.dto.ProductRowDto;
import com.munichre.streamline.dto.CoverageCategoryDto;
import com.munichre.streamline.dto.CoverageDto;
import com.munichre.streamline.dto.ProductDto;
import com.munichre.streamline.dto.ProductTypeDto;
import com.munichre.streamline.repository.ProductCoverageRepository;
import com.munichre.streamline.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.*;
import static java.util.stream.Collectors.groupingBy;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProductService {

    private final ProductRepository productReadRepository;
    private final ProductCoverageRepository productCoverageRepository;

    /**
     * Fetches active products and assembles them with their respective
     * coverages and exclusions using a high-performance batching strategy.
     */
    public List<ProductDto> getActiveProducts() {
        LocalDateTime now = LocalDateTime.now();

        List<ProductRowDto> productRows = productReadRepository.findActiveProductRows(now);
        if (productRows.isEmpty()) {
            return List.of();
        }

        List<UUID> productIds = productRows.stream().map(ProductRowDto::id).toList();

        Map<UUID, List<ProductCoverageRowDto>> coveragesByProduct = productCoverageRepository
                .findCoverageRows(productIds)
                .stream()
                .collect(groupingBy(ProductCoverageRowDto::productId));

        Map<UUID, List<ProductCoverageRowDto>> exclusionsByProduct = productCoverageRepository
                .findExclusionRows(productIds)
                .stream()
                .collect(groupingBy(ProductCoverageRowDto::productId));

        return productRows.stream()
                .map(row -> ProductAssembler.toDto(
                        row,
                        coveragesByProduct.getOrDefault(row.id(), List.of()),
                        exclusionsByProduct.getOrDefault(row.id(), List.of())))
                .toList();
    }

    private static class ProductAssembler {

        static ProductDto toDto(ProductRowDto row,
                List<ProductCoverageRowDto> coverageRows,
                List<ProductCoverageRowDto> exclusionRows) {
            return new ProductDto(
                    row.id(),
                    row.baseRate(),
                    row.name(),
                    row.description(),
                    row.mostPopular(),
                    new ProductTypeDto(row.typeId(), row.typeCode(), row.typeLabel()),
                    mapCoverages(coverageRows),
                    mapCoverages(exclusionRows));
        }

        private static List<CoverageDto> mapCoverages(List<ProductCoverageRowDto> rows) {
            return rows.stream()
                    .map(ProductAssembler::toCoverageDto)
                    .distinct()
                    .toList();
        }

        private static CoverageDto toCoverageDto(ProductCoverageRowDto r) {
            return new CoverageDto(
                    r.coverageId(),
                    r.coverageCode(),
                    r.coverageLabel(),
                    new CoverageCategoryDto(r.categoryId(), r.categoryCode(), r.categoryLabel()));
        }
    }
}