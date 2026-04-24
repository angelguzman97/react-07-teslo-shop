import type { PropsWithChildren } from 'react';
import { RouterProvider } from 'react-router'
import { appRouter } from './app.router'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'sonner';
import { CustomFullScreenLoading } from './components/custom/CustomFullScreenLoading';
import { useAuthStore } from './auth/store/auth.store';

// Toaster nos permite tener componentes para notificaciones. Y debe ser global - viene de sonner

const queryClient = new QueryClient();

// Para que funcione la app, se tiene que crear un provider personalizado.
// Donde se requiere el children dentro de funtional component
const CheckAuthProvider = ({ children }: PropsWithChildren) => {

    const {checkAuthStatus} = useAuthStore();

    // Se mantiene aqui la data, porque cuando el RouterProvider busque al queryClient,
    // pueda encontrarlo en el QueryClientProvider. Ya que si se coloca dentro del contexto
    //  de TesloShopApp, estaria definido mucho antes que el QueryClientProvider.
    const { isLoading } = useQuery({
        queryKey: ['auth'],
        queryFn: checkAuthStatus,
        retry: false, // Se le coloca para que no intente varias veces obtener el token
        refetchInterval: 1000 * 60 * 1.5, // Para que se dispare automaticamente la peticion cada 1.5 hora, para revalidar el token
        refetchOnWindowFocus: true, // Esto es para que el usuario pueda salir un rato de la app y al volver pueda seguir ocupandolo y se actualice el token
    });
    if(isLoading) return <CustomFullScreenLoading/>;

    return children;
}

export const TesloShopApp = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Toaster position='top-right' />
            {/* Custom Provider. */}
            <CheckAuthProvider>
                {/* El RouterProvider pasa primero por el CheckAuthProvider */}
                <RouterProvider router={appRouter} />
            </CheckAuthProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}
