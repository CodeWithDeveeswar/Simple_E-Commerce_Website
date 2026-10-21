import { useState } from "react";
import Cart from "./components/Cart";
import NavBar from "./components/NavBar";
import Product from "./components/Product";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductDetails from "./components/ProductDetails";
import PlaceOrder from "./components/PlaceOrder";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");

  return (
    <div>
      <BrowserRouter>
        <NavBar cart={cart} search={search} setSearch={setSearch} />

        <Routes>
          <Route path="/" element={<Register />} />

          <Route path="/login" element={<Login />} />

          <Route
            path="/product"
            element={<Product setCart={setCart} search={search} />}
          />

          <Route
            path="/cart"
            element={<Cart cart={cart} setCart={setCart} />}
          />

          <Route path="/product-details/:id" element={<ProductDetails />} />

          <Route path="/place-order" element={<PlaceOrder />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
