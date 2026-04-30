import { useMutation, useQuery } from '@tanstack/react-query'
import { getProductByIdAction } from '../actions/get-product-by-id.action'
import { createUpdateProductAction } from '../actions/create-update-product.action';
import type { Product } from '../../interfaces/product.interface';

export const useProduct = (id: string) => {
    const query = useQuery({
        queryKey: ['product', { id }],
        queryFn: () => getProductByIdAction(id),
        retry: false,
        staleTime: 1000 * 60 * 5, // 5 min
        // enabled: !!id, // Hasta que tenga el id se va a disparar la peticion
    });
    // El query es la funcion que se manda a llamar cuando se quiera hacer la mutacion. Se manda a llamar al montar el componente

    // TODO: mutacion
    // El useMutation no se llama al montar el componente. Este decide en qué momento se manda a llamar
    const productMutation = useMutation({
        mutationFn: createUpdateProductAction,
        onSuccess: (product: Product) => {
            console.log('Producto registrado correctamente', { product });
            // TODO: 
            // Se puede invildar cache, actualizar queryData
        }
    }); // Es como useQuery, viene isLoading, isError, etc.

    // TODO: por eliminar
    // const handleSubmitForm = async (productLike: Partial<Product>) => { // Partial es una opcion de TS que permite definir todas las propiedades como opcionales
    //     console.log({ productLike });
    // }


    return {
        ...query,
        productMutation,
    }
}
