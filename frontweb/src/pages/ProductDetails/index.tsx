import { ReactComponent as ArrowIcon } from 'assets/images/arrow.svg';
import axios from 'axios';
import ProductPrice from 'components/ProductPrice';
import { type } from 'os';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Product } from 'types/product';
import { BASE_URL } from 'util/requests';

import './styles.css';

type UrlParams = {
  productId: string;
}

const ProductDetails = () => {

  // Capturar parâmetros de URL
  const { productId } = useParams<UrlParams>();


  // product - nome do estado
  // setProduct - função para atualizar o valor do estado
  // Product - tipo do estado
  const [product, setProduct] = useState<Product>();

  // useEffect - () => {} função que você quer executar(executa quando o componente for montado por padrão), depois lista de dependencia(objs para monitorar), pode ser executado novamente quando um dos objs for alterado 
  useEffect(() => {
    axios.get(`${BASE_URL}/products/${productId}`)
    .then((response) => {
      // Atribuindo o resultado do response para o Product com a função setProduct
      setProduct(response.data);
    });
  }, [productId]);

  return (
    // row - bootstrap
    // col-xl-6 - bootstrap, a partir de 1200px tela se divide em dois(6 metade de 12)
    <div className="product-datails-container">
      <div className="base-card product-details-card">
        <Link to="/products">
          <div className="goback-container">
            <ArrowIcon />
            <h2>VOLTAR</h2>
          </div>
        </Link>
        <div className="row">
          <div className="col-xl-6">
            <div className="img-container">
              <img
                // ? - só chama o .name se o obj já foi definido
                src={product?.imgUrl}
                alt={product?.name}
              />
            </div>
            <div className="name-price-container">
              <h1>{product?.name}</h1>
              {/*só renderiza se a váriavel product estiver definida*/}
              {product && <ProductPrice price={product?.price} />}
            </div>
          </div>
          <div className="col-xl-6">
            <div className="description-container">
              <h2>Descrição do produto</h2>
              <p>
                {product?.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
