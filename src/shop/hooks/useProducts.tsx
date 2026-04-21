// Se crea un hook porque se ocupara en varios lados mostrar los productos

import { useQuery } from "@tanstack/react-query"
import { getProductsAction } from "../actions/get-products.action"

export const useProducts = () => {
    // TODO: Lógica


    
    return useQuery({
        queryKey: ['products'],
        queryFn: getProductsAction,
    })
}
