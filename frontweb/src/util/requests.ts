// process.env.REACT_APP_BACKEND_URL - configurar a váriavel de ambiente onde a aplicação vai rodar
// process é do node, env(acessar onde a aplicação está rodando)
// REACT_APP_BACKEND_URL - nome compativel com o netlify
// ?? - operador de coalescência 
export const BASE_URL = process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:8080';

