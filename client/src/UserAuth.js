import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserAuth() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    city: "",
    address: "",
    pincode: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    try {
      if (!isLogin) {
        for (let key in form) {
          if (!form[key]) {
            alert("Fill all fields ❌");
            return;
          }
        }

        if (form.password !== confirmPassword) {
          alert("Passwords do not match ❌");
          return;
        }

        await axios.post("https://silva-tech-backend-pazp.onrender.com/signup", form);
        alert("Signup success ✅");
        setIsLogin(true);

      } else {
        const res = await axios.post("https://silva-tech-backend-pazp.onrender.com/login", {
          email: form.email,
          password: form.password
        });

        localStorage.setItem("user", JSON.stringify(res.data.user));
        setForm({ ...form, password: "" });

        alert("Login success ✅");
        navigate("/");
        window.location.reload();
      }

    } catch (err) {
      alert(err.response?.data || "Error ❌");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "radial-gradient(circle at top, #10162a, #020617)"
    }}>

      <form autoComplete="off">

        <div style={{
          width: "100%",
          maxWidth: "400px",
          background: "rgba(16,22,42,0.8)",
          padding: "30px",
          borderRadius: "20px",
          backdropFilter: "blur(10px)",
          boxShadow: "0 0 30px rgba(59,130,246,0.3)",
          textAlign: "center"
        }}>

          <img
            src="/logo.jpeg"
            alt="logo"
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "15px",
              objectFit: "contain",
              boxShadow: "0 0 20px #00f0ff",
              marginBottom: "15px"
            }}
          />

          <h1>{isLogin ? "Welcome Back 👋" : "Create Account 🚀"}</h1>

          {!isLogin && (
            <>
              <input style={input} name="firstName" placeholder="First Name" onChange={handleChange} />
              <input style={input} name="lastName" placeholder="Last Name" onChange={handleChange} />
              <input style={input} name="city" placeholder="City" onChange={handleChange} />
              <input style={input} name="address" placeholder="Street Address" onChange={handleChange} />
              <input style={input} name="pincode" placeholder="Pincode" onChange={handleChange} />

              <div style={{ position: "relative" }}>
                <input
                  style={input}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create Password"
                  onChange={handleChange}
                />
                <span onClick={() => setShowPassword(!showPassword)} style={eye}>
                  {showPassword ? "🙈" : "👁"}
                </span>
              </div>

              <input
                style={input}
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </>
          )}

          <input
            style={input}
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          {isLogin && (
            <div style={{ position: "relative" }}>
              <input
                style={input}
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
              />
              <span onClick={() => setShowPassword(!showPassword)} style={eye}>
                {showPassword ? "🙈" : "👁"}
              </span>
            </div>
          )}

          <button type="button" style={btn} onClick={submit}>
            {isLogin ? "Login" : "Signup"}
          </button>

          {/* 🔥 FIXED FORGOT PASSWORD */}
          {isLogin && (
            <p
              onClick={() => {
                if (!form.email) {
                  alert("Please enter your email first ❌");
                  return;
                }

                navigate("/forgot-password", {
                  state: { email: form.email }
                });
              }}
              style={link}
            >
              Forgot Password?
            </p>
          )}

          <p onClick={() => setIsLogin(!isLogin)} style={toggle}>
            {isLogin ? "Create account" : "Already have account?"}
          </p>

        </div>
      </form>
    </div>
  );
}

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "8px",
  border: "1px solid #334155",
  background: "#020617",
  color: "#fff"
};

const btn = {
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  border: "none",
  background: "linear-gradient(135deg, #3b82f6, #2563eb)",
  color: "white",
  cursor: "pointer",
  marginTop: "10px"
};

const eye = {
  position: "absolute",
  right: "10px",
  top: "10px",
  cursor: "pointer"
};

const link = {
  marginTop: "10px",
  cursor: "pointer",
  color: "#3b82f6"
};

const toggle = {
  marginTop: "10px",
  cursor: "pointer",
  color: "#94a3b8"
};

export default UserAuth;