package com.munichre.streamline.product.repository;

import com.munichre.streamline.product.model.Coverage;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CoverageRepository extends JpaRepository<Coverage, UUID> {}
