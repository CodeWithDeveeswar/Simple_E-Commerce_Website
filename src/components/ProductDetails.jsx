import { useParams } from "react-router-dom";
import products from "../data/products.json";

function ProductDetails() {
  const { id } = useParams();

  const product = products.find((item) => item.id === Number(id));

  return (
    <div className="p-10">
      <img
        src={product.img}
        alt={product.name}
        className="w-96 h-96 object-contain"
      />

      <h1 className="text-2xl font-bold">{product.name}</h1>

      <p className="text-xl">{product.description}</p>
    </div>
  );
}

export default ProductDetails;
