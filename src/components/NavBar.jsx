import { Link, useLocation } from "react-router-dom";

function NavBar({ cart, search, setSearch }) {
  const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" && location.pathname !== "/login" && (
        <div>
          <nav>
            <div>
              <Link to="">Home </Link>

              <Link to="/product"> Product </Link>

              <Link to="/cart"> Cart {cartQuantity} </Link>

              <input
                type="text"
                placeholder="Search Product.."
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

export default NavBar;
