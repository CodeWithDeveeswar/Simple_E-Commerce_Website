import { useState } from "react";
import { useLocation } from "react-router-dom";

function PlaceOrder() {
  const location = useLocation();
  const { cart, total } = location.state;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const confirmOrder = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-6">Place your order</h1>

      {cart.map((product) => (
        <div key={product.id} className="flex justify-between border-b py-3">
          <p>
            {product.name} x {product.quantity}
          </p>

          <p>₹{product.price * product.quantity}</p>
        </div>
      ))}

      <h2 className="text-xl font-bold text-right mt-4">
        Grand total: ₹{total}
      </h2>

      <div className="border p-5 rounded-lg mb-6">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      </div>

      <form onSubmit={confirmOrder}>
        <h2 className="text-xl font-bold mb-4">Customer Details</h2>

        <input
          type="text"
          placeholder="Enter name"
          className="border p-3 w-full mb-4 rounded"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Enter phone number"
          className="border p-3 w-full mb-4 rounded"
          onChange={(e) => setPhone(e.target.value)}
        />

        <textarea
          placeholder="Enter address"
          className="border p-3 w-full mb-4 rounded"
          onChange={(e) => setAddress(e.target.value)}
        ></textarea>

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded"
        >
          Confirm order
        </button>
      </form>

      {showPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50">
          <div className="bg-white p-8 rounded text-center">
            <div className="text-5xl mb-4">🎉</div>

            <h2 className="text-2xl font-bold">Order Confirmed</h2>

            <p className="mt-2">Thank you, {name}</p>

            <p className="mt-2">your order has been placed successfully</p>

            <button
              onClick={() => setShowPopup(false)}
              className="mt-5 bg-black text-white px-6 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlaceOrder;
