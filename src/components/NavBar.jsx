import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function NavBar({ cart, search, setSearch }) {
  const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {location.pathname !== "/" && location.pathname !== "/login" && (
        <nav className="bg-white shadow-md px-5 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <h2 className="text-2xl font-bold text-blue-600">MyStore</h2>

            <div className="hidden md:flex items-center gap-8">
              <Link to="" className="hover:text-blue-600 font-medium">
                Home
              </Link>

              <Link to="/product" className="hover:text-blue-600 font-medium">
                Product
              </Link>

              <Link to="/cart" className="hover:text-blue-600 font-medium">
                Cart {cartQuantity}
              </Link>

              <input
                type="text"
                placeholder="Search Product.."
                onChange={(e) => setSearch(e.target.value)}
                className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              className="text-2xl md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? "X" : "☰"}
            </button>
          </div>

          {menuOpen && (
            <div className="mt-4 flex flex-col gap-4 md:hidden">
              <Link
                to=""
                className="hover:text-blue-600 font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>

              <Link
                to="/product"
                className="hover:text-blue-600 font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Product
              </Link>

              <Link
                to="/cart"
                className="hover:text-blue-600 font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Cart {cartQuantity}
              </Link>

              <input
                type="text"
                placeholder="Search Product.."
                onChange={(e) => setSearch(e.target.value)}
                className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
        </nav>
      )}
    </>
  );
}

export default NavBar;
