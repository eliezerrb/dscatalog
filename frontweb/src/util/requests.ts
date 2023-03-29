import axios from 'axios';
import qs from 'qs';

// process.env.REACT_APP_BACKEND_URL - configurar a váriavel de ambiente onde a aplicação vai rodar
// process é do node, env(acessar onde a aplicação está rodando)
// REACT_APP_BACKEND_URL - nome compativel com o netlify
// ?? - operador de coalescência 
export const BASE_URL = process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:8080';


// usado no login
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID ?? 'dscatalog';
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_ID ?? 'dscatalog123';

// window.btoa - base64 javaScript para gerar o hash

type LoginData = {
    username: string;
    password: string;
}

export const requestBackendLogin = (loginData : LoginData) => {

    const headers = {
       'Content-Type': 'application/x-www-form-urlencoded',
       Authorization: 'Basic ' + window.btoa(CLIENT_ID + ':' + CLIENT_SECRET)
    };

    // qs - biblioteca
    // função stringify gera o urlencoded equivalente ao obj
    // ... expred operator para já aproveitar o valor que vem no tipo loginData
    const data = qs.stringify ({
        ...loginData,
        grant_type : 'password'
    });

    return axios({method: 'POST', baseURL: BASE_URL, url:'oauth/token', data, headers});

}