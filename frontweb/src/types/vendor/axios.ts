import { Method } from 'axios';

export type AxiosParams = {
  // Method - sé é get, post, put e etc...  
  // ? - significa que é opcional
  method?: Method;
  url: string;
  data?: object;
  params?: object;
};
