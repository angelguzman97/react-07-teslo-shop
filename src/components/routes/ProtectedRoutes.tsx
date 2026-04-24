import type { PropsWithChildren } from "react";
import { useAuthStore } from "../../auth/store/auth.store";
import { Navigate } from "react-router";

// Aquí contiene dos tipos de higher order components
export const AuthenticatedRoute = ({ children }: PropsWithChildren) => {
    // Verificar si esta o no esta autenticado
    const { authStatus } = useAuthStore();
    if (authStatus === 'checking') return null;

    // Si no esta autenticado entonces se envia al login
    if (authStatus === 'not-authenticated') return <Navigate to='/auth/login' />

    return children;
}
// Aquí contiene dos tipos de higher order components
export const NotAuthenticatedRoute = ({ children }: PropsWithChildren) => {
    // Verificar si esta o no esta autenticado
    const { authStatus } = useAuthStore();
    if (authStatus === 'checking') return null;

    // Si esta autenticado entonces se envia al home
    if (authStatus === 'authenticated') return <Navigate to='/' />

    return children;
}
// Aquí contiene dos tipos de higher order components
export const AdminRoute = ({ children }: PropsWithChildren) => {
    // Verificar si esta o no esta autenticado
    const { authStatus, isAdmin } = useAuthStore();
    if (authStatus === 'checking') return null;

    // Si no esta autenticado entonces se envia al login
    if (authStatus === 'not-authenticated') return <Navigate to='/auth/login' />

    // Si no es admin se envia al home
    if (!isAdmin()) return <Navigate to='/' />
    return children;
}