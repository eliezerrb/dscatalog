import axios from 'axios';
import Pagination from 'components/Pagination';
import ProductCard from 'components/ProductCard';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from 'types/product';
import { AxiosParams } from 'types/vendor/axios';
import { SpringPage } from 'types/vendor/spring';
import { BASE_URL } from 'util/requests';

import './styles.css';

const Catalog = () => {
  const [page, setPage] = useState<SpringPage<Product>>();

  useEffect(() => {
    const params: AxiosParams = {
      method: 'GET',
      url: `${BASE_URL}/products`,
      params: {
        page: 0,
        size: 12,
      },
    };

    axios(params).then((response) => {
      setPage(response.data);
    });
  }, []);

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

          {/* Para cada elemente do content faça 
            key - exigência do react para informar algo único  */}
          {page?.content.map((product) => (
            <div className="col-sm-6 col-lg-4 col-xl-3" key={product.id}>
              <Link to="/products/1">
                <ProductCard product={product} />
              </Link>
            </div>
          ))}

        </div>
        <div className="row">
          <Pagination />
        </div>
      </div>
    </>
  );
};

export default Catalog;
