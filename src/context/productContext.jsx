/* 
*Context API 
*Uygulamada birden çok bileşenin ihtiyacı olan verileri bileşenlerden bağımsız bir şekilde konumlanan merkezde yönetmeye yarar

*Context yapısı içerisinde verilerin state ini ve verileri değiştirmeye yarayan fonksiyonları tutabilir

*Context , tuttuğumuz state leri bileşenlere doğrudan aktarabilen state yönetim aracıdır
*/

import { createContext, useEffect } from "react";
import { useState } from "react";
import api from "../utils/api";

// 1- Context yapısının temelini oluştur
export const ProductContext = createContext();

// 2- Verileri bileşenlere aktaracak olan sağlayıcıyı ve onun tuttuğu verileri tanımlama
export function ProductProvider({ children }) {
  const [products, setProducts] = useState();

  //gösterilecek kategorinin verisi
  const [selectedCategory, setSelectedCategory] = useState("all");
  // hangi adrese istek atılacağını belirle
  useEffect(() => {
    const url =
      selectedCategory === "all"
        ? "/products"
        : `/products/category/${selectedCategory}`;
    api.get(url).then((res) => setProducts(res.data));
  }, [selectedCategory]);

  // 3- Sağlayıcı fonksiyonları mutlaka Provider ı return etmeli ve App i sarmalamalı

  //* value olarak eklenen değerler projedeki bileşenler tarafından erişilebilir olur

  return (
    <ProductContext.Provider
      value={{ products, selectedCategory, setSelectedCategory }}
    >
      {children}
    </ProductContext.Provider>
  );
}
