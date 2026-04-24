import { create } from 'zustand'
import type { User } from '../../interfaces/user.interface';
import { loginAction } from '../actions/login.action';
import { checkAuthAction } from '../actions/check-auth.action';

type AuthStatus = 'authenticated' | 'not-authenticated' | 'checking';

type AuthState = {
    // Properties
    user: User | null;
    token: string | null;
    authStatus: AuthStatus;

    // Getters
    isAdmin: () => boolean;

    // Actions
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    checkAuthStatus: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
    //    Implementacion del store. Con valores iniciales
    user: null,
    token: null,
    authStatus: 'checking',

    // Impl. Getters
    isAdmin: () => {
        const roles = get().user?.roles || [];
        return roles.includes('admin');
    },

    // Impl. Actions
    login: async (email: string, password: string) => {
        console.log({ email, password });


        try {
            const data = await loginAction(email, password);
            // Si sale bien se guarda el token en el localStorage
            localStorage.setItem('token', data.token);

            // Grabar la inf. en el estado. Para ello se ocupa el set
            set({ user: data.user, token: data.token, authStatus: 'authenticated' }); // Se guarda el user y el token
            return true;

        } catch (error) {
            localStorage.removeItem('token'); // Se borra el token
            set({ user: null, token: null, authStatus: 'not-authenticated' }); // Se guarda null
            return false;
        }
    },
    logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null, authStatus: 'not-authenticated' });
    },
    checkAuthStatus: async () => {
        try {
            const { user, token } = await checkAuthAction();
            set({
                user: user,
                token: token,
                authStatus: 'authenticated',
            });
            return true;
        } catch (error) {
            console.log(error);
            set({
                user: undefined,
                token: undefined,
                authStatus: 'not-authenticated',
            });
            return false;
        }
    },

}));
