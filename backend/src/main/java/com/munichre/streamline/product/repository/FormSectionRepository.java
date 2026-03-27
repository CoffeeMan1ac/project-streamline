package com.munichre.streamline.product.repository;

import com.munichre.streamline.product.model.FormSection;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FormSectionRepository extends JpaRepository<FormSection, UUID> {}
