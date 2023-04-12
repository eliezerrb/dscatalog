import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import history from './history';

type LoginResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  userFirstName: string;
  userId: number;
};

// process.env.REACT_APP_BACKEND_URL - configurar a váriavel de ambiente onde a aplicação vai rodar
// process é do node, env(acessar onde a aplicação está rodando)
// REACT_APP_BACKEND_URL - nome compativel com o netlify
// ?? - operador de coalescência
export const BASE_URL =
  process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:8080';

const tokenKey = 'authData';

// usado no login
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID ?? 'dscatalog';
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_ID ?? 'dscatalog123';

// window.btoa - base64 javaScript para gerar o hash

type LoginData = {
  username: string;
  password: string;
};

export const requestBackendLogin = (loginData: LoginData) => {
  // headers - tem que ser esse nome, pois é os parametros do Axios "AxiosRequestConfig"
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Basic ' + window.btoa(CLIENT_ID + ':' + CLIENT_SECRET),
  };

  // qs - biblioteca
  // função stringify gera o urlencoded equivalente ao obj
  // ... expred operator para já aproveitar o valor que vem no tipo loginData
  const data = qs.stringify({
    ...loginData,
    grant_type: 'password',
  });

  //  não precisa colocar a assim data: data (no javaScript quando o nome do atributo for igual a variavel ele já entende)
  return axios({
    method: 'POST',
    baseURL: BASE_URL,
    url: 'oauth/token',
    data,
    headers,
  });
};

export const requestBackend = (config: AxiosRequestConfig) => {
  const headers = config.withCredentials
    ? {
        // pega o que já tinha e acrescenta o Authorization
        ...config.headers,
        Authorization: 'Bearer ' + getAuthData().access_token,
      }
    : config.headers;

  return axios({ ...config, baseURL: BASE_URL, headers });
};

// Função para alvar o LoginResponse
export const saveAuthData = (obj: LoginResponse) => {
  localStorage.setItem(tokenKey, JSON.stringify(obj));
};

export const getAuthData = () => {
  // ?? "{} - se for null vai ter um obj vazio (string) no str
  const str = localStorage.getItem(tokenKey) ?? '{}';
  // converter de string para obj e garantindo que vai ser do tipo loginResponse (fazendo um casting com o as)
  return JSON.parse(str) as LoginResponse;
};


// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  console.log('INTERCEPTOR ANTES DA REQUISIÇÃO');
  return config;
}, function (error) {
  // Do something with request error
  console.log('ERRO NA REQUISIÇÃO');
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  if (error.response.status === 401 || error.response.status === 403){
    history.push('/admin/auth');
  }
  return Promise.reject(error);
});


