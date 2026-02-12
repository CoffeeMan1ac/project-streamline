package com.munichre.streamline.model;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertLinesMatch;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

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
    void shouldPersistProductWithRules() {
        // Arrange
        Product product = new Product();
        product.setName("Premium Plan");
        product.setBaseRate(BigDecimal.valueOf(100));
        product.setMostPopular(true);
        product.setCoverage(List.of("Fire", "Flood"));
        product.setExclusions(List.of("War"));
        product.setStartDate(LocalDateTime.now());
        product.setActive(true);

        Rule rule1 = new Rule();
		rule1.setName("age check");
		rule1.setPriority(1);
		rule1.setActive(true);
        rule1.setConditionField("age");
        rule1.setConditionOperator(">");
		rule1.setConditionValue("50");
		rule1.setActionType("reject");
        rule1.setProduct(product);

        Rule rule2 = new Rule();
		rule2.setName("smoker check");
		rule2.setPriority(2);
		rule2.setActive(true);
        rule2.setConditionField("smoker");
        rule2.setConditionOperator("=");
		rule2.setConditionValue("true");
		rule2.setActionType("reject");
        rule2.setProduct(product);

        product.setRules(List.of(rule1, rule2));

        // Act
        Product saved = productRepository.saveAndFlush(product);
        entityManager.clear();

        // Assert
		UUID id = saved.getId();
		assertNotNull(id);

        Product found = productRepository.findById(id).orElseThrow();

        List<Rule> foundRules = found.getRules();
        assertEquals(2, foundRules.size());

        assertEquals(foundRules.get(0).getName(), rule1.getName());
        assertEquals(foundRules.get(1).getName(), rule2.getName());
    }

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