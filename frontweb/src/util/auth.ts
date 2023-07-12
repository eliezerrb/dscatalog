import { getTokenData } from './token';
import { Role } from 'types/role';

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
