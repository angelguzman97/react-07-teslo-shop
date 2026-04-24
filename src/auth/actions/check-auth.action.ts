import { tesloApi } from "../../api/tesloApi";
import type { AuthResponse } from "../interfaces/auth.response";

// Para verificar el token y mantener viva la sesion

export const checkAuthAction = async (): Promise<AuthResponse> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    try {
        const { data } = await tesloApi.post<AuthResponse>('/auth/check-status', {
            // Colocar en los bearer el token de autorizacion
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        localStorage.setItem('token', data.token);


        return data;

    } catch (error) {
        console.log(error);

        // Se remueve porque sino existe, ya no se verifica el mismo token que ya no es valido
        localStorage.removeItem('token');
        throw new Error('Token expired or not valid');
    }
}