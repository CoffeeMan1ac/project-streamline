package com.munichre.streamline.product.model;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductField {
  private String name;
  private String type;
  private String label;
  private Boolean required;
  private List<String> options;
}
