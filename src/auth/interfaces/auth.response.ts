import type { User } from "../../interfaces/user.interface";

// Funciona para Login, Register, CheckStatus son las mismas respuestas. Back creado por FerHerr
export interface AuthResponse {
    user: User;
    token: string;
}