import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

function AppleProducts({ cart = [], setCart }) {

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

      return "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?q=80&w=1200";

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

    setCart([...updatedCart]);

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

    setCart([...updatedCart]);

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

    setCart([...updatedCart]);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  /* ================= PRODUCTS ================= */

  const appleProducts = products.filter((p) => {

    const category =
      String(p.category || "")
        .toLowerCase()
        .trim();

    return category === "apple";
  });

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
            url("/macbook.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >

        <div className="desktop-overlay">

          <div className="desktop-hero-content">

            <span className="desktop-badge">
              PREMIUM APPLE COLLECTION
            </span>

            <h1>
              Apple Premium <br />
              Devices
            </h1>

            <p>
              Explore MacBooks, iMacs and premium
              Apple accessories with elegant design.
            </p>

          </div>

        </div>

      </section>

      {/* ================= BREADCRUMB ================= */}

      <div className="desktop-breadcrumb">
        HOMEPAGE › APPLE PRODUCTS
      </div>

      {/* ================= CATEGORY SECTION ================= */}

      <section className="desktop-category-section">

        {/* MACBOOK */}

        <div className="desktop-category-card">

          <img
            src="/macbook.jpg"
            alt="macbook"
          />

          <div className="desktop-category-content">

            <h3>MacBooks</h3>

            <p>
              Powerful Apple laptops
              for creators and professionals.
            </p>

          </div>

        </div>

        {/* IMAC */}

        <div className="desktop-category-card">

          <img
            src="/imac.webp"
            alt="imac"
          />

          <div className="desktop-category-content">

            <h3>iMac</h3>

            <p>
              Elegant all-in-one desktops
              with stunning displays.
            </p>

          </div>

        </div>

        {/* ACCESSORIES */}

        <div className="desktop-category-card">

          <img
            src="/accesoriesimage.jpg"
            alt="accessories"
          />

          <div className="desktop-category-content">

            <h3>Accessories</h3>

            <p>
              Premium original Apple
              accessories and add-ons.
            </p>

          </div>

        </div>

      </section>

      {/* ================= PRODUCTS ================= */}

      <section className="desktop-products-section">

        <div className="desktop-title-wrap">

          <h2>
            Our Apple Products
          </h2>

          <p>
            Explore premium Apple devices
            built for performance and creativity.
          </p>

        </div>

        <div className="desktop-product-grid">

          {appleProducts.map((p) => (

            <div
              key={p._id}
              className="desktop-product-card"
            >

              {/* TOP TAG */}

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

export default AppleProducts;