import { useQuery } from '@tanstack/react-query'
import { getProductByIdAction } from '../actions/get-product-by-id.action'
import type { Product } from '../../interfaces/product.interface';

export const useProduct = (id: string) => {
    const query = useQuery({
        queryKey: ['product', { id }],
        queryFn: () => getProductByIdAction(id),
        retry: false,
        staleTime: 1000 * 60 * 5, // 5 min
        // enabled: !!id, // Hasta que tenga el id se va a disparar la peticion
    });

    // TODO: mutacion
    // const mutation = useMutation(); // Es como useQuery, viene isLoading, isError, etc.

    // TODO: por eliminar
    const handleSubmitForm = async (productLike: Partial<Product>) => { // Partial es una opcion de TS que permite definir todas las propiedades como opcionales
        console.log({ productLike });

    }
    return {
        ...query,
        handleSubmitForm
    }
}
