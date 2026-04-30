import { tesloApi } from "../../api/tesloApi";
import type { Product } from "../../interfaces/product.interface";
import { sleep } from "../../lib/sleep";

export const createUpdateProductAction = async (productLike: Partial<Product>): Promise<Product> => {

    await sleep(1500);

    const { id, user, images = [], ...rest } = productLike;

    const isCreating = id === 'new';

    // Transformar a number
    rest.stock = Number(rest.stock || 0);
    rest.price = Number(rest.price || 0);

    // Se puede usar .patch o .post o solo mandar el objeto
    const { data } = await tesloApi<Product>({
        url: isCreating ? '/products' : `/products/${id}`,
        method: isCreating ? 'POST' : 'PATCH',
        data: rest

    });

    return {
        ...data,
        images: data.images.map((image) => {
            if (image.includes('http')) return image;
            return `${import.meta.env.VITE_API_URL}/files/product/${image}`;
        })
    };

}