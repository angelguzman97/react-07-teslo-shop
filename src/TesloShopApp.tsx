import { RouterProvider } from 'react-router'
import { appRouter } from './app.router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {Toaster} from 'sonner';

// Toaster nos permite tener componentes para notificaciones. Y debe ser global - viene de sonner

const queryClient = new QueryClient();

export const TesloShopApp = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Toaster position='top-right'/>
            <RouterProvider router={appRouter} />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}
