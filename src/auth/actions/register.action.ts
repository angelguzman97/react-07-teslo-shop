import { tesloApi } from "../../api/tesloApi";
import type { AuthResponse } from "../interfaces/auth.response";

export const registerAction = async (fullName: string, email: string, password: string): Promise<AuthResponse> => {
    const URL_BASE = import.meta.env.VITE_API_URL;
    try {
        const { data } = await tesloApi.post<AuthResponse>(`${URL_BASE}/auth/register`, {
            fullName,
            email,
            password,
        });

        return data;
    } catch (error) {
        throw error;
    }
}