import axios from 'axios';

const tesloApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// TODO: interceptores
// El use es un middleware es una función que se ejecuta siempre que pasa por la request
tesloApi.interceptors.request.use((config) => {
    // Configuracion minima para la request
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export { tesloApi };