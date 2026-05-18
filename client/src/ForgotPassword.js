import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function ForgotPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState(location.state?.email || "");
  const [timer, setTimer] = useState(0);

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [otpSent, setOtpSent] = useState(false); // 🔥 control button

  // 🔥 SEND OTP
  const sendOtp = async () => {
    try {
      await axios.post("https://silva-tech-backend-pazp.onrender.com/forgot-password", { email });
      alert("OTP sent to your email 📧");
    } catch (err) {
      alert("User not found ❌");
    }
  };

  // 🔥 FIRST CLICK
  const handleReset = async () => {
    if (!email) {
      alert("Enter email first ❌");
      return;
    }

    if (otpSent) return; // 🔥 prevent spam

    await sendOtp();

    setOtpSent(true);
    setTimer(120);
  };

  // 🔥 TIMER + AUTO RESEND
  useEffect(() => {
    if (timer <= 0 && otpSent) {
      // 🔥 AUTO RESEND AFTER 2 MIN
      sendOtp();
      setTimer(120);
      return;
    }

    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer, otpSent]);

  // 🔥 VERIFY + RESET PASSWORD
  const verifyOtp = async () => {
    if (!otp || !newPassword) {
      alert("Fill OTP and new password ❌");
      return;
    }

    try {
      await axios.post("https://silva-tech-backend-pazp.onrender.com/reset-password", {
        email,
        otp,
        newPassword
      });

      alert("Password reset successful ✅");

      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (err) {
      alert("Invalid OTP ❌");
    }
  };

  const formatTime = (time) => {
    const m = String(Math.floor(time / 60)).padStart(2, "0");
    const s = String(time % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div style={{ padding: "30px", textAlign: "center" }}>
      <h2>Forgot Password 🔑</h2>

      <input
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      {/* 🔥 BUTTON DISABLED */}
      <button onClick={handleReset} disabled={otpSent}>
        {otpSent ? "OTP Sent ⏳" : "Send OTP"}
      </button>

      {/* 🔥 TIMER */}
      {otpSent && (
        <p style={{ marginTop: "10px" }}>
          New OTP will be sent in {formatTime(timer)} ⏳
        </p>
      )}

      {/* 🔥 OTP + PASSWORD */}
      {otpSent && (
        <>
          <br /><br />

          <input
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <br /><br />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <br /><br />

          <button onClick={verifyOtp}>
            Verify & Reset 🔐
          </button>
        </>
      )}
    </div>
  );
}

export default ForgotPassword;