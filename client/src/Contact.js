import React, { useState } from "react";
import Footer from "./Footer";

function Contact() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const submit = () => {

    if (!form.name || !form.email || !form.phone) {

      alert("Please fill all required fields");

      return;
    }

    const message = `Hello Silva Tech Computers,

Name: ${form.name}
Email: ${form.email}
Phone: ${form.phone}

Message:
${form.message}`;

    window.open(
      `https://wa.me/919967863961?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (

    <div className="modern-contact-page">

      {/* ================= HERO ================= */}

      <section className="contact-modern-hero">

        <div className="contact-modern-overlay">

          {/* LOGO */}

          <img
            src="/SILA TECH COMPUTERS.png"
            alt="Silva Tech Computers"
            className="contact-logo"
          />

          <h1>
            Contact Us
          </h1>

          <p>
            Get in touch for premium IT support,
            hardware solutions and business services.
          </p>

        </div>

      </section>

      {/* ================= MAIN ================= */}

      <section className="modern-contact-container">

        {/* ================= LEFT ================= */}

        <div className="modern-contact-form">

          <span>
            GET IN TOUCH
          </span>

          <h2>
            Send Us A Message
          </h2>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="6"
            onChange={handleChange}
          ></textarea>

          <button onClick={submit}>
            Send Message
          </button>

        </div>

        {/* ================= RIGHT ================= */}

        <div className="modern-contact-info">

          {/* LOGO CARD */}

          <div className="contact-brand-card">

            <img
              src="/SILA TECH COMPUTERS.png"
              alt="Silva Tech Computers"
            />

            <h2>
              SILVA TECH COMPUTERS
            </h2>

            <p>
              Premium computer solutions,
              IT infrastructure and support services.
            </p>

          </div>

          {/* EMAIL */}

          <div className="contact-info-card">

            <h3>
              Email
            </h3>

            <p>
              silvatechc@gmail.com
            </p>

          </div>

          {/* PHONE */}

          <div className="contact-info-card">

            <h3>
              Phone
            </h3>

            <p>
              +91 9967863961
            </p>

          </div>

          {/* OFFICE */}

          <div className="contact-info-card">

            <h3>
              Office
            </h3>

            <p>
              Unit No. 201, F-Wing,
              Kailash Industrial Complex,
              Vikhroli West, Mumbai
            </p>

          </div>

        </div>

      </section>

      <Footer />

    </div>
  );
}

export default Contact;