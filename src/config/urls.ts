export const API_BASE_URL = "https://dummyjson.com";
export const getApiUrl = (endpoint: string) => API_BASE_URL + endpoint;

export const PRODUCTS = getApiUrl("/products");
export const PRODUCTS_SEARCH = getApiUrl("/products/search");
export const PRODUCTS_CATEGORIES = getApiUrl("/products/categories");