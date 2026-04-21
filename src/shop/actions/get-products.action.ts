import { tesloApi } from "../../api/tesloApi"
import type { ProductsResponse } from "../../interfaces/products.response";

interface Options {
    limit?: number | string;
    offset?: number | string;
}

// Regresamos de manera estricta una promesa
export const getProductsAction = async (options: Options): Promise<ProductsResponse> => {
    const { limit, offset } = options
    const { data } = await tesloApi.get<ProductsResponse>('/products', {
        // Mandar como segundos parametros
        params: {
            limit,
            offset
        }
    });

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