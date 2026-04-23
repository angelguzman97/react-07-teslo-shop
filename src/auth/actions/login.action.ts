import { tesloApi } from "../../api/tesloApi"
import type { AuthResponse } from "../interfaces/auth.response"

export const loginAction = async (email: string, password: string): Promise<AuthResponse> => {
    const URL_BASE = import.meta.env.VITE_API_URL;
    // Puede haber errores conexion, credenciales, etc.
    try {
        const { data } = await tesloApi.post<AuthResponse>(`${URL_BASE}/auth/login`, {
            email,
            password
        });
        
        return data;

    } catch (error) {
        console.log(error);
        throw error;
    }
}