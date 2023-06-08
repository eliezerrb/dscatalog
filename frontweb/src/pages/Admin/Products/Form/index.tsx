import { useForm } from 'react-hook-form';
import './styles.css';
import { Product } from 'types/product';
import { requestBackend } from 'util/requests';
import { AxiosRequestConfig } from 'axios';
import { useHistory } from 'react-router-dom';

const Form = () => {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>();

  const onSubmit = (formData: Product) => {
    const data = {
      ...formData,
      imgUrl:
        'https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/1-big.jpg',
      categories: [{ id: 1, name: '' }],
    };

    const config: AxiosRequestConfig = {
      method: 'POST',
      url: '/products',
      data: data,
      withCredentials: true,
    };

    requestBackend(config).then((response) => {
      console.log(response.data);
    });
  };

  const handleCancel = () => {
    history.push('/admin/products');
  };

  return (
    <div className="product-crud-container">
      <div className="base-card product-crud-form-card">
        <h1 className="product-crud-form-title">DADOS DO PRODUTO</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row product-crud-inputs-container">
            <div className="col-lg-6 product-crud-inputs-left-container">
              {/* row, col-lg-6, form-control - bootstrap */}
              <div className="margin-bottom-30">
                <input
                  {...register('name', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  // is-invalid - Estilo boot strap para a caixinha ficar vermelha quando for inválido
                  // `` para permitir colocar expressões do javascript dentro ${}
                  //  expressão condicional se errors.username for verdade inclui o is-invalid
                  className={`form-control base-input ${
                    errors.name ? 'is-invalid' : ''
                  }`}
                  placeholder="Nome do produto"
                  name="name"
                />
                {/*invalid-feedback - Classe do bootstrap */}
                {/*d-block - Classe do bootstrap para ficar com o display block */}
                <div className="invalid-feedback d-block">
                  {errors.name?.message}
                </div>
              </div>

              <div className="margin-bottom-30">
                <input
                  {...register('price', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.price ? 'is-invalid' : ''
                  }`}
                  placeholder="Preço"
                  name="price"
                />

                <div className="invalid-feedback d-block">
                  {errors.price?.message}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div>
                {/*h-auto para utilizar o tamanho que eu passar no rows={10} */}
                <textarea
                  rows={10}
                  {...register('description', {
                    required: 'Campo obrigatório',
                  })}
                  className={`form-control base-input h-auto ${
                    errors.description ? 'is-invalid' : ''
                  }`}
                  placeholder="Descrição"
                  name="description"
                />
                <div className="invalid-feedback d-block">
                  {errors.description?.message}
                </div>
              </div>
            </div>
          </div>
          <div className="product-crud-buttons-container">
            <button
              className="btn btn-outline-danger product-crud-button"
              onClick={handleCancel}
            >
              CANCELAR
            </button>
            <button className="btn btn-primary product-crud-button text-white">
              SALVAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
