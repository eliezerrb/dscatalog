import { Redirect, Route } from 'react-router-dom';
import { isAuthenticated } from 'util/requests';

type Props = {
  children: React.ReactNode;
  path: string;
};

// Vou renderizar o Children que você me informar se tiver autenticado
const PrivateRoute = ({ children, path }: Props) => {
  return (
    <Route
      path={path}
      render={({location}) =>
        isAuthenticated() ? <>{children}</> : <Redirect to={{
          pathname: "/admin/auth/login",
          // permitir redirecionar, após o login para a página protegida que foi chamada
          state: { from:location }
        }} />
      }
    />
  );
};

export default PrivateRoute;
