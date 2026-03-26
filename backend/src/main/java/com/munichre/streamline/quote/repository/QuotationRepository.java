package com.munichre.streamline.quote.repository;

import com.munichre.streamline.quote.model.Quotation;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface QuotationRepository extends JpaRepository<Quotation, UUID> {
  Optional<Quotation> findByReference(String reference);

  boolean existsByReference(String reference);

  List<Quotation> findAllByOrderByCreatedAtDesc(Pageable pageable);

  List<Quotation> findByReferenceContaining(String partialRef, Pageable pageable);

  @Query(value = "SELECT nextval('quote_reference_seq')", nativeQuery = true)
  Long getNextReferenceValue();
}
