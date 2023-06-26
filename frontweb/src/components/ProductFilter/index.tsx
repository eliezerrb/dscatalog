import { ReactComponent as SearchIcon } from 'assets/images/search-icon.svg';
import './styles.css';
import { Category } from 'types/category';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { requestBackend } from 'util/requests';

export type ProductFilterData = {
  name: string;
  category: Category | null;
};

// Meu componente de listagem vai poder escrever uma função neste evento quando a função rodar
type Props = {
  onSubmitFilter: (data: ProductFilterData) => void;
};

const ProductFilter = ({ onSubmitFilter }: Props) => {
  // Estado que armazena a lista de categorias buscada do backend
  const [selectCategories, setSelectCategories] = useState<Category[]>([]);

  const { register, handleSubmit, setValue, getValues, control } =
    useForm<ProductFilterData>();

  const onSubmit = (formData: ProductFilterData) => {
    onSubmitFilter(formData);
  };

  const handleFormClear = () => {
    setValue('name', '');
    setValue('category', null);
  };

  const handleChangeCategory = (value: Category) => {
    setValue('category', value);

    const obj: ProductFilterData = {
      name: getValues('name'),
      category: getValues('category'),
    };

    onSubmitFilter(obj);
  };

  useEffect(() => {
    requestBackend({ url: '/categories' }).then((response) => {
      //.content porque a busca é paginada
      setSelectCategories(response.data.content);
    });
  }, []);

  return (
    <div className="base-card product-filter-container">
      <form onSubmit={handleSubmit(onSubmit)} className="product-filter-form">
        <div className="product-filter-name-container">
          <input
            {...register('name')}
            type="text"
            // is-invalid - Estilo boot strap para a caixinha ficar vermelha quando for inválido
            // `` para permitir colocar expressões do javascript dentro ${}
            //  expressão condicional se errors.username for verdade inclui o is-invalid
            className="form-control"
            placeholder="Nome do produto"
            name="name"
          />
          <button className="product-filter-search-icon">
            <SearchIcon />
          </button>
        </div>
        <div className="product-filter-bottom-container">
          <div className="product-filter-category-container">
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={selectCategories}
                  isClearable
                  placeholder="Categoria"
                  classNamePrefix="product-filter-select"
                  // Value - valor que mudou (ele espera isso)
                  onChange={(value) => handleChangeCategory(value as Category)}
                  getOptionLabel={(category: Category) => category.name}
                  getOptionValue={(category: Category) => String(category.id)}
                />
              )}
            />
          </div>
          <button
            onClick={handleFormClear}
            className="btn btn-outline-secondary btn-product-filter-clear"
          >
            LIMPAR<span className="btn-product-filter-word">FILTRO</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductFilter;
