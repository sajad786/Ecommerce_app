import {
    PRODUCTS,
    PRODUCTS_SEARCH,
    PRODUCTS_CATEGORIES
} from "@/config/urls";
import { apiGet } from "@/utils/utils";

export function getProducts(query = "") {
    return apiGet(PRODUCTS + query);
}

export function searchProducts(query = "") {
    return apiGet(PRODUCTS_SEARCH + query);
}

export function getCategories() {
    return apiGet(PRODUCTS_CATEGORIES);
}

export function getProductsByCategory(category: string, query = "") {
    return apiGet(`${PRODUCTS}/category/${category}${query}`);
}
