import { useForm, Controller } from 'react-hook-form';
import './styles.css';
import { Product } from 'types/product';
import { requestBackend } from 'util/requests';
import { AxiosRequestConfig } from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { Category } from 'types/category';
import CurrencyInput from 'react-currency-input-field';
import { toast } from 'react-toastify';

type UrlParams = {
  productId: string;
};

const Form = () => {
  // Capturar parâmetros de URL
  const { productId } = useParams<UrlParams>();

  // Se o parâmetros de URL for diferente de create então está editando
  const isEditing = productId !== 'create';

  const history = useHistory();

  const [selectCategories, setSelectCategories] = useState<Category[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<Product>();

  useEffect(() => {
    requestBackend({ url: '/categories' }).then((response) => {
      //.content porque a busca é paginada
      setSelectCategories(response.data.content);
    });
  }, []);

  // Para carregar os dados no formulário de acordo com o id passado na URL
  useEffect(() => {
    if (isEditing) {
      requestBackend({ url: `/products/${productId}` }).then((response) => {
        const product = response.data as Product;

        setValue('name', product.name);
        setValue('price', product.price);
        setValue('description', product.description);
        setValue('imgUrl', product.imgUrl);
        setValue('categories', product.categories);
      });
    }
  }, [isEditing, productId, setValue]);

  const onSubmit = (formData: Product) => {
    // Para converter a virgula por ponto, pois o backend só aceita ponto
    const data = {
      ...formData,
      price: String(formData.price).replace(',', '.'),
    };

    const config: AxiosRequestConfig = {
      method: isEditing ? 'PUT' : 'POST',
      url: isEditing ? `/products/${productId}` : '/products',
      data: data,
      withCredentials: true,
    };

    requestBackend(config)
    .then(() => {
      toast.info('Produto cadastrado com sucesso');
      history.push('/admin/products');
    })
    .catch(() => {
      toast.error('Erro ao cadastrar produto');
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
                  data-testid="name"
                />
                {/*invalid-feedback - Classe do bootstrap */}
                {/*d-block - Classe do bootstrap para ficar com o display block */}
                <div className="invalid-feedback d-block">
                  {errors.name?.message}
                </div>
              </div>

              <div className="margin-bottom-30">
                {/*label só foi utilizado para pegar o conteudo do componente select no teste */}
                {/*d-none - classe do bootStrap para não aparecer o texto Categorias do label*/}
                <label htmlFor="categories" className="d-none">Categorias</label>
                <Controller
                  name="categories"
                  rules={{ required: true }}
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={selectCategories}
                      classNamePrefix="product-crud-select"
                      isMulti
                      getOptionLabel={(category: Category) => category.name}
                      getOptionValue={(category: Category) =>
                        String(category.id)
                      }
                      inputId="categories"
                    />
                  )}
                />
                {errors.categories && (
                  <div className="invalid-feedback d-block">
                    Campo obrigatório
                  </div>
                )}
              </div>

              <div className="margin-bottom-30">
                <Controller
                  name="price"
                  rules={{ required: 'Campo obrigatório' }}
                  control={control}
                  render={({ field }) => (
                    // CurrencyInput da biblioteca react-currency-input-field - tratando o decimal
                    <CurrencyInput
                      placeholder="Preço"
                      className={`form-control base-input ${
                        errors.price ? 'is-invalid' : ''
                      }`}
                      //Desabilitar ponto do milhar
                      disableGroupSeparators={true}
                      value={field.value}
                      // Evento de quando mudar a digitação do imput
                      onValueChange={field.onChange}
                      data-testid="price"
                    />
                  )}
                />
                <div className="invalid-feedback d-block">
                  {errors.price?.message}
                </div>
              </div>

              <div className="margin-bottom-30">
                <input
                  {...register('imgUrl', {
                    required: 'Campo obrigatório',
                    // pattern para informar uma expressão regular para validar e-mail, cpf e etc... */}
                    pattern: {
                      value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm,
                      message: 'Deve ser uma Url válida',
                    },
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.name ? 'is-invalid' : ''
                  }`}
                  placeholder="Url da imagem do produto"
                  name="imgUrl"
                  data-testid="imgUrl"
                />
                {/*invalid-feedback - Classe do bootstrap */}
                {/*d-block - Classe do bootstrap para ficar com o display block */}
                <div className="invalid-feedback d-block">
                  {errors.imgUrl?.message}
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
                  data-testid="description"
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
