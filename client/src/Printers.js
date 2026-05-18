import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

function Printers({ cart = [], setCart }) {

  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [requirement, setRequirement] = useState("");

  const navigate = useNavigate();

  useEffect(() => {

    axios
      .get("https://silva-tech-backend-pazp.onrender.com/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));

  }, []);

  /* ================= PRODUCTS ================= */

  const printerProducts = products.filter((p) => {

    const sub =
      String(p.subcategory || "")
        .toLowerCase()
        .trim();

    return sub === "printers";
  });

  /* ================= CART ================= */

  const addToCart = (product) => {

    const exist = cart.find(
      (i) => i._id === product._id
    );

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
  };

  /* ================= WHATSAPP ================= */

  const handleSubmit = () => {

    if (!name || !phone) {

      alert("Please fill required fields");
      return;
    }

    const message = `Hello Silva Tech Computer,

Service: Printers

Name: ${name}
Email: ${email}
Phone: ${phone}
Requirement: ${requirement}`;

    const url =
      `https://wa.me/919967863961?text=${encodeURIComponent(message)}`;

    window.location.href = url;
  };

  return (

    <div className="desktop-page">

      {/* HERO */}

      <section
        className="desktop-hero"
        style={{
          background:
            `linear-gradient(
              rgba(0,0,0,0.65),
              rgba(0,0,0,0.55)
            ),
            url("/printerimage.avif")`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >

        <div className="desktop-overlay">

          <div className="desktop-hero-content">

            <span className="desktop-badge">
              PRINTER SOLUTIONS
            </span>

            <h1>
              Premium Printer <br />
              Collection
            </h1>

            <p>
              Explore high-quality printers
              for office and home use.
            </p>

          </div>

        </div>

      </section>

      {/* PRODUCTS */}

      <section className="desktop-products-section">

        <div className="desktop-title-wrap">

          <h2>
            Printer Products
          </h2>

          <p>
            Browse our latest printer collection.
          </p>

        </div>

        <div className="desktop-product-grid">

          {printerProducts.map((p) => (

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
                  src={p.media?.[0]}
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

                      {cart.find(i => i._id === p._id) ? (

                        <div className="qty-box-modern">

                          <button
                            onClick={() => {

                              let updatedCart = cart.map(i =>

                                i._id === p._id

                                  ? {
                                    ...i,
                                    qty: i.qty - 1
                                  }

                                  : i
                              );

                              updatedCart =
                                updatedCart.filter(
                                  i => i.qty > 0
                                );

                              setCart(updatedCart);

                              localStorage.setItem(
                                "cart",
                                JSON.stringify(updatedCart)
                              );
                            }}
                          >
                            -
                          </button>

                          <span>
                            {
                              cart.find(
                                i => i._id === p._id
                              )?.qty
                            }
                          </span>

                          <button
                            onClick={() => addToCart(p)}
                            disabled={
                              cart.find(
                                i => i._id === p._id
                              )?.qty >= Number(p.stock)
                            }
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

      {/* PREMIUM FORM */}

      <section className="service-form-section">

        <div className="service-form-title">

          <h2>
            Get A Quote
          </h2>

          <p>
            Contact us today for premium printer solutions.
          </p>

        </div>

        <div className="service-form-box">

          <div className="service-form-row">

            <input
              type="text"
              placeholder="Your Name *"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

          </div>

          <div className="service-form-row">

            <input
              type="text"
              placeholder="Phone Number *"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
            />

          </div>

          <textarea
            placeholder="Describe your requirement..."
            value={requirement}
            onChange={(e) =>
              setRequirement(e.target.value)
            }
          ></textarea>

          <button onClick={handleSubmit}>
            Submit Request
          </button>

        </div>

      </section>

      <Footer />

    </div>

  );
}

export default Printers;