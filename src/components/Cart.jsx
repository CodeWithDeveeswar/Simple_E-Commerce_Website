import { Link } from "react-router-dom";

function Cart({ cart, setCart }) {
  const increase = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decrease = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  const remove = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <div className="grid lg:grid-cols-3 gap-2">
        {cart.map((product) => (
          <div className="border rounded-lg p-4 mt-5">
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-48 object-contain"
            />

            <p>₹{product.price}</p>

            <h1 className="text-sm text-gray-500 font-semibold">
              {product.name}
            </h1>

            <p>Quantity: {product.quantity}</p>

            <p>Total: ₹{product.price * product.quantity}</p>

            <button
              className="mt-4 mx-3 w-1/4 bg-black text-white py-2 rounded-full"
              onClick={() => increase(product.id)}
            >
              +
            </button>

            <button
              className="mt-4 mx-3 w-1/4 bg-black text-white py-2 rounded-full"
              onClick={() => decrease(product.id)}
            >
              -
            </button>

            <button
              className="mt-4 w-full bg-black text-white py-2 rounded"
              onClick={() => remove(product.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t pt-5 text-right">
        <h2 className="text-xl font-bold">Grand Total: ₹{total}</h2>
      </div>

      <Link
        to="/place-order"
        state={{ cart, total }}
        className="mt-4 bg-green-600 text-white px-6 py-3 rounded"
      >
        Place order
      </Link>
    </>
  );
}

export default Cart;
