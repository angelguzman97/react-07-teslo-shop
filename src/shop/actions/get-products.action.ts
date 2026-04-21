import { tesloApi } from "../../api/tesloApi"
import type { ProductsResponse } from "../../interfaces/products.response";

export const getProductsAction = async () => {
    const { data } = await tesloApi.get<ProductsResponse>('/products');

    return data;
}