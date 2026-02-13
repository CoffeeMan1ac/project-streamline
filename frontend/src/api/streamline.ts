import { http } from "./http";

export type Product = {
  id: string;
  baseRate: number;
  name: string;
  description?: string | null;
  mostPopular: boolean;
  coverage?: string[] | null;
  exclusions?: string[] | null;
  startDate: string;
  endDate?: string | null;
  active: boolean;
};

export type EvaluationResult = {
  status: string;
  reason: string;
  rulesApplied: string[];
  premium: number;
  processingTimeMs: number;
};

export const streamlineApi = {
  getProducts: async () => {
    const res = await http.get<Product[]>("/products");
    return res.data;
  },

  createQuote: async (payload: Record<string, unknown>) => {
    const res = await http.post<EvaluationResult>("/quotes", payload);
    return res.data;
  },
};
