export const sleep = (ms: number = 1000) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// Tiempo de espera de respuesta