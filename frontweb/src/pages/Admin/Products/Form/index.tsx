import { useForm } from 'react-hook-form';
import './styles.css';
import { Product } from 'types/product';
import { requestBackend } from 'util/requests';
import { AxiosRequestConfig } from 'axios';

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>();

  const onSubmit = (formData: Product) => {
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: '/products',
      data: formData,
      withCredentials: true,
    };

    requestBackend(config).then((response) => {
      console.log(response.data);
    });
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
                <input type="text" className="form-control base-imput" />
              </div>
              <div>
                <input type="text" className="form-control base-imput" />
              </div>
            </div>
            <div className="col-lg-6">
              <div>
                {/*h-auto para utilizar o tamanho que eu passar no rows={10} */}
                <textarea
                  name=""
                  className="form-control base-imput h-auto"
                  rows={10}
                />
              </div>
            </div>
          </div>
          <div className="product-crud-buttons-container">
            <button className="btn btn-outline-danger product-crud-button">
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
