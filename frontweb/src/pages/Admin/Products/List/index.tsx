import ProductCrudCard from 'pages/Admin/Products/ProductCrudCard';
import './styles.css';
import { Link } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { SpringPage } from 'types/vendor/spring';
import { Product } from 'types/product';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import Pagination from 'components/Pagination';
import ProductFilter, { ProductFilterData } from 'components/ProductFilter';

// Guardar os dados dos componentes que controlam a listagem (Paginate e a busca) dados dos componentes de controle
type ControlComponentsData = {
  //número da página que está ativa, esse número vem do componente de paginção
  activePage: number;
  FilterData: ProductFilterData;
};

const List = () => {
  const [page, setPage] = useState<SpringPage<Product>>();

  // Vai manter os dados de todos os camponentes que fazem o controle da listagem
  const [controlComponentsData, setControlComponentsData] =
    useState<ControlComponentsData>({
      activePage: 0,
      FilterData: { name: '', category: null },
    });

  // Atualizando o estado que o componente paginate devolveu
  const handlePageChange = (pageNumber: number) => {
    setControlComponentsData({ activePage: pageNumber, FilterData: controlComponentsData.FilterData });
  };

  // Quando alterar um filtro quero voltar para a primeira página
  const handleSubmitFilter = (data: ProductFilterData) => {
    setControlComponentsData({ activePage: 0, FilterData: data });
  };

  // useCallback - se for a mesma referencia da função não chamado de novo - feito para evitar o loop infinito do getProducts
  // dessa forma posso usar a função getProducts aproveitada em outros lugares como no delete
  const getProducts = useCallback(() => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/products',
      params: {
        page: controlComponentsData.activePage,
        size: 3,
        name: controlComponentsData.FilterData.name,
        categoryId: controlComponentsData.FilterData.category?.id
      },
    };

    requestBackend(config).then((response) => {
      setPage(response.data);
    });
  }, [controlComponentsData]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <div className="product-crud-container">
      <div className="product-crud-bar-container">
        {/*btn btn-primary text-white - Classes do bootstrap */}
        <Link to="/admin/products/create">
          <button className="btn btn-primary text-white btn-crud-add">
            ADICIONAR
          </button>
        </Link>
        <ProductFilter onSubmitFilter={handleSubmitFilter} />
      </div>

      <div className="row">
        {page?.content.map((product) => (
          <div key={product.id} className="col-sm-6 col-md-12">
            <ProductCrudCard
              product={product}
              // Para atualizar os produtos, após deletar, padrão observer
              // page.number é o número da página
              onDelete={getProducts}
            />
          </div>
        ))}
      </div>

      <Pagination
        forcePage={page?.number}
        pageCount={page ? page.totalPages : 0}
        range={3}
        OnChange={handlePageChange}
      />
    </div>
  );
};

export default List;
