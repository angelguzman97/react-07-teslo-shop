import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getProductByIdAction } from '../actions/get-product-by-id.action'

export const useProduct = (id: string) => {
    const query = useQuery({
        queryKey: ['product', { id }],
        queryFn: () => getProductByIdAction(id),
        retry: false,
        staleTime: 1000 * 60 * 5, // 5 min
        // enabled: !!id, // Hasta que tenga el id se va a disparar la peticion
    });

    // TODO: mutacion

    return {
        ...query
    }
}
