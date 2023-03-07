import Pagination from 'components/Pagination';
import ProductCard from 'components/ProductCard';
import { Link } from 'react-router-dom';
import { Product } from 'types/product';

import './styles.css';

const Catalog = () => {
  // Provisório, buscar da API depois
  const product: Product = {
    id: 2,
    name: 'Smart TV',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    price: 2190.0,
    imgUrl:
      'https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/2-big.jpg',
    date: '2020-07-14T10:00:00Z',
    categories: [
      {
        id: 1,
        name: 'Livros',
      },
      {
        id: 3,
        name: 'Computadores',
      },
    ],
  };

  return (
    <>
      {/* my-4: Mesma coisa de por o padding na vertical(bootstrap) */}
      {/* container: Delimita uma área na esquerda e direita(bootstrap) */}
      {/* row: Permite configurações de layout de grad(bootstrap) */}
      {/* Naturalmente é um card por linha */}
      {/* col-sm-6: Small ≥576px, 6 é a mesma coisa da metade da tela quantidade de colunas, no total do bootstrap é 12(bootstrap) */}
      {/* col-lg-4: Large ≥992px, sempre divide pela quantidade que deseja por linha ex: 12/3=3 são 3 card por linha(bootstrap) */}
      {/* col-xl-3: Extra large ≥1200px, 4 card por linha(bootstrap) */}

      <div className="container my-4 catalog-container">
        <div className="row catalog-title-container">
          <h1>Catálogo de produtos</h1>
        </div>

        <div className="row">
          <div className="col-sm-6 col-lg-4 col-xl-3">
            <Link to="/products/1">
              <ProductCard product={product} />
            </Link>
          </div>
          <div className="col-sm-6 col-lg-4 col-xl-3">
            <Link to="/products/1">
              <ProductCard product={product} />
            </Link>
          </div>
          <div className="col-sm-6 col-lg-4 col-xl-3">
            <Link to="/products/1">
              <ProductCard product={product} />
            </Link>
          </div>
          <div className="col-sm-6 col-lg-4 col-xl-3">
            <Link to="/products/1">
              <ProductCard product={product} />
            </Link>
          </div>
          <div className="col-sm-6 col-lg-4 col-xl-3">
            <Link to="/products/1">
              <ProductCard product={product} />
            </Link>
          </div>
        </div>

        <div className="row">
          <Pagination />
        </div>
      </div>
    </>
  );
};

export default Catalog;
