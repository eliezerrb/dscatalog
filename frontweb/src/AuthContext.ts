//Estado global com Context API do React

import { createContext } from 'react';
import { TokenData } from 'util/token';

export type AuthContextData = {
  authenticated: boolean;
  tokenData?: TokenData;
};

export type AuthContextType = {
  authContextData: AuthContextData;
  setAuthContextData: (authContextData: AuthContextData) => void;
};

// Criando o contexto global
export const AuthContext = createContext<AuthContextType>({
  authContextData: {
    authenticated: false,
  },
  setAuthContextData: () => null,
});
