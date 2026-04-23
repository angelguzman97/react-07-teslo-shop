import { create } from 'zustand'
import type { User } from '../../interfaces/user.interface';
import { loginAction } from '../actions/login.action';

type AuthState = {
    // Properties
    user: User | null;
    token: string | null;

    // Getters

    // Actions
    login: (email: string, password: string) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()((set) => ({
    //    Implementacion del store
    user: null,
    token: null,

    // Impl. Actions
    login: async (email: string, password: string) => {
        console.log({email, password});
        

        try {
            const data = await loginAction(email, password);
            // Si sale bien se guarda el token en el localStorage
            localStorage.setItem('token', data.token);

            // Grabar la inf. en el estado. Para ello se ocupa el set
            set({ user: data.user, token: data.token }); // Se guarda el user y el token
            return true;

        } catch (error) {
            localStorage.removeItem('token'); // Se borra el token
            set({ user: null, token: null }); // Se guarda null
            return false;
        }
    }
}));
