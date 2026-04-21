import { tesloApi } from "../../api/tesloApi"
import type { ProductsResponse } from "../../interfaces/products.response";

// Regresamos de manera estricta una promesa
export const getProductsAction = async (): Promise<ProductsResponse> => {
    const { data } = await tesloApi.get<ProductsResponse>('/products');

    // Crear url de la imagen. Traer un producto implicitamente
    const productsWithImageUrls = data.products.map(product => ({
        ...product, // Regresar los productos
        images: product.images.map(
            image => `${import.meta.env.VITE_API_URL}/files/product/${image}`
        ),
    }));


    return {
        ...data, // Regresar la data (productos)
        products: productsWithImageUrls, //Regresar los productos con la imagen
    };
}