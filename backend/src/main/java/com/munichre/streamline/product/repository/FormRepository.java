package com.munichre.streamline.product.repository;

import com.munichre.streamline.product.model.Form;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FormRepository extends JpaRepository<Form, UUID> {}
