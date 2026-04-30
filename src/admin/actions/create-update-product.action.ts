import { tesloApi } from "../../api/tesloApi";
import type { Product } from "../../interfaces/product.interface";
import { sleep } from "../../lib/sleep";

export const createUpdateProductAction = async (productLike: Partial<Product> & { files?: File[] }): Promise<Product> => {

    await sleep(1500);

    const { id, user, images = [], files = [], ...rest } = productLike;

    const isCreating = id === 'new';

    // Transformar a number
    rest.stock = Number(rest.stock || 0);
    rest.price = Number(rest.price || 0);

    // Preparar imagenes
    if (files.length > 0) {
        const newImageName = await uploadFiles(files);
        images.push(...newImageName);
    }

    // Nuevo arreglo para evitar el http y se rompan las imagenes
    const imagesToSave = images.map((image) => {
        if (image.includes('http')) return image.split('/').pop() || ''; // Corta desde el split y devuelve el resto del arreglo
        return image;
    });

    // Se puede usar .patch o .post o solo mandar el objeto
    const { data } = await tesloApi<Product>({
        url: isCreating ? '/products' : `/products/${id}`,
        method: isCreating ? 'POST' : 'PATCH',
        data: { ...rest, images: imagesToSave }

    });

    return {
        ...data,
        images: data.images.map((image) => {
            if (image.includes('http')) return image;
            return `${import.meta.env.VITE_API_URL}/files/product/${image}`;
        })
    };

}

export interface FileUploadResponse {
    secureUrl: string;
    fileName: string;
}

const uploadFiles = async (files: File[]) => {
    const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file); // Asi como viene en la back, es 'file'

        const { data } = await tesloApi<FileUploadResponse>({
            url: '/files/product',
            method: 'POST',
            data: formData
        });

        return data.fileName;

    })

    // Hasta que no terminen de cargar todos
    const uploadFileName = await Promise.all(uploadPromises);

    return uploadFileName;
}