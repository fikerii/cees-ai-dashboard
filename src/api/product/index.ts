import axios from "axios";

export interface createProductsProps {
  title: string;
  description?: string;
  category?: string;
  price?: number;
  rating?: number;
  stock?: number;
  brand?: string;
  sku?: string;
  tags?: string[];
  weight?: number;
  dimension?: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation?: string;
  availabilityStatus?: string;
  reviews?: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
  }[];
  images?: string[];
}

export interface ProductsProps extends createProductsProps {
  id: number;
}

export interface ProductCategoryProps {
  slug: string;
  name: string;
  url: string;
}

export const getProduct = async () => {
  const response = await axios.get("https://dummyjson.com/products");
  return response.data;
};

export const createProduct = async (data: createProductsProps) => {
  if (data.title === "") {
    throw new Error("Title is required");
  }
  const response = await axios.post("https://dummyjson.com/products/add", data);
  return response.data;
};

export const getProductById = async (product_id: number) => {
  const response = await axios.get("https://dummyjson.com/products/" + product_id);
  return response.data;
};

export const updateProduct = async (data: ProductsProps) => {
  const response = await axios.put("https://dummyjson.com/products/" + data.id, data);
  return response.data;
};

export const deleteProduct = async (product_id: number) => {
  const response = await axios.delete("https://dummyjson.com/products/" + product_id);
  return response.data;
};

export const getProductCategory = async () => {
  const response = await axios.get("https://dummyjson.com/products/categories");
  return response.data;
};
export const getProductCategoryList = async () => {
  const response = await axios.get("https://dummyjson.com/products/category-list");
  return response.data;
};
