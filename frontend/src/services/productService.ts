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
  tags: ProductTagDto[];
  type: ProductTypeDto;
  coverages: CoverageDto[];
  exclusions: CoverageDto[];
  productFields: ProductFieldDto[];
}

export const productService = {
  getProducts: (active?: boolean) =>
    http.get<ProductDto[]>("/backoffice/products", {
      params: active !== undefined ? { active } : {},
    }),

  toggleProductActive: (id: string) => http.patch<void>(`/backoffice/products/${id}/active`),
};
