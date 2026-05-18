import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Profile() {
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [user, setUser] = useState(storedUser || {
    firstName: "",
    lastName: "",
    age: "",
    address: {
      city: "",
      street: "",
      pincode: ""
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "city" || name === "street" || name === "pincode") {
      setUser({
        ...user,
        address: {
          ...user.address,
          [name]: value
        }
      });
    } else {
      setUser({
        ...user,
        [name]: value
      });
    }
  };

  const saveProfile = async () => {
  try {
    const dataToSend = {
      firstName: user.firstName,
      lastName: user.lastName,
      age: user.age,

      // 🔥 MUST MATCH SCHEMA
      city: user.address.city,
      address: user.address.street,
      pincode: user.address.pincode
    };

    console.log("SENDING:", dataToSend);

    const res = await axios.put(
      `https://silva-tech-backend-pazp.onrender.com/update-profile/${user._id}`,
      dataToSend
    );

    localStorage.setItem("user", JSON.stringify(res.data));
    alert("Profile Updated ✅");

  } catch (err) {
    console.log("ERROR:", err.response?.data || err);
    alert("Failed ❌");
  }
};

 

  const logout = () => {
    localStorage.removeItem("user");
    alert("Logged out 🚪");
    navigate("/");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "radial-gradient(circle at top, #10162a, #020617)"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "700px",
          background: "rgba(16, 22, 42, 0.8)",
          padding: "30px",
          borderRadius: "20px",
          backdropFilter: "blur(10px)",
          boxShadow: "0 0 30px rgba(59, 130, 246, 0.2)"
        }}
      >
        <h1 style={{ marginBottom: "20px", textAlign: "center" }}>
          My Profile 👤
        </h1>

        {/* NAME */}
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            name="firstName"
            value={user.firstName || ""}
            onChange={handleChange}
            placeholder="First Name"
            style={inputStyle}
          />

          <input
            name="lastName"
            value={user.lastName || ""}
            onChange={handleChange}
            placeholder="Last Name"
            style={inputStyle}
          />
        </div>

        {/* AGE */}
        <input
          name="age"
          value={user.age || ""}
          onChange={handleChange}
          placeholder="Age"
          style={{ ...inputStyle, marginTop: "10px" }}
        />

        {/* ADDRESS */}
        <h3 style={{ marginTop: "20px" }}>Address 📍</h3>

        <div style={{ display: "flex", gap: "10px" }}>
          <input
            name="city"
            value={user.address?.city || ""}
            onChange={handleChange}
            placeholder="City"
            style={inputStyle}
          />

          <input
            name="pincode"
            value={user.address?.pincode || ""}
            onChange={handleChange}
            placeholder="Pincode"
            style={inputStyle}
          />
        </div>

        <input
          name="street"
          value={user.address?.street || ""}
          onChange={handleChange}
          placeholder="Street Address"
          style={{ ...inputStyle, marginTop: "10px" }}
        />

        {/* BUTTONS */}
        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          <button style={btnStyle} onClick={saveProfile}>
            Save Changes 💾
          </button>

          <button
            onClick={logout}
            style={{
              ...btnStyle,
              background: "linear-gradient(135deg, #ef4444, #dc2626)"
            }}
          >
            Logout 🚪
          </button>
        </div>
      </div>
    </div>
  );
}

/* 🔥 STYLES */
const inputStyle = {
  flex: 1,
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #334155",
  background: "#020617",
  color: "#fff"
};

const btnStyle = {
  flex: 1,
  padding: "10px",
  border: "none",
  borderRadius: "8px",
  background: "linear-gradient(135deg, #3b82f6, #2563eb)",
  color: "#fff",
  cursor: "pointer"
};

export default Profile;