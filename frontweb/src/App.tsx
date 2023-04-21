import './assets/styles/custom.scss';
import './App.css';

import Routes from 'Routes';
import { useState } from 'react';
import { AuthContext, AuthContextData } from 'AuthContext';

const App = () => {
  const [authContextData, setAuthContextData] = useState<AuthContextData>({
    authenticated: false,
  });

  return (
    <>
      {/* Provisionar o useState para toda a aplicação - authContextData está disponivel em toda aplicação*/}
      <AuthContext.Provider value={{ authContextData, setAuthContextData }}>
        <Routes />
      </AuthContext.Provider>
    </>
  );
};

export default App;
