// Se crea un hook porque se ocupara en varios lados mostrar los productos

import { useQuery } from "@tanstack/react-query"
import { getProductsAction } from "../actions/get-products.action"
import { useParams, useSearchParams } from "react-router"

export const useProducts = () => {
    // TODO: Lógica
    const { gender } = useParams();
    const [searchParams] = useSearchParams();

    const limit = searchParams.get('limit') || 9; // Si no viene el limite es 9
    const page = searchParams.get('page') || 1; // Si no viene la pagina es de 1
    const sizes = searchParams.get('sizes') || undefined;

    console.log({ sizes });

    // Calcular el offset
    const offset = (Number(page) - 1) * Number(limit);

    const price = searchParams.get('price') || 'any';
    let minPrice = undefined;
    let maxPrice = undefined;

    switch (price) {
        case 'any':
            break;
        case '0-50':
            minPrice = 0;
            maxPrice = 50;
            break;
        case '50-100':
            minPrice = 50;
            maxPrice = 100;
            break;
        case '100-200':
            minPrice = 100;
            maxPrice = 200;
            break;
        case '200+':
            minPrice = 200;
            maxPrice = undefined;
            break;
    };




    return useQuery({
        // Para que TanStack Query sepa que la url del back está cambiando
        //  se le agrega los parametros faltantes
        queryKey: ['products', { offset, limit, sizes, gender, minPrice, maxPrice }],
        queryFn: () => getProductsAction({
            limit: isNaN(+limit) ? 9 : limit,
            offset: isNaN(offset) ? 0 : offset,
            sizes,
            gender,
            minPrice,
            maxPrice
        }),
        staleTime: 1000 * 60 * 5, // Mantener la inf. en caché por 5 seg.
    });
}
