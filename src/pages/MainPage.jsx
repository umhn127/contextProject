//Context yapılarna abone olmamızı sağlayan hook (useContext)
import { useContext } from "react";

//Abone olamk istediğimiz context yapısı
import { ProductContext } from "../context/productContext";
import Loader from "../components/Loader";
import Card from "../components/Card";

const MainPage = () => {
  //ürünler contextine abone ol
  const { products, selectedCategory } = useContext(ProductContext);

  return (
    <div>
      <h1 className="container  my-5 mt-5 pt-5 p-md-5">{selectedCategory}</h1>

      <div className=" d-flex flex-wrap justify-content-center justify-content-md-between gap-3 gap-md-5 mt-5">
        {!products ? (
          <Loader />
        ) : (
          products.map((item) => <Card key={item.id} product={item} />)
        )}
      </div>
    </div>
  );
};

export default MainPage;
