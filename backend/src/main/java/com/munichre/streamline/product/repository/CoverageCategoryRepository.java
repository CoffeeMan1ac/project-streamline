package com.munichre.streamline.product.repository;

import com.munichre.streamline.product.model.CoverageCategory;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CoverageCategoryRepository extends JpaRepository<CoverageCategory, UUID> {}
