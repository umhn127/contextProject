import { useLocalStorage } from "@uidotdev/usehooks";
import { createContext } from "react";
import { toast } from "react-toastify";

export const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
  const [basket, setBasket] = useLocalStorage("sepet", []);

  //ÜRÜN EKLEYEN FONKSİYON
  const addToBasket = (newProduct) => {
    //1 bu üründen sepette var mı kontrol et
    const found = basket.find((i) => i.id === newProduct.id);
    if (found) {
      //2 ürün sepette varsa > miktarını artır
      //a- bulunan ürünün miktarını 1 arttır (nesneyi güncelle)
      const updated = { ...found, amount: found.amount + 1 };
      //b- sepet dizisindeki eski ürün yerine güncel halini koy
      const newBasket = basket.map((i) => (i.id === updated.id ? updated : i));
      //c- state güncelle
      setBasket(newBasket);
      toast.success(`Ürünün miktarı arttırıldı (${updated.amount})`);
    } else {
      //3 ürün sepette yoksa > ürünü sepete ekle (miktar 1)
      setBasket(basket.concat({ ...newProduct, amount: 1 }));
      // setBasket([...basket, newProduct]);
      toast.success(`Ürün sepete eklendi`);
    }
  };
  //ÜRÜN KALDIRAN FONKSİYON
  const removeFromBasket = (delete_id) => {
    //silinecek elemanın dışarısında kalnlar ile yeni dizi oluştur
    const filtred = basket.filter((i) => i.id !== delete_id);
    //state i güncelledik
    setBasket(filtred);
    toast.error("Ürün sepetten kaldırıldı");
  };
  //MİKTAR AZALTAN FONKSİYON
  const decreaseAmount = (delete_id) => {
    //1 miktarı azaltılacak olan elemanı sepette bul
    const found = basket.find((i) => i.id === delete_id);

    if (found.amount > 1) {
      //2 miktarı 1 den fazlaa ise > 1 azalt
      //a elemanın güncel nesnesini oluştur
      const updated = { ...found, amount: found.amount - 1 };
      //b dizideki elemanın eski hali yerine güncel halini koy
      const newBasket = basket.map((i) => (i.id === updated.id ? updated : i));
      //c state i güncelle
      setBasket(newBasket);
      toast.info(`Ürünün miktarı azaltıldı (${updated.amount})`);
    } else {
      //3 eğerki miktarı 1 ise > sepetten kaldır
      removeFromBasket(delete_id);
    }
  };

  return (
    <BasketContext.Provider
      value={{ basket, addToBasket, removeFromBasket, decreaseAmount }}
    >
      {children}
    </BasketContext.Provider>
  );
};
