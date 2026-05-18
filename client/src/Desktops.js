import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import TechParticles from "./TechParticles";

function Desktops({ cart = [], setCart }) {

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

      return "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=1200";
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

  const desktopProducts = products.filter((p) => {

    const category =
      String(p.category || "")
        .toLowerCase()
        .trim();

    return category === "desktop";
  });

  const gamingProducts = desktopProducts.filter(
    (p) =>
      String(p.subcategory || "")
        .toLowerCase()
        .trim() === "gaming"
  );

  const corporateProducts = desktopProducts.filter(
    (p) =>
      String(p.subcategory || "")
        .toLowerCase()
        .trim() === "corporate"
  );

  const personalProducts = desktopProducts.filter(
    (p) =>
      String(p.subcategory || "")
        .toLowerCase()
        .trim() === "personal"
  );

  /* ================= PRODUCT CARD ================= */

  const renderProducts = (list) => (

    <div className="desktop-product-grid">

      {list.map((p, index) => (

        <motion.div

          key={p._id}

          className="desktop-product-card"

          initial={{
            opacity: 0,
            y: 40
          }}

          whileInView={{
            opacity: 1,
            y: 0
          }}

          transition={{
            delay: index * 0.08
          }}

          whileHover={{
            y: -10
          }}
        >

          {/* TOP SELLER */}

          {p.isTopSeller && (

            <span className="desktop-top-tag">
              TOP SELLER
            </span>

          )}

          {/* COMING SOON */}

          {(String(p.isComingSoon) === "true" ||
            p.isComingSoon === true) && (

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

              {(String(p.isComingSoon) === "true" ||
                p.isComingSoon === true) ? (

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

        </motion.div>

      ))}

    </div>

  );

  return (

    <motion.div

      className="desktop-page"

      initial={{
        opacity: 0,
        y: 40
      }}

      animate={{
        opacity: 1,
        y: 0
      }}

      transition={{
        duration: 0.7
      }}
    >

      {/* ================= HERO ================= */}

      <motion.section

        className="desktop-hero"

        initial={{
          opacity: 0,
          scale: 0.95
        }}

        animate={{
          opacity: 1,
          scale: 1
        }}

        transition={{
          duration: 1
        }}

        style={{
          background:
            `linear-gradient(
              rgba(0,0,0,0.65),
              rgba(0,0,0,0.55)
            ),
            url("/desktopimage.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >

        <div className="desktop-particles">

          <TechParticles />

        </div>

        <div className="desktop-overlay">

          <motion.div

            className="desktop-hero-content"

            initial={{
              opacity: 0,
              y: 50
            }}

            animate={{
              opacity: 1,
              y: 0
            }}

            transition={{
              delay: 0.3,
              duration: 0.8
            }}
          >

            <span className="desktop-badge">
              PREMIUM DESKTOP COLLECTION
            </span>

            <h1>
              Powerful Desktop <br />
              Solutions
            </h1>

            <p>
              High-performance desktops for gaming,
              office work, editing and business use.
            </p>

          </motion.div>

        </div>

      </motion.section>

      {/* ================= BREADCRUMB ================= */}

      <div className="desktop-breadcrumb">
        HOMEPAGE › DESKTOPS
      </div>

      {/* ================= PRODUCTS ================= */}

      <section className="desktop-products-section">

        {/* GAMING */}

        <div className="desktop-section-title">
          <h2>🎮 Gaming Desktops</h2>
        </div>

        {renderProducts(gamingProducts)}

        {/* CORPORATE */}

        <div className="desktop-section-title">
          <h2>🏢 Corporate Desktops</h2>
        </div>

        {renderProducts(corporateProducts)}

        {/* PERSONAL */}

        <div className="desktop-section-title">
          <h2>💻 Personal Desktops</h2>
        </div>

        {renderProducts(personalProducts)}

      </section>

      {/* ================= POPUP ================= */}

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

    </motion.div>
  );
}

export default Desktops;