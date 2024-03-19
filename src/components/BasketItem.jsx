import { useContext } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { BasketContext } from "../context/basketContext";

const BasketItem = ({ product }) => {
  const { addToBasket, removeFromBasket, decreaseAmount } =
    useContext(BasketContext);
  return (
    <div className="d-flex align-items-center gap-3 gap-md-4 bg-black rounded p-3 p-md-4">
      <div className="border bg-white rounded-3">
        <img
          className="object-fit-contain"
          height={80}
          width={80}
          src={product.image}
          alt={product.title}
        />
      </div>

      <div>
        <p className="fw-bold">
          {product.title.length > 20
            ? product.title.slice(0, 20) + "..."
            : product.title}
        </p>
        <p>Kategori: {product.category}</p>
        <p>Reyting: {product.rating.rate}</p>
      </div>

      <div className="d-flex flex-column-reverse flex-md-row gap-3 align-items-center flex-grow-1">
        <div className="bg-dark rounded d-flex gap-2 aligne-items-center">
          <button
            onClick={() => decreaseAmount(product.id)}
            className="btn btn-dark"
          >
            -
          </button>
          <span className="text-warning pt-1">{product.amount}</span>
          <button onClick={() => addToBasket(product)} className="btn btn-dark">
            +
          </button>
        </div>

        <h4 className="flex-grow-1">
          ${product.price.toFixed(0) * product.amount}
        </h4>

        <button
          onClick={() => removeFromBasket(product.id)}
          className="btn btn-dark pb-2 d-none d-md-block"
        >
          <FaRegTrashCan />
        </button>
      </div>
    </div>
  );
};

export default BasketItem;
