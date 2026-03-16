import http from "../api/http";

export interface ProductTagDto {
  id: string;
  code: string;
  label: string;
}

export interface ProductTypeDto {
  id: string;
  code: string;
  label: string;
}

export interface CoverageCategoryDto {
  id: string;
  code: string;
  label: string;
}

export interface CoverageDto {
  id: string;
  code: string;
  label: string;
  category: CoverageCategoryDto;
}

export interface ProductFieldDto {
  name: string;
  type: string;
  label: string;
  required: boolean;
  options: string[] | null;
}

export interface ProductDto {
  id: string;
  baseRate: number;
  name: string;
  description: string;
  active: boolean;
  startDate: string | null;
  endDate: string | null;
  tags: ProductTagDto[];
  type: ProductTypeDto;
  coverages: CoverageDto[];
  exclusions: CoverageDto[];
  productFields: ProductFieldDto[];
}

export interface CreateProductRequest {
  name: string;
  description: string;
  baseRate: number;
  type: string;
  startDate: string;
  endDate: string | null;
  coverages: string[];
  exclusions: string[];
  tags: string[];
}

export interface CoverageOption {
  id: string;
  code: string;
  label: string;
}

export interface TagOption {
  id: string;
  code: string;
  label: string;
}

export interface UpdateProductRequest {
  name: string;
  description: string;
  baseRate: number;
  startDate: string;
  endDate: string | null;
  coverages: string[];
  exclusions: string[];
  tags: string[];
}

export const productService = {
  getProducts: (active?: boolean) =>
    http.get<ProductDto[]>("/backoffice/products", {
      params: active !== undefined ? { active } : {},
    }),

  toggleProductActive: (id: string) => http.patch<void>(`/backoffice/products/${id}/active`),

  createProduct: (payload: CreateProductRequest) =>
    http.post<ProductDto>("/backoffice/products", payload),

  getCoverages: () => http.get<CoverageOption[]>("/backoffice/products/coverages"),

  getTags: () => http.get<TagOption[]>("/backoffice/products/tags"),

  getProduct: (id: string) => http.get<ProductDto>(`/backoffice/products/${id}`),

  updateProduct: (id: string, payload: UpdateProductRequest) =>
    http.put<void>(`/backoffice/products/${id}`, payload),
};
