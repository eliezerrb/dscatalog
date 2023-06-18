import { AxiosRequestConfig } from 'axios';
import Pagination from 'components/Pagination';
import ProductCard from 'components/ProductCard';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from 'types/product';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'util/requests';
import CardLoader from './CardLoader';

import './styles.css';

const Catalog = () => {
  const [page, setPage] = useState<SpringPage<Product>>();
  // Estado para página carregando
  const [isLoading, setIsLoading] = useState(false);

  const getProducts = (pageNumber: number) => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: "/products",
      params: {
        page: pageNumber,
        size: 12,
      }
    };

    setIsLoading(true);
    requestBackend(params)
      .then((response) => {
        setPage(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getProducts(0);
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
          {isLoading ? <CardLoader /> : (
            page?.content.map((product) => (
            <div className="col-sm-6 col-lg-4 col-xl-3" key={product.id}>
              <Link to="/products/4">
                <ProductCard product={product} />
              </Link>
            </div>
          )))}
        </div>
        <div className="row">
          <Pagination 
            pageCount={page ? page.totalPages : 0} 
            range={3} 
            OnChange={getProducts}
            />
        </div>
      </div>
    </>
  );
};

export default Catalog;
