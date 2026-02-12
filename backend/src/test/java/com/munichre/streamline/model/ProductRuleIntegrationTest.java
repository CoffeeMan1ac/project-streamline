package com.munichre.streamline.model;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.math.BigDecimal;
import java.time.LocalDateTime;
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
}