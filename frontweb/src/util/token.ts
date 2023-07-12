import jwtDecode from "jwt-decode";
import { Role } from "types/role";
import { getAuthData } from "./storage";

export type TokenData = {
    exp: number;
    user_name: string;
    authorities: Role[];
};

// Para decodificar o token, retorna TokenData ou undefined se o token for inválido
export const getTokenData = (): TokenData | undefined => {
    try {
        return jwtDecode(getAuthData().access_token) as TokenData;
    } catch (error) {
        return undefined;
    }
};