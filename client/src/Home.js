import React, {
  useEffect,
  useState,
  useRef
} from "react";

import axios from "axios";

import Footer from "./Footer";

import {
  useNavigate
} from "react-router-dom";

import {
  motion
} from "framer-motion";

function Home({ cart = [], setCart }) {

  const [products, setProducts] = useState([]);
  const [slider, setSlider] = useState([]);
  const [current, setCurrent] = useState(0);

  const navigate = useNavigate();

  const sliderRef = useRef(null);

  /* ================= FETCH ================= */

  useEffect(() => {

    axios.get("https://silva-tech-backend-pazp.onrender.com/products")
      .then(res => setProducts(res.data))
      .catch(console.log);

    axios.get("https://silva-tech-backend-pazp.onrender.com/slider")
      .then(res => setSlider(res.data))
      .catch(console.log);

  }, []);

  /* ================= AUTO SLIDER ================= */

  useEffect(() => {

    const interval = setInterval(() => {

      setCurrent(prev =>
        prev === 2 ? 0 : prev + 1
      );

    }, 4000);

    return () => clearInterval(interval);

  }, []);

  /* ================= SAFE IMAGE ================= */

  const safeImage = (img) => {

    if (
      !img ||
      img.includes("localhost") ||
      img.includes("127.0.0.1") ||
      img.includes("screenshot")
    ) {

      return "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600";

    }

    return img;
  };

  /* ================= FILTER ================= */

  const topProducts = products.filter(
    p => p.isTopSeller
  );

  const comingProducts = products.filter(
    p => p.isComingSoon
  );

  /* ================= CART ================= */

  const getQty = (id) => {

    const item = cart.find(i => i._id === id);

    return item ? item.qty : 0;
  };

  const addToCart = (p) => {

  const exist = cart.find(
    i => i._id === p._id
  );

  /* OUT OF STOCK */

  if (Number(p.stock) <= 0) {

    

    return;
  }

  /* STOCK LIMIT */

  if (
    exist &&
    exist.qty >= Number(p.stock)
  ) {

    alert(
      `Only ${p.stock} items available`
    );

    return;
  }

  if (exist) {

    setCart(cart.map(i =>

      i._id === p._id

        ? {
            ...i,
            qty: i.qty + 1
          }

        : i
    ));

  } else {

    setCart([

      ...cart,

      {
        ...p,
        qty: 1
      }
    ]);
  }
};

  const increase = (p) => {

  const item = cart.find(
    i => i._id === p._id
  );

  if (
    item.qty >= Number(p.stock)
  ) {

    alert(
      `Only ${p.stock} items available`
    );

    return;
  }

  setCart(cart.map(i =>

    i._id === p._id

      ? {
          ...i,
          qty: i.qty + 1
        }

      : i
  ));
};

  const decrease = (p) => {

    const item = cart.find(i => i._id === p._id);

    if (item.qty === 1) {

      setCart(
        cart.filter(i => i._id !== p._id)
      );

    } else {

      setCart(cart.map(i =>
        i._id === p._id
          ? { ...i, qty: i.qty - 1 }
          : i
      ));
    }
  };

  return (

    <motion.div

      className="core-home"

      initial={{
        opacity: 0
      }}

      animate={{
        opacity: 1
      }}

      transition={{
        duration: 1
      }}
    >

      {/* ================= PREMIUM HERO ================= */}

      <motion.section

        className="premium-home-top"

        initial={{
          opacity: 0,
          scale: 0.92,
          y: 50
        }}

        animate={{
          opacity: 1,
          scale: 1,
          y: 0
        }}

        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1]
        }}
      >

        {/* ================= LEFT BANNER ================= */}

        <motion.div

          className="premium-main-banner"

          animate={{
            scale: [1, 1.01, 1]
          }}

          transition={{
            duration: 6,
            repeat: Infinity
          }}

          style={{
            backgroundImage:
              current === 0
                ? "url('/macbook.jpg')"
                : current === 1
                  ? "url('/desktop.jpg')"
                  : "url('/accesories.avif')"
          }}
        >

          <div className="premium-overlay">

            <motion.div

              className="premium-banner-content"

              key={current}

              initial={{
                opacity: 0,
                y: 50
              }}

              animate={{
                opacity: 1,
                y: 0
              }}

              transition={{
                duration: 0.7
              }}
            >

              {current === 0 && (
                <>

                  <span className="premium-badge">
                    APPLE COLLECTION
                  </span>

                  <h1>
                    Premium <br />
                    MacBooks
                  </h1>

                  <p>
                    High performance Apple laptops
                    for creators and professionals.
                  </p>

                  <button
                    className="premium-shop-btn"
                    onClick={() =>
                      navigate("/products/apple")
                    }
                  >
                    Shop MacBooks
                  </button>

                </>
              )}

              {current === 1 && (
                <>

                  <span className="premium-badge">
                    DESKTOP SOLUTIONS
                  </span>

                  <h1>
                    Powerful <br />
                    Desktop PCs
                  </h1>

                  <p>
                    Gaming, office and enterprise
                    desktop solutions.
                  </p>

                  <button
                    className="premium-shop-btn"
                    onClick={() =>
                      navigate("/desktops")
                    }
                  >
                    View Desktops
                  </button>

                </>
              )}

              {current === 2 && (
                <>

                  <span className="premium-badge">
                    ACCESSORIES STORE
                  </span>

                  <h1>
                    Smart <br />
                    Accessories
                  </h1>

                  <p>
                    Premium accessories, peripherals
                    and gadgets for your setup.
                  </p>

                  <button
                    className="premium-shop-btn"
                    onClick={() =>
                      navigate("/accessories")
                    }
                  >
                    Explore Accessories
                  </button>

                </>
              )}

            </motion.div>

          </div>

          {/* ================= ARROWS ================= */}

          <button
            className="hero-arrow left"
            onClick={() =>
              setCurrent(
                current === 0 ? 2 : current - 1
              )
            }
          >
            ❮
          </button>

          <button
            className="hero-arrow right"
            onClick={() =>
              setCurrent(
                current === 2 ? 0 : current + 1
              )
            }
          >
            ❯
          </button>

        </motion.div>

        {/* ================= SIDE BANNERS ================= */}

        <div className="premium-side-banners">

          {/* ACCESSORIES */}

          <motion.div

            className="side-banner pink"

            whileHover={{
              y: -8,
              scale: 1.02
            }}

            onClick={() =>
              navigate("/accessories")
            }
          >

            <div>

              <h2>Accessories</h2>

              <p>
                Premium accessories & gadgets
              </p>

              <button>
                Shop Now
              </button>

            </div>

            <img
              src="/accesories.avif"
              alt=""
            />

          </motion.div>

          {/* SMALL BANNERS */}

          <div className="double-small-banners">

            {/* NETWORK */}

            <motion.div

              className="small-banner"

              whileHover={{
                y: -8,
                scale: 1.03
              }}

              onClick={() =>
                navigate("/network-equipment")
              }
            >

              <div>

                <h3>Networking</h3>

                <button>
                  View Details
                </button>

              </div>

              <img
                src="/networking.jpeg"
                alt=""
              />

            </motion.div>

            {/* PRINTER */}

            <motion.div

              className="small-banner"

              whileHover={{
                y: -8,
                scale: 1.03
              }}

              onClick={() =>
                navigate("/printers")
              }
            >

              <div>

                <h3>Printers</h3>

                <button>
                  View Details
                </button>

              </div>

              <img
                src="/printer.avif"
                alt=""
              />

            </motion.div>

          </div>

        </div>

      </motion.section>

      {/* ================= POPULAR CATEGORIES ================= */}

      <section className="premium-categories-section">

        <motion.h2

          className="premium-title"

          initial={{
            opacity: 0,
            y: 40
          }}

          whileInView={{
            opacity: 1,
            y: 0
          }}

          transition={{
            duration: 0.7
          }}
        >
          Popular Categories
        </motion.h2>

        <div className="premium-category-grid">

          {[
            {
              image: "/tablet.avif",
              title: "Accessories",
              link: "/accessories"
            },

            {
              image: "/desktopimage.jpg",
              title: "Desktops",
              link: "/desktops"
            },

            {
              image: "/laptop.png",
              title: "Laptops",
              link: "/laptops"
            },

            {
              image: "/wifi.webp",
              title: "Networking",
              link: "/network-equipment"
            },

            {
              image: "/printerimage.avif",
              title: "Printers",
              link: "/printers"
            },

            {
              image: "/macbook.jpg",
              title: "Apple Products",
              link: "/products/apple"
            }

          ].map((item, index) => (

            <motion.div

              key={index}

              className="premium-category-card"

              initial={{
                opacity: 0,
                y: 50
              }}

              whileInView={{
                opacity: 1,
                y: 0
              }}

              transition={{
                delay: index * 0.1
              }}

              whileHover={{
                y: -10,
                scale: 1.03
              }}

              onClick={() =>
                navigate(item.link)
              }
            >

              <img
                src={item.image}
                alt=""
              />

              <h3>
                {item.title}
              </h3>

            </motion.div>

          ))}

        </div>

      </section>
      

      {/* ================= TOP SELLERS ================= */}

      <section className="core-section">

        <div className="section-head">

          <h2
            style={{
              color: "#ffffff",
              fontWeight: "700",
              textShadow: "0 0 15px rgba(0,140,255,0.7)"
            }}
          >
            Top Sellers
          </h2>

        </div>

        <div className="core-grid">

          {products
            .filter(p => p.isTopSeller)
            .map((p, index) => (

              <motion.div

                key={p._id}

                className="core-card"

                initial={{
                  opacity: 0,
                  y: 50
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

                <span className="top-tag">
                  TOP SELLER
                </span>

                <img
                  src={safeImage(p.media?.[0])}
                  alt=""
                  onClick={() =>
                    navigate(`/product/${p._id}`)
                  }
                />

                <h3>{p.name}</h3>

                <p className="core-price">
                  ₹{p.price}
                </p>

                {getQty(p._id) > 0 ? (

                  <div className="qty-box-modern">

                    <button onClick={() => decrease(p)}>
                      -
                    </button>

                    <span>
                      {getQty(p._id)}
                    </span>

                    <button onClick={() => increase(p)}>
                      +
                    </button>

                  </div>

                ) : (

                  <button
                    className="add-modern-btn"
                    onClick={() => addToCart(p)}
                  >
                    Add To Cart
                  </button>

                )}

                <button
                  className="view-modern-btn"
                  onClick={() =>
                    navigate(`/product/${p._id}`)
                  }
                >
                  View
                </button>

              </motion.div>

            ))}

        </div>

      </section>

      {/* ================= FEATURED PRODUCTS ================= */}

      <section className="core-section">

        <div className="section-head">
          <h2
            style={{
              color: "#ffffff",
              fontWeight: "700",
              textShadow: "0 0 15px rgba(0,140,255,0.7)"
            }}
          >
            Featured Products
          </h2>
        </div>

        <div className="core-grid">

          {products.slice(0, 8).map((p, index) => (

            <motion.div

              key={p._id}

              className="core-card"

              initial={{
                opacity: 0,
                y: 50
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



              <img
                src={safeImage(p.media?.[0])}
                alt=""
                onClick={() =>
                  navigate(`/product/${p._id}`)
                }
              />

              <h3>{p.name}</h3>

              <p className="core-price">
                ₹{p.price}
              </p>

              {getQty(p._id) > 0 ? (

                <div className="qty-box-modern">

                  <button onClick={() => decrease(p)}>
                    -
                  </button>

                  <span>{getQty(p._id)}</span>

                  <button onClick={() => increase(p)}>
                    +
                  </button>

                </div>

              ) : (

                <button
                  className="add-modern-btn"
                  onClick={() => addToCart(p)}
                >
                  Add To Cart
                </button>

              )}

            </motion.div>

          ))}

        </div>

      </section>
      
      {/* ================= COMING SOON ================= */}

      <section className="core-section">

        <div className="section-head">

          <h2
            style={{
              color: "#ffffff",
              fontWeight: "700",
              textShadow: "0 0 15px rgba(0,140,255,0.7)"
            }}
          >
            Coming Soon
          </h2>

        </div>

        <div className="core-grid">

          {products
            .filter(p => p.isComingSoon)
            .map((p, index) => (

              <motion.div

                key={p._id}

                className="core-card"

                initial={{
                  opacity: 0,
                  y: 50
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

                <span className="coming-tag">
                  COMING SOON
                </span>

                <img
                  src={safeImage(p.media?.[0])}
                  alt=""
                  onClick={() =>
                    navigate(`/product/${p._id}`)
                  }
                />

                <h3>{p.name}</h3>

                <p className="core-price">
                  ₹{p.price}
                </p>

                <button
                  className="view-modern-btn"
                  onClick={() =>
                    navigate(`/product/${p._id}`)
                  }
                >
                  View
                </button>

              </motion.div>

            ))}

        </div>

      </section>

      {/* ================= WHY US ================= */}

      <section className="why-core">

        {[
          {
            title: "⚡ Fast Delivery",
            text: "Quick delivery across Mumbai"
          },

          {
            title: "💯 Genuine Products",
            text: "Trusted authentic products"
          },

          {
            title: "🛠 Expert Support",
            text: "Professional technical support"
          },

          {
            title: "🏢 Corporate Solutions",
            text: "Enterprise-level IT services"
          }

        ].map((item, index) => (

          <motion.div

            key={index}

            className="why-card"

            initial={{
              opacity: 0,
              y: 40
            }}

            whileInView={{
              opacity: 1,
              y: 0
            }}

            transition={{
              delay: index * 0.1
            }}

            whileHover={{
              y: -8,
              scale: 1.03
            }}
          >

            <h3>{item.title}</h3>

            <p>{item.text}</p>

          </motion.div>

        ))}

      </section>

      <Footer />

    </motion.div>
  );
}

export default Home;