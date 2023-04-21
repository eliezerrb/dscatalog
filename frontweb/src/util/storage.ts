
const tokenKey = 'authData';

type LoginResponse = {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
    userFirstName: string;
    userId: number;
  };

// Função para alvar o LoginResponse
export const saveAuthData = (obj: LoginResponse) => {
    localStorage.setItem(tokenKey, JSON.stringify(obj));
  };
  
  // Função para obter
  export const getAuthData = () => {
    // ?? "{} - se for null vai ter um obj vazio (string) no str
    const str = localStorage.getItem(tokenKey) ?? '{}';
    // converter de string para obj e garantindo que vai ser do tipo loginResponse (fazendo um casting com o as)
    return JSON.parse(str) as LoginResponse;
  };
  
  // Função para remover
  export const removeAuthData = () => {
    localStorage.removeItem(tokenKey);
  }