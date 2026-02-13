package com.munichre.streamline.repository;

import com.munichre.streamline.model.Quotation;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuotationRepository extends JpaRepository<Quotation, UUID> {}
