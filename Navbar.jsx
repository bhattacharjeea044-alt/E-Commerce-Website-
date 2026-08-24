import { Link } from "react-router-dom";

function Navbar({ cartCount, wishlistCount }) {
  return (
    <nav className="navbar">
      <div className="nav-container">

        <Link to="/" className="logo">
          Shop<span>Zone</span>
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>

          <Link to="/wishlist">
            ❤️ Wishlist
            {wishlistCount > 0 && (
              <span className="badge">{wishlistCount}</span>
            )}
          </Link>

          <Link to="/cart">
            🛒 Cart
            {cartCount > 0 && (
              <span className="badge">{cartCount}</span>
            )}
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
