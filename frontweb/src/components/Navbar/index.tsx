import './styles.css';
import '@popperjs/core';
import 'bootstrap/js/src/collapse';

import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    // bg-primary: cor primária do estilo (bootstrap) personalizado
    // navbar-expand-md: Tamanho médio para frente expanda(bootstrap)
    // offset-md-2: espaço, tamanho médio para frente, deixar duas colunas (bootstrap)
    // collapse navbar-collapse: Menu sumir quando a tela é pequena (bootstrap)
    // navbar-dark ou navbar-light: especificar se a nav é clara ou escura (bootstrap)
    <nav className="navbar navbar-expand-md navbar-dark bg-primary main-nav">
      <div className="container-fluid"> {/* previne quebra de linha entre logo e itens */}
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
              <NavLink to="/" activeClassName="active" exact>HOME</NavLink>
            </li>
            <li>
              <NavLink to="/products" activeClassName="active">CATÁLOGO</NavLink>
            </li>
            <li>
              <NavLink to="/admin" activeClassName="active">ADMIN</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
