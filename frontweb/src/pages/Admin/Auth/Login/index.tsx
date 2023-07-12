import { Link, useHistory, useLocation } from 'react-router-dom';
import ButtonIcon from 'components/ButtonIcon';
import { useForm } from 'react-hook-form';
import { requestBackendLogin } from 'util/requests';
import { useContext, useState } from 'react';
import { AuthContext } from 'AuthContext';
import { saveAuthData } from 'util/storage';
import { getTokenData } from 'util/token';

import './styles.css';

type CredentialsDTO = {
  username: string;
  password: string;
};

type LocationState = {
  from: string;
};

const Login = () => {
  const location = useLocation<LocationState>();

  const { from } = location.state || { from: { pathname: '/admin' } };

  // Referencia para o contexto global
  const { setAuthContextData } = useContext(AuthContext);

  const [hasError, setHasError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CredentialsDTO>();

  // permite que faça redirecionamento, mudança de rota programaticamente
  const history = useHistory();

  const onSubmit = (formData: CredentialsDTO) => {
    requestBackendLogin(formData)
      .then((response) => {
        // salvando no localStorage
        saveAuthData(response.data);
        setHasError(false);
        setAuthContextData({
          authenticated: true,
          tokenData: getTokenData(),
        });
        history.replace(from);
      })
      .catch((error) => {
        setHasError(true);
        console.log('ERRO', error);
      });
  };

  return (
    <div className="base-card login-card">
      <h1>LOGIN</h1>
      {hasError && (
        <div className="alert alert-danger">Erro ao tentar efetuar o login</div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/*mb-4: Classe bootStrap margin botton 4 espaço abaixo para outro imput*/}
        {/*form-control: Classe bootStrap que coloca borda no imput, largura 100% */}
        <div className="mb-4">
          {/*Controlar pelo react hook "register" form (biblioteca) */}
          <input
            {...register('username', {
              required: 'Campo obrigatório',
              // pattern para informar uma expressão regular para validar e-mail, cpf e etc... */}
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email inválido',
              },
            })}
            type="text"
            // is-invalid - Estilo boot strap para a caixinha ficar vermelha quando for inválido
            // `` para permitir colocar expressões do javascript dentro ${}
            //  expressão condicional se errors.username for verdade inclui o is-invalid
            className={`form-control base-input ${
              errors.username ? 'is-invalid' : ''
            }`}
            placeholder="Email"
            name="username"
          />
          {/*invalid-feedback - Classe do bootstrap */}
          {/*d-block - Classe do bootstrap para ficar com o display block */}
          <div className="invalid-feedback d-block">
            {errors.username?.message}
          </div>
        </div>
        <div className="mb-2">
          <input
            {...register('password', {
              required: 'Campo obrigatório',
            })}
            type="password"
            className={`form-control base-input ${
              errors.password ? 'is-invalid' : ''
            }`}
            placeholder="Password"
            name="password"
          />
          <div className="invalid-feedback d-block">
            {errors.password?.message}
          </div>
        </div>
        <Link to="/admin/auth/recover" className="login-link-recover">
          Esqueci a senha
        </Link>
        <div className="login-submit">
          <ButtonIcon text="Fazer login" />
        </div>
        <div className="signup-container">
          <span className="not-registered">Não tem Cadastro?</span>
          <Link to="/admin/auth/register" className="login-link-register">
            CADASTRAR
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
