import { ReactComponent as ArrowIcon } from 'assets/images/arrow.svg';
import axios from 'axios';
import ProductPrice from 'components/ProductPrice';
import { Link } from 'react-router-dom';
import { Product } from 'types/product';
import { BASE_URL } from 'util/requests';

import './styles.css';

const ProductDetails = () => {
  // FORMA INCORRETA NO COMPONENTE REACT
  let product: Product;

  // FORMA INCORRETA
  axios.get(BASE_URL + "/products/2")
    .then(response => {
      console.log(response.data)
    });

  // row - bootstrap
  // col-xl-6 - bootstrap, a partir de 1200px tela se divide em dois(6 metade de 12)
  return (
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
                src="https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/2-big.jpg"
                alt="Nome do produto"
              />
            </div>
            <div className="name-price-container">
              <h1>Nome do produto</h1>
              <ProductPrice price={2345.67} />
            </div>
          </div>
          <div className="col-xl-6">
            <div className="description-container">
              <h2>Descrição do produto</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Ratione, temporibus!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
