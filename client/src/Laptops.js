import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

function Laptops({ cart = [], setCart }) {

  const [products, setProducts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  /* ================= FETCH PRODUCTS ================= */

  useEffect(() => {

    axios
      .get("https://silva-tech-backend-pazp.onrender.com/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));

  }, []);

  /* ================= SAFE IMAGE ================= */

  const safeImage = (img) => {

    if (!img) {

      return "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1200";
    }

    return img;
  };

  /* ================= CART ================= */

  const getQty = (id) => {

    const item = cart.find((i) => i._id === id);

    return item ? item.qty : 0;
  };

  const addToCart = (product) => {

    const exist = cart.find(
      (i) => i._id === product._id
    );

    /* OUT OF STOCK */

    if (Number(product.stock) <= 0) {

      return;
    }

    /* STOCK LIMIT */

    if (
      exist &&
      exist.qty >= Number(product.stock)
    ) {

      return;
    }

    let updatedCart;

    if (exist) {

      updatedCart = cart.map((i) =>

        i._id === product._id

          ? {
            ...i,
            qty: i.qty + 1
          }

          : i
      );

    } else {

      updatedCart = [

        ...cart,

        {
          ...product,
          qty: 1
        }
      ];
    }

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    setShowPopup(true);

    setTimeout(() => {

      setShowPopup(false);

    }, 2500);
  };

  const increase = (product) => {

    const item = cart.find(
      (i) => i._id === product._id
    );

    if (
      item.qty >= Number(product.stock)
    ) {

      return;
    }

    const updatedCart = cart.map((i) =>

      i._id === product._id

        ? {
          ...i,
          qty: i.qty + 1
        }

        : i
    );

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  const decrease = (product) => {

    let updatedCart = cart.map((i) =>

      i._id === product._id

        ? {
          ...i,
          qty: i.qty - 1
        }

        : i
    );

    updatedCart =
      updatedCart.filter(
        (i) => i.qty > 0
      );

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  /* ================= PRODUCTS ================= */

  const laptopProducts = products.filter((p) => {

    const category =
      String(p.category || "")
        .toLowerCase()
        .trim();

    return category === "laptop";
  });

  const gamingProducts = laptopProducts.filter(
    (p) =>
      String(p.subcategory || "")
        .toLowerCase()
        .trim() === "gaming"
  );

  const corporateProducts = laptopProducts.filter(
    (p) =>
      String(p.subcategory || "")
        .toLowerCase()
        .trim() === "corporate"
  );

  const personalProducts = laptopProducts.filter(
    (p) =>
      String(p.subcategory || "")
        .toLowerCase()
        .trim() === "personal"
  );

  /* ================= PRODUCT CARD ================= */

  const renderProducts = (list) => (

    <div className="desktop-product-grid">

      {list.map((p) => (

        <div
          key={p._id}
          className="desktop-product-card"
        >

          {/* TOP SELLER */}

          {p.isTopSeller && (

            <span className="desktop-top-tag">
              TOP SELLER
            </span>

          )}

          {/* COMING SOON */}

          {p.isComingSoon && (

            <span className="coming-tag">
              COMING SOON
            </span>

          )}

          {/* IMAGE */}

          <div className="desktop-product-image">

            <img
              src={safeImage(p.media?.[0])}
              alt={p.name}
              onClick={() =>
                navigate(`/product/${p._id}`)
              }
            />

          </div>

          {/* INFO */}

          <div className="desktop-product-info">

            <h3>{p.name}</h3>

            <p className="desktop-price">
              ₹ {Number(
                p.price || 0
              ).toLocaleString("en-IN")}
            </p>

            {/* BUTTONS */}

            <div className="desktop-btn-group">

              {p.isComingSoon ? (

                <button
                  className="view-modern-btn"
                  onClick={() =>
                    navigate(`/product/${p._id}`)
                  }
                >
                  View
                </button>

              ) : (

                <>

                  {getQty(p._id) > 0 ? (

                    <div className="desktop-qty-box">

                      <button
                        onClick={() => decrease(p)}
                      >
                        -
                      </button>

                      <span>
                        {getQty(p._id)}
                      </span>

                      <button
                        onClick={() => increase(p)}
                      >
                        +
                      </button>

                    </div>

                  ) : (

                    <button
                      className="desktop-add-btn"
                      onClick={() => addToCart(p)}
                    >
                      Add To Cart
                    </button>

                  )}

                  <button
                    className="desktop-view-btn"
                    onClick={() =>
                      navigate(`/product/${p._id}`)
                    }
                  >
                    View
                  </button>

                </>

              )}

            </div>

          </div>

        </div>

      ))}

    </div>

  );

  return (

    <div className="desktop-page">

      {/* ================= HERO ================= */}

      <section
        className="desktop-hero"
        style={{
          background:
            `linear-gradient(
              rgba(0,0,0,0.65),
              rgba(0,0,0,0.55)
            ),
            url("/laptop.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >

        <div className="desktop-overlay">

          <div className="desktop-hero-content">

            <span className="desktop-badge">
              PREMIUM LAPTOP COLLECTION
            </span>

            <h1>
              Modern Laptop <br />
              Solutions
            </h1>

            <p>
              Powerful laptops for gaming,
              business, students and creators.
            </p>

          </div>

        </div>

      </section>

      {/* ================= BREADCRUMB ================= */}

      <div className="desktop-breadcrumb">
        HOMEPAGE › LAPTOPS
      </div>

      {/* ================= CATEGORY SECTION ================= */}

      <section className="desktop-category-section">

        {/* PERSONAL */}

        <div className="desktop-category-card">

          <img
            src="/businesslaptop.jpg"
            alt="personal"
          />

          <div className="desktop-category-content">

            <h3>Personal Laptop</h3>

            <p>
              Affordable laptops for
              study and daily use.
            </p>

          </div>

        </div>

        {/* CORPORATE */}

        <div className="desktop-category-card">

          <img
            src="/corporatelaptop.jpeg"
            alt="corporate"
          />

          <div className="desktop-category-content">

            <h3>Corporate Laptop</h3>

            <p>
              Reliable business-class laptops
              for office work.
            </p>

          </div>

        </div>

        {/* GAMING */}

        <div className="desktop-category-card">

          <img
            src="/gaminglaptop.jpg"
            alt="gaming"
          />

          <div className="desktop-category-content">

            <h3>Gaming Laptop</h3>

            <p>
              High-performance gaming laptops
              for creators and gamers.
            </p>

          </div>

        </div>

      </section>

      {/* ================= PRODUCTS ================= */}

      <section className="desktop-products-section">

        {/* GAMING */}

        <div className="desktop-section-title">
          <h2>🎮 Gaming Laptops</h2>
        </div>

        {renderProducts(gamingProducts)}

        {/* CORPORATE */}

        <div className="desktop-section-title">
          <h2>🏢 Corporate Laptops</h2>
        </div>

        {renderProducts(corporateProducts)}

        {/* PERSONAL */}

        <div className="desktop-section-title">
          <h2>💻 Personal Laptops</h2>
        </div>

        {renderProducts(personalProducts)}

      </section>

      {/* ================= CART POPUP ================= */}

      {showPopup && (

        <div className="desktop-cart-popup">

          <span>
            ✅ Product added to cart
          </span>

          <button
            onClick={() => navigate("/cart")}
          >
            View Cart →
          </button>

        </div>

      )}

      <Footer />

    </div>
  );
}

export default Laptops;