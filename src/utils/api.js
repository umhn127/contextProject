import axios from "axios";

//axios un ayarlarını bizim belirlediğimiz bir örneğini oluşturmaya yarar
const api = axios.create({
  //yapılacak bütün isteklerin başına eklenir (api.get(/.......))
  baseURL: "https://fakestoreapi.com/",
  timeout: 4000,
  timeoutErrorMessage: "İstek zaman aşımına uğradı",
});

export default api;
