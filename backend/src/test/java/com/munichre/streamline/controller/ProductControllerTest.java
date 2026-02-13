package com.munichre.streamline.controller;


import com.munichre.streamline.model.Product;
import com.munichre.streamline.service.ProductService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import java.util.List;
import java.util.ArrayList;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ProductController.class)
class ProductControllerTest { 

	@Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private ProductService productService;

	//test that it returns status code 200 and empty JSON array when no products in db
    @Test
    void getProducts_returnsOk() throws Exception {
        mockMvc.perform(get("/api/products"))
            .andExpect(status().isOk())
			.andExpect(content().contentTypeCompatibleWith("application/json"))
            .andExpect(jsonPath("$.length()").value(0));

		verify(productService).getProducts();
    }

	@Test
	void getProducts_returnsTwoProducts() throws Exception {

		Product p1 = new Product(null, null, null, "StandardShield", null, null, null, null, null, null, null, null);
		Product p2 = new Product(null, null, null, "PremiumShield", null, null, null, null, null, null, null, null);

		when(productService.getProducts())
			.thenReturn(new ArrayList<>(List.of(p1, p2)));

		mockMvc.perform(get("/api/products"))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.length()").value(2))
			.andExpect(jsonPath("$[0].name").value("StandardShield"))
			.andExpect(jsonPath("$[1].name").value("PremiumShield"));

		verify(productService).getProducts();
	}
}


