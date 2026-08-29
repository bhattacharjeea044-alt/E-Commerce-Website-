import React, { useState } from "react";
import "./Ecommerce.css";

const products = [
  {
    id: 1,
    name: "Smart Watch",
    price: 1499,
    oldPrice: 2999,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
  },
  {
    id: 2,
    name: "White Sneakers",
    price: 1299,
    oldPrice: 2599,
    category: "Fashion",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
  },
  {
    id: 3,
    name: "Laptop Backpack",
    price: 899,
    oldPrice: 1699,
    category: "Bags",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"
  },
  {
    id: 4,
    name: "Wireless Headphones",
    price: 999,
    oldPrice: 1999,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
  },
  {
    id: 5,
    name: "Perfume",
    price: 299,
    oldPrice: 599,
    category: "Beauty",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500"
  },
  {
    id: 6,
    name: "Casual T-Shirt",
    price: 499,
    oldPrice: 999,
    category: "Fashion",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"
  }
];

function Ecommerce() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showAdmin, setShowAdmin] = useState(false);

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart`);
  };

  const toggleWishlist = (product) => {
    if (wishlist.some((item) => item.id === product.id)) {
      setWishlist(wishlist.filter((item) => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "All" || product.category === category;

    return matchSearch && matchCategory;
  });

  return (
    <div className="app">

      {/* HEADER */}
      <header className="header">
        <div className="logo">
          🛍️ <span>ShopEase</span>
        </div>

        <div className="search-box">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Bags">Bags</option>
            <option value="Beauty">Beauty</option>
          </select>

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button>🔍</button>
        </div>

        <div className="header-icons">
          <span>♡ Wishlist ({wishlist.length})</span>
          <span>🛒 Cart ({cart.length})</span>
          <span>👤 Account</span>
        </div>
      </header>

      {/* NAVIGATION */}
      <nav className="nav">
        <button>☰ Categories</button>
        <a href="#home">Home</a>
        <a href="#products">Products</a>
        <a href="#deals">Deals</a>
        <a href="#about">About</a>

        <button
          className="admin-btn"
          onClick={() => setShowAdmin(!showAdmin)}
        >
          ⚙️ {showAdmin ? "User Panel" : "Admin Panel"}
        </button>
      </nav>

      {!showAdmin ? (
        <UserPanel
          products={filteredProducts}
          addToCart={addToCart}
          toggleWishlist={toggleWishlist}
          wishlist={wishlist}
        />
      ) : (
        <AdminPanel products={products} cart={cart} />
      )}
    </div>
  );
}


/* ================= USER PANEL ================= */

function UserPanel({
  products,
  addToCart,
  toggleWishlist,
  wishlist
}) {
  return (
    <main>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-content">
          <p>BIG SUMMER SALE</p>

          <h1>UP TO 50% OFF</h1>

          <h3>On Electronics & Accessories</h3>

          <button>Shop Now</button>
        </div>

        <img
          src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900"
          alt="Headphones"
        />
      </section>


      {/* SERVICES */}
      <section className="services">
        <div>
          🚚
          <h3>Free Delivery</h3>
          <p>Orders above ₹499</p>
        </div>

        <div>
          🔒
          <h3>Secure Payment</h3>
          <p>100% Secure Payment</p>
        </div>

        <div>
          🔄
          <h3>Easy Returns</h3>
          <p>7 Days Return Policy</p>
        </div>

        <div>
          📞
          <h3>24/7 Support</h3>
          <p>Always here to help</p>
        </div>
      </section>


      {/* PRODUCTS */}
      <section className="products-section" id="products">

        <div className="section-title">
          <h2>Featured Products</h2>
          <button>View All</button>
        </div>

        <div className="product-grid">

          {products.map((product) => (
            <div className="product-card" key={product.id}>

              <div className="wishlist">
                <button
                  onClick={() => toggleWishlist(product)}
                >
                  {wishlist.some(
                    (item) => item.id === product.id
                  )
                    ? "❤️"
                    : "♡"}
                </button>
              </div>

              <img
                src={product.image}
                alt={product.name}
              />

              <p className="category">
                {product.category}
              </p>

              <h3>{product.name}</h3>

              <div className="rating">
                ⭐⭐⭐⭐⭐
              </div>

              <div className="price">
                ₹{product.price}
                <del>₹{product.oldPrice}</del>
              </div>

              <button
                className="cart-btn"
                onClick={() => addToCart(product)}
              >
                🛒 Add to Cart
              </button>

            </div>
          ))}

        </div>
      </section>


      {/* DEALS */}
      <section className="deal" id="deals">

        <div>
          <p>LIMITED TIME OFFER</p>
          <h2>Deal of the Day</h2>
          <h1>UP TO 60% OFF</h1>
          <button>Shop Deals</button>
        </div>

        <img
          src="https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=700"
          alt="Shopping"
        />

      </section>


      {/* IMAGE PREVIEW */}
      <section className="preview">

        <h2>Project User & Admin Panel Preview</h2>

        <img
          src="/ecommerce-user-admin.png"
          alt="E-Commerce User and Admin Panel"
        />

      </section>


      {/* FOOTER */}
      <footer id="about">

        <div>
          <h2>ShopEase</h2>
          <p>
            Your one-stop online shopping destination.
          </p>
        </div>

        <div>
          <h3>Customer Service</h3>
          <p>Contact Us</p>
          <p>Returns</p>
          <p>Shipping</p>
        </div>

        <div>
          <h3>Quick Links</h3>
          <p>Home</p>
          <p>Products</p>
          <p>Deals</p>
        </div>

      </footer>

    </main>
  );
}


/* ================= ADMIN PANEL ================= */

function AdminPanel({ products, cart }) {

  return (
    <main className="admin-panel">

      <aside className="sidebar">

        <h2>🛍️ ShopEase</h2>

        <button className="active">
          📊 Dashboard
        </button>

        <button>📦 Products</button>
        <button>🛒 Orders</button>
        <button>👥 Customers</button>
        <button>📂 Categories</button>
        <button>🎟️ Coupons</button>
        <button>📈 Reports</button>
        <button>⭐ Reviews</button>
        <button>⚙️ Settings</button>
        <button>🚪 Logout</button>

      </aside>


      <section className="dashboard">

        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>

          <div>
            👤 Admin
          </div>
        </div>


        {/* STAT CARDS */}
        <div className="stats">

          <div className="stat-card">
            <p>Total Orders</p>
            <h2>1,248</h2>
            <span>↑ 18%</span>
          </div>

          <div className="stat-card">
            <p>Total Sales</p>
            <h2>₹3,24,560</h2>
            <span>↑ 22%</span>
          </div>

          <div className="stat-card">
            <p>Total Customers</p>
            <h2>2,356</h2>
            <span>↑ 15%</span>
          </div>

          <div className="stat-card">
            <p>Total Products</p>
            <h2>{products.length}</h2>
            <span>↑ 10%</span>
          </div>

        </div>


        {/* CHARTS */}
        <div className="charts">

          <div className="chart-card">

            <h2>Sales Overview</h2>

            <div className="bar-chart">

              <div style={{ height: "40%" }}></div>
              <div style={{ height: "60%" }}></div>
              <div style={{ height: "45%" }}></div>
              <div style={{ height: "75%" }}></div>
              <div style={{ height: "55%" }}></div>
              <div style={{ height: "85%" }}></div>
              <div style={{ height: "70%" }}></div>

            </div>

            <div className="months">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
            </div>

          </div>


          <div className="chart-card">

            <h2>Order Status</h2>

            <div className="order-circle">
              1,248
              <small>Total Orders</small>
            </div>

            <div className="status-list">
              <p>🟠 Pending - 312</p>
              <p>🟢 Processing - 420</p>
              <p>🔵 Shipped - 316</p>
              <p>🟣 Delivered - 200</p>
            </div>

          </div>

        </div>


        {/* PRODUCT TABLE */}
        <div className="table-card">

          <div className="table-title">
            <h2>Products</h2>

            <button>Add New Product</button>
          </div>

          <table>

            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {products.map((product) => (

                <tr key={product.id}>

                  <td>
                    <img
                      className="table-img"
                      src={product.image}
                      alt={product.name}
                    />
                  </td>

                  <td>{product.name}</td>

                  <td>{product.category}</td>

                  <td>₹{product.price}</td>

                  <td>45</td>

                  <td>
                    <span className="active-status">
                      Active
                    </span>
                  </td>

                  <td>
                    ✏️ 🗑️
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>


        {/* ORDERS */}
        <div className="table-card">

          <h2>Recent Orders</h2>

          <table>

            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              <tr>
                <td>#ORD1025</td>
                <td>Customer 1</td>
                <td>28 Aug 2026</td>
                <td>₹1,499</td>
                <td>Delivered</td>
              </tr>

              <tr>
                <td>#ORD1024</td>
                <td>Customer 2</td>
                <td>27 Aug 2026</td>
                <td>₹2,699</td>
                <td>Shipped</td>
              </tr>

              <tr>
                <td>#ORD1023</td>
                <td>Customer 3</td>
                <td>26 Aug 2026</td>
                <td>₹899</td>
                <td>Processing</td>
              </tr>

            </tbody>

          </table>

        </div>

      </section>

    </main>
  );
}

export default Ecommerce;
