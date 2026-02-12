package com.munichre.streamline;

import com.munichre.streamline.dto.EvaluationResult;
import com.munichre.streamline.service.DecisionService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.HashMap;
import java.util.Map;

@SpringBootTest
public class DecisionServiceTest {

    @Autowired
    private DecisionService decisionService;

@Test
public void testDeclineAge() {
    Map<String, Object> fields = new HashMap<>();
    fields.put("age", 70);
    fields.put("sum_insured", 50000);
    fields.put("smoker", "no");

    EvaluationResult result = decisionService.evaluate(fields);

    System.out.println("=== TEST: age = 70 ===");
    System.out.println("Status:  " + result.getStatus());
    System.out.println("Premium: " + result.getPremium());
    System.out.println("Reason:  " + result.getReason());
    System.out.println("Rules:   " + result.getRulesApplied());
}

@Test
public void testAcceptAge() {
    Map<String, Object> fields = new HashMap<>();
    fields.put("age", 30);
    fields.put("sum_insured", 500000);
    fields.put("smoker", "yes");

    EvaluationResult result = decisionService.evaluate(fields);

    System.out.println("=== TEST: age = 30 ===");
    System.out.println("Status:  " + result.getStatus());
    System.out.println("Premium: " + result.getPremium());
    System.out.println("Reason:  " + result.getReason());
    System.out.println("Rules:   " + result.getRulesApplied());
}

@Test
public void testDeclineSum() {
    Map<String, Object> fields = new HashMap<>();
    fields.put("age", 30);
    fields.put("sum_insured", 1000001);
    fields.put("smoker", "no");

    EvaluationResult result = decisionService.evaluate(fields);

    System.out.println("=== TEST: age = 30 ===");
    System.out.println("Status:  " + result.getStatus());
    System.out.println("Premium: " + result.getPremium());
    System.out.println("Reason:  " + result.getReason());
    System.out.println("Rules:   " + result.getRulesApplied());
}


}