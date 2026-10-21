import { useState } from "react";
import products from "../data/products.json";
import { Link } from "react-router-dom";

function Product({ setCart, search }) {
  const [category, setCategory] = useState("All");

  const addToCart = (product) => {
    setCart((previous) => {
      const existingProduct = previous.find((item) => item.id === product.id);

      if (existingProduct) {
        return previous.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...previous, { ...product, quantity: 1 }];
    });
  };

  const filterProducts = products.filter(
    (product) =>
      (category === "All" || product.category === category) &&
      (product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.price.toString().includes(search)),
  );

  return (
    <>
      <div className="flex justify-center gap-3 my-5">
        {["All", "Phone", "Watch", "Laptop"].map((item) => (
          <button
            key={item}
            className={`px-5 py-2 rounded ${category === item ? "bg-blue-600 text-white" : "bg-gray-300"}`}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-2">
        {filterProducts.length > 0 ? (
          filterProducts.map((product) => (
            <div key={product.id} className="border rounded-lg p-4 mt-5">
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-48 object-contain"
              />

              <h3 className="text-sm text-gray-500 font-semibold">
                {product.name}
              </h3>

              <p>₹{product.price}</p>

              <button
                className="mt-4 w-full bg-black text-white py-2 rounded"
                onClick={() => addToCart(product)}
              >
                Add to cart
              </button>

              <Link
                to={`/product-details/${product.id}`}
                className="mt-2 bg-blue-600 w-full block py-2 text-white text-center rounded"
              >
                View Details
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-xl font-bold mt-10">
            No Products Found
          </p>
        )}
      </div>
    </>
  );
}

export default Product;
