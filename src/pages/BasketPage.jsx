import { useContext } from "react";
import { BasketContext } from "../context/basketContext";
import { Link } from "react-router-dom";
import BasketItem from "../components/BasketItem";

const BasketPage = () => {
  //sepet contextinden sepete eklenen ürün dizisini aldık
  const { basket } = useContext(BasketContext);

  //tolam ürün sayısını hesapla
  const totalAmount = basket.reduce((total, i) => total + i.amount, 0);
  const totalPrice = basket.reduce((total, i) => total + i.amount * i.price, 0);

  //sepette ürün yoksa kullanıcıya bildir
  //her bir ürün için ekrana kart bas
  return (
    <div className="mt-5 pt-5 p-2 ">
      <h1>SEPET</h1>
      <div className="row g-3">
        <div className="col-lg-8">
          <div>
            {basket.length === 0 ? (
              <div className="text-center my-5">
                <p>Öncelikle sepete bir ürün ekleyiniz...</p>
                <Link className="btn btn-info text-light" to="/">
                  Ürünlere Git
                </Link>
              </div>
            ) : (
              basket.map((product) => (
                <BasketItem key={product.id} product={product} />
              ))
            )}
          </div>
        </div>

        <div className="d-flex flex-column gap-4 col-lg-4 bg-dark p-5">
          <h4>
            Toplam Ürün Sayısı:{" "}
            <span className="text-warning"> {totalAmount}</span>
          </h4>
          <h4>
            Toplam Fiyat:{" "}
            <span className="text-warning">${totalPrice.toFixed(2)}</span>
          </h4>

          <form className="d-flex mt-4">
            <input
              className="form-control"
              type="text"
              placeholder="promo kodu giriniz..."
            />
            <button className="btn btn-info">Uygula</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BasketPage;
