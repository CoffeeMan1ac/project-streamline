package com.munichre.streamline.constant;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class ApiRoutes {
  public static final String CUSTOMER_API_ROOT = "/customer/**";
  public static final String BACKOFFICE_API_ROOT = "/backoffice/**";

  public static final String CUSTOMER_API_BASE = "/customer";
  public static final String BACKOFFICE_API_BASE = "/backoffice";
}
