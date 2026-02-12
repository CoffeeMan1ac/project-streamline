package com.munichre.streamline.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.munichre.streamline.model.Product;
import com.munichre.streamline.repository.ProductRepository;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    public void createProduct(@NonNull Product product) {
        productRepository.save(product);
    }

    public List<Product> getActiveProducts() {
        return productRepository.findActiveProducts(LocalDateTime.now());
    }

}
