import { useEffect, useState } from "react";
import products from "../data/products.json";
import { Link } from "react-router-dom";

function Product({ setCart, search }) {
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);

  const productPerPage = 3;

  useEffect(() => {
    setPage(1);
  }, [category, search]);

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
        product.price.toString().includes(search)) &&
      product.price >= minPrice &&
      product.price <= maxPrice,
  );

  const start = (page - 1) * productPerPage;
  const currentProducts = filterProducts.slice(start, start + productPerPage);
  const totalPages = Math.ceil(filterProducts.length / productPerPage);

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

      <div className="max-w-xs mx-auto my-5 px-4 py-3 border rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-semibold text-sm">Price Range</h2>
          <span className="text-xs text-gray-500">
            ₹{minPrice.toLocaleString("en-IN")}-₹
            {maxPrice.toLocaleString("en-IN")}
          </span>
        </div>

        <input
          type="range"
          min="0"
          max="100000"
          value={minPrice}
          className="w-full h-1 cursor-pointer"
          onChange={(e) =>
            setMinPrice(Math.min(Number(e.target.value), maxPrice))
          }
        />

        <input
          type="range"
          min="0"
          max="100000"
          value={maxPrice}
          className="w-full h-1 cursor-pointer"
          onChange={(e) =>
            setMaxPrice(Math.max(Number(e.target.value), minPrice))
          }
        />

        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-400">₹0</span>

          <button
            onClick={() => {
              setMinPrice(0);
              setMaxPrice(100000);
            }}
            className="text-xs text-blue-600"
          >
            Reset
          </button>

          <span className="text-xs text-gray-400">₹1,00,000</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-2">
        {filterProducts.length > 0 ? (
          currentProducts.map((product) => (
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

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 my-6">
          <button
            className="bg-black text-white px-4 py-2 rounded disabled:opacity-40"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>

          <span>page {page}</span>

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-40"
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}

export default Product;
