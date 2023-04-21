import { Redirect, Route } from 'react-router-dom';
import { Role, hasAnyRoles, isAuthenticated } from 'util/requests';

type Props = {
  children: React.ReactNode;
  path: string;
  roles?: Role[]
};

// Vou renderizar o Children que você me informar se tiver autenticado
// Se não informar o roles vai ser igual lista vazia
const PrivateRoute = ({ children, path, roles = [] }: Props) => {
  return (
    <Route
      path={path}
      render={({ location }) =>
        !isAuthenticated() ? (
          <Redirect
            to={{
              pathname: '/admin/auth/login',
              // permitir redirecionar, após o login para a página protegida que foi chamada
              state: { from: location },
            }}
          />
        ) : !hasAnyRoles(roles) ? (
          <Redirect to="/admin/products" />
        ) : (
          <>{children}</>
        )
      }
    />
  );
};

export default PrivateRoute;
