package com.munichre.streamline.service;

import java.util.Map;

public interface FieldPathResolver {
    Object resolve(Map<String, Object> data, String path);
}
