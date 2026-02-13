package com.munichre.streamline.model;

import static org.junit.jupiter.api.Assertions.assertLinesMatch;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import com.munichre.streamline.repository.ProductRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;


@SpringBootTest
@Transactional
public class ProductRuleIntegrationTest {

    @Autowired
    private ProductRepository productRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Test
    void testFindActiveProducts() {
        LocalDateTime today = LocalDateTime.now();
        LocalDateTime yesterday = today.minusDays(1);
        LocalDateTime tomorrow = today.plusDays(1);

        Integer i = 1;

        ArrayList<String> passes = new ArrayList<>();

        // PASS - After Start, No End, Active
        Product p = new Product();
        p.setName("p".concat((i++).toString()));
        p.setBaseRate(BigDecimal.valueOf(100));
        p.setMostPopular(true);
        p.setStartDate(yesterday);
        p.setActive(true);
        productRepository.save(p);
        passes.add(p.getName());
        
        // Fail - After Start, No End, [Inactive]
        p = new Product();
        p.setName("p".concat((i++).toString()));
        p.setBaseRate(BigDecimal.valueOf(100));
        p.setMostPopular(true);
        p.setStartDate(yesterday);
        p.setActive(false);
        productRepository.save(p);
        
        // PASS - After Start, Before End, Active
        p = new Product();
        p.setName("p".concat((i++).toString()));
        p.setBaseRate(BigDecimal.valueOf(100));
        p.setMostPopular(true);
        p.setStartDate(yesterday);
        p.setEndDate(tomorrow);
        p.setActive(true);
        productRepository.save(p);
        passes.add(p.getName());
        
        // Fail - After Start, Before End, [Inactive]
        p = new Product();
        p.setName("p".concat((i++).toString()));
        p.setBaseRate(BigDecimal.valueOf(100));
        p.setMostPopular(true);
        p.setStartDate(yesterday);
        p.setEndDate(tomorrow);
        p.setActive(false);
        productRepository.save(p);

        // Fail - After Start, [After End], Active
        p = new Product();
        p.setName("p".concat((i++).toString()));
        p.setBaseRate(BigDecimal.valueOf(100));
        p.setMostPopular(true);
        p.setStartDate(yesterday);
        p.setEndDate(yesterday);
        p.setActive(true);
        productRepository.save(p);
        
        // Fail - After Start, [After End], [Inactive]
        p = new Product();
        p.setName("p".concat((i++).toString()));
        p.setBaseRate(BigDecimal.valueOf(100));
        p.setMostPopular(true);
        p.setStartDate(yesterday);
        p.setEndDate(yesterday);
        p.setActive(false);
        productRepository.save(p);
        
        // Fail - [Before Start], No End, Active
        p = new Product();
        p.setName("p".concat((i++).toString()));
        p.setBaseRate(BigDecimal.valueOf(100));
        p.setMostPopular(true);
        p.setStartDate(tomorrow);
        p.setActive(true);
        productRepository.save(p);
        
        // Fail - [Before Start], No End, [Inactive]
        p = new Product();
        p.setName("p".concat((i++).toString()));
        p.setBaseRate(BigDecimal.valueOf(100));
        p.setMostPopular(true);
        p.setStartDate(tomorrow);
        p.setActive(false);
        productRepository.save(p);
        
        // Fail - [Before Start], Before End, Active
        p = new Product();
        p.setName("p".concat((i++).toString()));
        p.setBaseRate(BigDecimal.valueOf(100));
        p.setMostPopular(true);
        p.setStartDate(tomorrow);
        p.setEndDate(tomorrow);
        p.setActive(true);
        productRepository.save(p);
        
        // Fail - [Before Start], Before End, [Inactive]
        p = new Product();
        p.setName("p".concat((i++).toString()));
        p.setBaseRate(BigDecimal.valueOf(100));
        p.setMostPopular(true);
        p.setStartDate(tomorrow);
        p.setEndDate(tomorrow);
        p.setActive(false);
        productRepository.save(p);

        productRepository.flush();

        List<Product> activeProducts = productRepository.findActiveProducts(today);
        List<String> activeNames = activeProducts.stream()
            .map(product -> product.getName()).toList();

        assertLinesMatch(passes, activeNames);

    }
}