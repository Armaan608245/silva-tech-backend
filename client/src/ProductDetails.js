import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function ProductDetails({ cart = [], setCart }) {

  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  const [current, setCurrent] = useState(0);

  const [modal, setModal] = useState(null);

  const [zoomStyle, setZoomStyle] = useState({});

  const API = "https://silva-tech-backend-pazp.onrender.com";

  useEffect(() => {

    axios
      .get(`${API}/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.log(err));

  }, [id]);

  if (!product) {

    return (
      <h2 style={{ padding: "20px" }}>
        Loading...
      </h2>
    );
  }

  const media = product.media?.length
    ? product.media
    : ["https://via.placeholder.com/400"];

  let startX = 0;

  const handleTouchStart = (e) => {

    startX = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {

    let endX = e.changedTouches[0].clientX;

    if (startX - endX > 50) {

      setCurrent(
        (prev) => (prev + 1) % media.length
      );
    }

    if (endX - startX > 50) {

      setCurrent(
        (prev) =>
          prev === 0
            ? media.length - 1
            : prev - 1
      );
    }
  };

  const handleMouseMove = (e) => {

    const {
      left,
      top,
      width,
      height
    } = e.target.getBoundingClientRect();

    const x =
      ((e.clientX - left) / width) * 100;

    const y =
      ((e.clientY - top) / height) * 100;

    setZoomStyle({

      transformOrigin: `${x}% ${y}%`,

      transform: "scale(1.8)"
    });
  };

  const resetZoom = () => {

    setZoomStyle({
      transform: "scale(1)"
    });
  };

  const addToCart = () => {

    const existing = cart.find(
      i => i._id === product._id
    );

    /* OUT OF STOCK */

    if (Number(product.stock) <= 0) {

      alert("Out Of Stock ❌");

      return;
    }

    /* STOCK LIMIT */

    if (
      existing &&
      existing.qty >= Number(product.stock)
    ) {

      alert(
        `Only ${product.stock} items available`
      );

      return;
    }

    let updatedCart;

    if (existing) {

      updatedCart = cart.map(i =>

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

  return (

    <div style={page}>

      <div style={container}>

        {/* ================= LEFT ================= */}

        <div style={left}>

          <div
            style={slider}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >

            <div
              style={{
                display: "flex",
                transform: `translateX(-${current * 100}%)`,
                transition: "0.4s"
              }}
            >

              {media.map((m, i) => (

                <div
                  key={i}
                  style={zoomBox}
                  onMouseLeave={resetZoom}
                  onClick={() => setModal(m)}
                >

                  {m.includes(".mp4") ? (

                    <video
                      src={m}
                      controls
                      style={mediaStyle}
                    />

                  ) : (

                    <img
                      src={m}
                      alt=""
                      onMouseMove={handleMouseMove}
                      style={{
                        ...mediaStyle,
                        ...zoomStyle
                      }}
                    />

                  )}

                </div>

              ))}

            </div>

          </div>

          {/* DOTS */}

          <div style={dots}>

            {media.map((_, i) => (

              <span
                key={i}
                onClick={() => setCurrent(i)}
                style={{
                  ...dot,
                  background:
                    current === i
                      ? "#2563eb"
                      : "#d1d5db"
                }}
              />

            ))}

          </div>

          {/* THUMBS */}

          <div style={thumbs}>

            {media.map((m, i) => (

              m.includes(".mp4") ? (

                <video
                  key={i}
                  src={m}
                  onClick={() => setCurrent(i)}
                  style={{
                    ...thumb,
                    border:
                      current === i
                        ? "2px solid #2563eb"
                        : "1px solid #ddd"
                  }}
                />

              ) : (

                <img
                  key={i}
                  src={m}
                  alt=""
                  onClick={() => setCurrent(i)}
                  style={{
                    ...thumb,
                    border:
                      current === i
                        ? "2px solid #2563eb"
                        : "1px solid #ddd"
                  }}
                />

              )

            ))}

          </div>

        </div>

        {/* ================= RIGHT ================= */}

        <div style={right}>

          <div style={tagBox}>

            {product.isTopSeller && (
              <span style={topTag}>
                🔥 Top Seller
              </span>
            )}

            {product.isComingSoon && (
              <span style={comingTag}>
                🚀 Coming Soon
              </span>
            )}

            {product.isFeatured && (
              <span style={featuredTag}>
                ⭐ Featured
              </span>
            )}

          </div>

          <h1 style={title}>
            {product.name}
          </h1>

          <h2 style={price}>
            ₹ {product.price}
          </h2>

          <p style={description}>
            {product.description}
          </p>

          {/* ================= SPECS ================= */}

          <div style={specGrid}>

            {product.brand && (
              <div style={specCard}>
                <strong>Brand:</strong>
                <br />
                {product.brand}
              </div>
            )}

            {product.processor && (
              <div style={specCard}>
                <strong>Processor:</strong>
                <br />
                {product.processor}
              </div>
            )}

            {product.ram && (
              <div style={specCard}>
                <strong>RAM:</strong>
                <br />
                {product.ram}
              </div>
            )}

            {product.storage && (
              <div style={specCard}>
                <strong>Storage:</strong>
                <br />
                {product.storage}
              </div>
            )}
            {product.memory && (
              <div style={specCard}>
                <strong>Memory:</strong>
                <br />
                {product.memory}
              </div>
            )}

            {product.color && (
              <div style={specCard}>
                <strong>Color:</strong>
                <br />
                {product.color}
              </div>
            )}

            {product.warranty && (
              <div style={specCard}>
                <strong>Warranty:</strong>
                <br />
                {product.warranty}
              </div>
            )}

            {product.stock && (
              <div style={specCard}>
                <strong>Stock:</strong>
                <br />
                {product.stock}
              </div>
            )}

            {product.emi && (
              <div style={specCard}>
                <strong>EMI:</strong>
                <br />
                {product.emi}
              </div>
            )}

            {product.installation && (
              <div style={specCard}>
                <strong>Installation:</strong>
                <br />
                {product.installation}
              </div>
            )}

            {/* PRINTER */}

            {product.printerType && (
              <div style={specCard}>
                <strong>Printer Type:</strong>
                <br />
                {product.printerType}
              </div>
            )}

            {product.printSpeed && (
              <div style={specCard}>
                <strong>Print Speed:</strong>
                <br />
                {product.printSpeed}
              </div>
            )}

            {product.wireless && (
              <div style={specCard}>
                <strong>Wireless:</strong>
                <br />
                {product.wireless}
              </div>
            )}

            {/* NETWORK */}

            {product.networkSpeed && (
              <div style={specCard}>
                <strong>Network Speed:</strong>
                <br />
                {product.networkSpeed}
              </div>
            )}

            {product.wifiStandard && (
              <div style={specCard}>
                <strong>WiFi Standard:</strong>
                <br />
                {product.wifiStandard}
              </div>
            )}

            {product.coverage && (
              <div style={specCard}>
                <strong>Coverage:</strong>
                <br />
                {product.coverage}
              </div>
            )}

            {/* DSLR */}

            {product.sensorType && (
              <div style={specCard}>
                <strong>Sensor:</strong>
                <br />
                {product.sensorType}
              </div>
            )}

            {product.megapixels && (
              <div style={specCard}>
                <strong>Megapixels:</strong>
                <br />
                {product.megapixels}
              </div>
            )}

            {product.videoQuality && (
              <div style={specCard}>
                <strong>Video:</strong>
                <br />
                {product.videoQuality}
              </div>
            )}

            {/* SPARES */}

            {product.compatibility && (
              <div style={specCard}>
                <strong>Compatibility:</strong>
                <br />
                {product.compatibility}
              </div>
            )}

            {product.spareType && (
              <div style={specCard}>
                <strong>Spare Type:</strong>
                <br />
                {product.spareType}
              </div>
            )}

          </div>

          {/* ================= BUTTONS ================= */}

          <div style={btns}>

            {product.isComingSoon ? (

              <button
                style={{
                  ...buyBtn,
                  width: "100%",
                  background:
                    "linear-gradient(135deg,#2563eb,#7c3aed)",
                  fontSize: "18px",
                  letterSpacing: "1px"
                }}
              >
                🚀 Coming Soon
              </button>

            ) : (

              <>

                {cart.find(i => i._id === product._id) ? (

                  <div className="qty-box-modern">

                    <button
                      onClick={() => {

                        let updatedCart = cart.map(i =>

                          i._id === product._id

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
                          i => i._id === product._id
                        )?.qty
                      }
                    </span>

                    <button
                      onClick={addToCart}
                      disabled={
                        cart.find(
                          i => i._id === product._id
                        )?.qty >= Number(product.stock)
                      }
                    >
                      +
                    </button>

                  </div>

                ) : (

                  <button
                    onClick={addToCart}
                    style={cartBtn}
                  >
                    Add to Cart 🛒
                  </button>

                )}

                <button
                  onClick={() => navigate("/checkout")}
                  style={buyBtn}
                >
                  Buy Now ⚡
                </button>

              </>

            )}

          </div>

        </div>

      </div>

      {/* ================= MODAL ================= */}

      {modal && (

        <div
          style={modalStyle}
          onClick={() => setModal(null)}
        >

          {modal.includes(".mp4") ? (

            <video
              src={modal}
              controls
              autoPlay
              style={modalMedia}
            />

          ) : (

            <img
              src={modal}
              alt=""
              style={modalMedia}
            />

          )}

        </div>

      )}

    </div>
  );
}

/* ================= UI ================= */

const page = {

  minHeight: "100vh",

  padding: "40px",

  background: "#ffffff"
};

const container = {

  display: "flex",

  gap: "40px",

  flexWrap: "wrap",

  maxWidth: "1400px",

  margin: "auto"
};

const left = {

  flex: 1,

  minWidth: "320px"
};

const right = {

  flex: 1,

  minWidth: "320px",

  background: "#fff",

  padding: "30px",

  borderRadius: "18px",

  border: "1px solid #e5e7eb",

  boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
};

const slider = {

  overflow: "hidden",

  borderRadius: "18px",

  border: "1px solid #e5e7eb"
};

const zoomBox = {

  minWidth: "100%",

  display: "flex",

  justifyContent: "center",

  alignItems: "center",

  cursor: "zoom-in",

  background: "#fff"
};

const mediaStyle = {

  width: "100%",

  height: "500px",

  objectFit: "contain",

  background: "#f8fafc",

  transition: "0.2s"
};

const dots = {

  display: "flex",

  justifyContent: "center",

  gap: "8px",

  marginTop: "15px"
};

const dot = {

  width: "12px",

  height: "12px",

  borderRadius: "50%",

  cursor: "pointer"
};

const thumbs = {

  display: "flex",

  gap: "12px",

  marginTop: "15px",

  overflowX: "auto"
};

const thumb = {

  width: "80px",

  height: "80px",

  objectFit: "cover",

  borderRadius: "10px",

  cursor: "pointer"
};

const title = {

  fontSize: "50px",

  fontWeight: "800",

  color: "#0f172a",

  lineHeight: "1.1"
};

const price = {

  marginTop: "15px",

  fontSize: "40px",

  fontWeight: "700",

  color: "#2563eb"
};

const description = {

  marginTop: "20px",

  fontSize: "17px",

  color: "#4b5563",

  lineHeight: "1.8"
};

const specGrid = {

  display: "grid",

  gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",

  gap: "15px",

  marginTop: "30px"
};

const specCard = {

  background: "#f8fafc",

  padding: "18px",

  borderRadius: "16px",

  border: "1px solid #dbeafe",

  color: "#111827",

  lineHeight: "1.8",

  fontSize: "15px"
};

const btns = {

  display: "flex",

  gap: "15px",

  marginTop: "35px"
};

const cartBtn = {

  flex: 1,

  padding: "16px",

  borderRadius: "12px",

  background: "#2563eb",

  color: "#fff",

  border: "none",

  fontWeight: "700",

  cursor: "pointer",

  fontSize: "16px"
};

const buyBtn = {

  flex: 1,

  padding: "16px",

  borderRadius: "12px",

  background: "#111827",

  color: "#fff",

  border: "none",

  fontWeight: "700",

  cursor: "pointer",

  fontSize: "16px"
};

const modalStyle = {

  position: "fixed",

  top: 0,

  left: 0,

  width: "100%",

  height: "100%",

  background: "rgba(0,0,0,0.85)",

  display: "flex",

  justifyContent: "center",

  alignItems: "center",

  zIndex: 9999
};

const modalMedia = {

  maxWidth: "90%",

  maxHeight: "90%",

  borderRadius: "18px"
};

const tagBox = {

  display: "flex",

  gap: "10px",

  marginBottom: "20px",

  flexWrap: "wrap"
};

const topTag = {

  background: "#2563eb",

  color: "#fff",

  padding: "8px 16px",

  borderRadius: "30px",

  fontSize: "13px",

  fontWeight: "700"
};

const comingTag = {

  background: "#15803d",

  color: "#fff",

  padding: "8px 16px",

  borderRadius: "30px",

  fontSize: "13px",

  fontWeight: "700"
};

const featuredTag = {

  background: "#7c3aed",

  color: "#fff",

  padding: "8px 16px",

  borderRadius: "30px",

  fontSize: "13px",

  fontWeight: "700"
};

export default ProductDetails;