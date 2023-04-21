import jwtDecode from 'jwt-decode';
import { getAuthData } from './storage';

export type Role = 'ROLE_OPERATOR' | 'ROLE_ADMIN';

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

// Para testar se o usuário está autenticado
export const isAuthenticated = (): boolean => {
  const tokenData = getTokenData();

  // Se ele for undefined vai dar false devido ao &&
  // Multipliquei por 1000, pois o Date.now() está em milisegundo e o tokenData.exp está em segundo
  return tokenData && tokenData.exp * 1000 > Date.now() ? true : false;
};

// Função que vai dizer se o usuário possui algum role(perfil) que eu passar de argumento
export const hasAnyRoles = (roles: Role[]): boolean => {
  if (roles.length === 0) {
    return true;
  }

  const tokenData = getTokenData();

  if (tokenData !== undefined) {
    // .some - função de alta rodem que testa se algum elemento da lista satisfaz o predicado
    return roles.some((role) => tokenData.authorities.includes(role));
  }

  return false;
};
