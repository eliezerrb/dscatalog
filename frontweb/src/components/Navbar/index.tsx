import './styles.css';
import '@popperjs/core';
import { AuthContext } from 'AuthContext';
import 'bootstrap/js/src/collapse';
import { useContext, useEffect } from 'react';

import { Link, NavLink } from 'react-router-dom';
import history from 'util/history';
import {
  getTokenData,
  isAuthenticated,
  removeAuthData,
} from 'util/requests';



const Navbar = () => {


  // Declaração referencia para o contexto global
  const { authContextData, setAuthContextData } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthContextData({
        authenticated: true,
        tokenData: getTokenData(),
      });
    } else {
      setAuthContextData({
        authenticated: false,
      });
    }
  }, [setAuthContextData]);

  const handleLogoutClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // event.preventDefault() - para não haver a navegação do link
    event.preventDefault();
    removeAuthData();
    setAuthContextData({
      authenticated: false,
    });
    history.replace('/');
  };

  return (
    // bg-primary: cor primária do estilo (bootstrap) personalizado
    // navbar-expand-md: Tamanho médio para frente expanda(bootstrap)
    // offset-md-2: espaço, tamanho médio para frente, deixar duas colunas (bootstrap)
    // collapse navbar-collapse: Menu sumir quando a tela é pequena (bootstrap)
    // navbar-dark ou navbar-light: especificar se a nav é clara ou escura (bootstrap)
    <nav className="navbar navbar-expand-md navbar-dark bg-primary main-nav">
      <div className="container-fluid">
        {' '}
        {/* previne quebra de linha entre logo e itens */}
        <Link to="/" className="nav-logo-text">
          <h4>DS Catalog</h4>
        </Link>
        {/* Botão do menu hamburguer */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target=".collapse"
          aria-controls="dscatalog-navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="dscatalog-navbar">
          <ul className="navbar-nav offset-md-2 main-menu">
            <li>
              {/* exact - para desmarcar o home quando estiver em outra página*/}
              {/* activeClassName - Quando estiver na rota aplique o css active*/}
              <NavLink to="/" activeClassName="active" exact>
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink to="/products" activeClassName="active">
                CATÁLOGO
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin" activeClassName="active">
                ADMIN
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="nav-login-logout">
          {authContextData.authenticated ? (
            <>
              <span className="nav-username">{authContextData.tokenData?.user_name}</span>
              <a href="#logout" onClick={handleLogoutClick}>
                LOGOUT
              </a>
            </>
          ) : (
            <Link to="/admin/auth">LOGIN</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
