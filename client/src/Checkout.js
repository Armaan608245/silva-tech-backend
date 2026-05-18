import React, { useState } from "react";
import axios from "axios";

function Checkout({ cart, setCart }) {

  const storedUser = JSON.parse(
    localStorage.getItem("user")
  );

  const [form, setForm] = useState({

    name: "",
    phone: "",
    address: "",
    email: storedUser?.email || ""

  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  /* ================= TOTAL ================= */

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.qty,
    0
  );

  /* ================= ORDER ================= */

  const placeOrder = async () => {

    if (cart.length === 0) {

      alert("Cart is empty ❌");

      return;
    }

    if (
      !form.name ||
      !form.phone ||
      !form.address ||
      !form.email
    ) {

      alert(
        "Fill all details including email ❌"
      );

      return;
    }

    try {

      await axios.post(
        "https://silva-tech-backend-pazp.onrender.com/activity",
        {

          customerName: form.name,

          email: form.email,

          phone: form.phone,

          address: form.address,

          type: "order"
        }
      );

    } catch (err) {

      alert("Order saving failed ❌");

      return;
    }

    /* ================= PRODUCT DETAILS ================= */

    const productList = cart.map((item, index) => {

      const itemTotal =
        item.price * item.qty;

      return `
━━━━━━━━━━━━━━

📦 PRODUCT ${index + 1}

🖥 Product Name :
${item.name || "N/A"}

💰 Price :
₹${item.price || 0}

🔢 Quantity :
${item.qty || 1}

💵 Subtotal :
₹${itemTotal}

🎨 Color :
${item.color || "N/A"}

💾 RAM :
${item.ram || "N/A"}

⚡ Processor :
${item.processor || "N/A"}

🖥 Graphics :
${item.graphics || "N/A"}

💽 Storage :
${item.storage || "N/A"}

📺 Display :
${item.display || "N/A"}

🏷 Brand :
${item.brand || "N/A"}

🧩 Category :
${item.category || "N/A"}

📝 Description :
${item.description || "N/A"}

`;

    }).join("\n");

    /* ================= WHATSAPP MESSAGE ================= */

    const message = `
🛒 NEW ORDER RECEIVED

━━━━━━━━━━━━━━

👤 CUSTOMER DETAILS

Name : ${form.name}

Email : ${form.email}

Phone : ${form.phone}

Address :
${form.address}

━━━━━━━━━━━━━━

📦 ORDER ITEMS

${productList}

━━━━━━━━━━━━━━

💰 GRAND TOTAL : ₹${total}

━━━━━━━━━━━━━━
`;

    const phoneNumber = "9082631441";

    const url =
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.location.href = url;

    setCart([]);
  };

  return (

    <div style={page}>

      <div style={container}>

        {/* ================= LEFT ================= */}

        <div style={left}>

          <div style={headingBox}>

            <span style={badge}>
              SECURE CHECKOUT
            </span>

            <h1 style={title}>
              Complete Your Order
            </h1>

            <p style={subtitle}>
              Fill your delivery details to
              place the order successfully.
            </p>

          </div>

          {/* INPUTS */}

          <div style={formBox}>

            <input
              style={input}
              name="name"
              onChange={handleChange}
              placeholder="Full Name"
            />

            <input
              style={input}
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
            />

            <input
              style={input}
              name="phone"
              onChange={handleChange}
              placeholder="Phone Number"
            />

            <textarea
              style={textarea}
              name="address"
              onChange={handleChange}
              placeholder="Delivery Address"
            />

            <button
              style={button}
              onClick={placeOrder}
            >
              Place Order 🚀
            </button>

          </div>

        </div>

        {/* ================= RIGHT ================= */}

        <div style={right}>

          <h2 style={summaryTitle}>
            Order Summary
          </h2>

          {cart.length === 0 ? (

            <p style={emptyText}>
              Your cart is empty
            </p>

          ) : (

            cart.map((item) => (

              <div
                key={item._id}
                style={productCard}
              >

                <img
                  src={
                    item.media?.[0]
                  }
                  alt=""
                  style={productImg}
                />

                <div>

                  <h3 style={productName}>
                    {item.name}
                  </h3>

                  <p style={productQty}>
                    Qty: {item.qty}
                  </p>

                  <p style={productPrice}>
                    ₹ {Number(
                      item.price || 0
                    ).toLocaleString("en-IN")}
                  </p>

                </div>

              </div>

            ))

          )}

          {/* TOTAL */}

          <div style={totalBox}>

            <span>Total</span>

            <strong>
              ₹ {Number(total).toLocaleString("en-IN")}
            </strong>

          </div>

        </div>

      </div>

    </div>
  );
}

/* ================= UI ================= */

const page = {

  minHeight: "100vh",

  background:
    "linear-gradient(to bottom right,#eff6ff,#ffffff)",

  padding: "50px 20px"
};

const container = {

  maxWidth: "1400px",

  margin: "auto",

  display: "flex",

  gap: "40px",

  flexWrap: "wrap"
};

const left = {

  flex: 1,

  minWidth: "340px"
};

const right = {

  width: "420px",

  background: "#ffffff",

  borderRadius: "24px",

  padding: "30px",

  boxShadow:
    "0 15px 40px rgba(0,0,0,0.08)",

  border: "1px solid #dbeafe"
};

const headingBox = {

  marginBottom: "30px"
};

const badge = {

  background: "#2563eb",

  color: "#fff",

  padding: "10px 18px",

  borderRadius: "40px",

  fontSize: "13px",

  fontWeight: "700"
};

const title = {

  fontSize: "54px",

  marginTop: "25px",

  color: "#111827",

  fontWeight: "800",

  lineHeight: "1.1"
};

const subtitle = {

  marginTop: "15px",

  fontSize: "17px",

  color: "#4b5563",

  lineHeight: "1.8"
};

const formBox = {

  background: "#ffffff",

  borderRadius: "24px",

  padding: "35px",

  border: "1px solid #dbeafe",

  boxShadow:
    "0 15px 40px rgba(37,99,235,0.08)"
};

const input = {

  width: "100%",

  padding: "18px",

  borderRadius: "14px",

  border: "1px solid #cbd5e1",

  marginBottom: "20px",

  fontSize: "16px",

  outline: "none",

  color: "#111827",

  boxSizing: "border-box"
};

const textarea = {

  width: "100%",

  padding: "18px",

  borderRadius: "14px",

  border: "1px solid #cbd5e1",

  marginBottom: "20px",

  fontSize: "16px",

  minHeight: "130px",

  outline: "none",

  color: "#111827",

  resize: "none",

  boxSizing: "border-box"
};

const button = {

  width: "100%",

  padding: "18px",

  border: "none",

  borderRadius: "16px",

  background:
    "linear-gradient(135deg,#2563eb,#7c3aed)",

  color: "#fff",

  fontSize: "18px",

  fontWeight: "700",

  cursor: "pointer",

  transition: "0.3s",

  boxShadow:
    "0 12px 30px rgba(37,99,235,0.35)"
};

const summaryTitle = {

  fontSize: "32px",

  color: "#111827",

  marginBottom: "25px",

  fontWeight: "800"
};

const productCard = {

  display: "flex",

  gap: "15px",

  padding: "15px",

  borderRadius: "18px",

  background: "#f8fafc",

  marginBottom: "18px",

  alignItems: "center"
};

const productImg = {

  width: "90px",

  height: "90px",

  objectFit: "cover",

  borderRadius: "14px"
};

const productName = {

  fontSize: "18px",

  color: "#111827",

  fontWeight: "700",

  marginBottom: "8px"
};

const productQty = {

  color: "#6b7280",

  marginBottom: "6px"
};

const productPrice = {

  color: "#2563eb",

  fontWeight: "800",

  fontSize: "18px"
};

const totalBox = {

  marginTop: "30px",

  paddingTop: "20px",

  borderTop: "2px solid #dbeafe",

  display: "flex",

  justifyContent: "space-between",

  alignItems: "center",

  fontSize: "24px",

  fontWeight: "800",

  color: "#111827"
};

const emptyText = {

  color: "#6b7280",

  fontSize: "16px"
};

export default Checkout;