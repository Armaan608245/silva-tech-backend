import React, { useState } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";

import {
  AnimatePresence,
  motion
} from "framer-motion";

import Navbar from "./Navbar";
import Home from "./Home";
import About from "./About";
import Cart from "./Cart";
import ProductDetails from "./ProductDetails";
import Contact from "./Contact";
import Checkout from "./Checkout";

import Desktops from "./Desktops";
import Laptops from "./Laptops";
import AppleProducts from "./AppleProducts";
import Services from "./Services";
import AV from "./AV";
import Network from "./Network";
import Accessories from "./Accessories";

import ServicePage from "./ServicePage";
import Admin from "./Admin";

import CartPanel from "./CartPanel";

import "./index.css";
import "./App.css";

import Printers from "./Printers";

/* ================= PAGE ANIMATION ================= */

function PageWrapper({ children }) {

  return (

    <motion.div

      initial={{
        opacity: 0,
        scale: 0.98,
        y: 40
      }}

      animate={{
        opacity: 1,
        scale: 1,
        y: 0
      }}

      exit={{
        opacity: 0,
        scale: 0.98,
        y: -40
      }}

      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1]
      }}
    >

      {children}

    </motion.div>

  );
}

/* ================= ROUTES ================= */

function AnimatedRoutes({
  cart,
  setCart
}) {

  const location = useLocation();

  return (

    <AnimatePresence mode="wait">

      <Routes
        location={location}
        key={location.pathname}
      >

        {/* ADMIN */}

        <Route
          path="/admin"
          element={
            <PageWrapper>
              <Admin />
            </PageWrapper>
          }
        />

        {/* HOME */}

        <Route
          path="/"
          element={
            <PageWrapper>

              <Home
                cart={cart}
                setCart={setCart}
              />

            </PageWrapper>
          }
        />

        {/* ABOUT */}

        <Route
          path="/about"
          element={
            <PageWrapper>
              <About />
            </PageWrapper>
          }
        />

        {/* CONTACT */}

        <Route
          path="/contact"
          element={
            <PageWrapper>
              <Contact />
            </PageWrapper>
          }
        />

        {/* CART */}

        <Route
          path="/cart"
          element={
            <PageWrapper>

              <Cart
                cart={cart}
                setCart={setCart}
              />

            </PageWrapper>
          }
        />

        {/* CHECKOUT */}

        <Route
          path="/checkout"
          element={
            <PageWrapper>

              <Checkout
                cart={cart}
                setCart={setCart}
              />

            </PageWrapper>
          }
        />

        {/* PRODUCT DETAILS */}

        <Route
          path="/product/:id"
          element={
            <PageWrapper>

              <ProductDetails
                cart={cart}
                setCart={setCart}
              />

            </PageWrapper>
          }
        />

        {/* DESKTOPS */}

        <Route
          path="/desktops"
          element={
            <PageWrapper>

              <Desktops
                cart={cart}
                setCart={setCart}
              />

            </PageWrapper>
          }
        />

        {/* LAPTOPS */}

        <Route
          path="/laptops"
          element={
            <PageWrapper>

              <Laptops
                cart={cart}
                setCart={setCart}
              />

            </PageWrapper>
          }
        />

        {/* APPLE */}

        <Route
          path="/products/apple"
          element={
            <PageWrapper>

              <AppleProducts
                cart={cart}
                setCart={setCart}
              />

            </PageWrapper>
          }
        />

        {/* ACCESSORIES */}

        <Route
          path="/accessories"
          element={
            <Accessories
              cart={cart}
              setCart={setCart}
            />
          }
        />

        {/* SERVICES */}

        <Route
          path="/services"
          element={
            <PageWrapper>
              <Services />
            </PageWrapper>
          }
        />

        {/* AV */}

        <Route
          path="/av"
          element={
            <PageWrapper>
              <AV />
            </PageWrapper>
          }
        />

        {/* NETWORK */}

        <Route
          path="/network"
          element={
            <PageWrapper>
              <Network />
            </PageWrapper>
          }
        />

        {/* SERVICE PAGES */}

        <Route
          path="/repairs"
          element={
            <PageWrapper>

              <ServicePage
                title="Repairs"
                description="Repair services"
              />

            </PageWrapper>
          }
        />

        <Route
          path="/rentals"
          element={
            <PageWrapper>

              <ServicePage
                title="Rentals"
                description="Rental services"
              />

            </PageWrapper>
          }
        />

        <Route
          path="/upgrades"
          element={
            <PageWrapper>

              <ServicePage
                title="Upgrades"
                description="Upgrade services"
              />

            </PageWrapper>
          }
        />

        <Route
          path="/consultancy"
          element={
            <PageWrapper>

              <ServicePage
                title="Consultancy"
                description="Consultancy services"
              />

            </PageWrapper>
          }
        />

        <Route
          path="/data-recovery"
          element={
            <PageWrapper>

              <ServicePage
                title="Data Recovery"
                description="Recovery services"
              />

            </PageWrapper>
          }
        />

        <Route
          path="/softwares"
          element={
            <PageWrapper>

              <ServicePage
                title="Softwares"
                description="Software services"
              />

            </PageWrapper>
          }
        />

        {/* PRINTERS */}

        <Route
          path="/printers"
          element={
            <PageWrapper>

              <Printers
                cart={cart}
                setCart={setCart}
              />

            </PageWrapper>
          }
        />

        {/* STORAGE */}

        <Route
          path="/storage"
          element={
            <PageWrapper>

              <ServicePage
                title="Storage Solutions"
                description="Storage solutions"
              />

            </PageWrapper>
          }
        />

        {/* SCANNERS */}

        <Route
          path="/scanners"
          element={
            <PageWrapper>

              <ServicePage
                title="Scanners"
                description="Scanner solutions"
              />

            </PageWrapper>
          }
        />

        {/* NETWORK EQUIPMENT */}

        <Route
          path="/network-equipment"
          element={
            <PageWrapper>

              <ServicePage
                title="Network Equipment"
                description="Networking solutions"
              />

            </PageWrapper>
          }
        />



      </Routes>

    </AnimatePresence>

  );
}

/* ================= APP ================= */

function App() {

  /* ================= CART ================= */

  const [cart, setCart] = useState([]);

  const [cartOpen, setCartOpen] = useState(false);

  /* ================= WHATSAPP ================= */

  const [showWhatsApp, setShowWhatsApp] = useState(false);

  const openWhatsApp = () => {

    const msg = encodeURIComponent(
      "Hello Silva Tech Computer, I need help."
    );

    window.open(
      `https://wa.me/919967863961?text=${msg}`,
      "_blank"
    );
  };

  return (

    <Router>

      {/* ================= NAVBAR ================= */}

      <Navbar />

      {/* ================= FLOATING CART ================= */}

      <div
        className="floating-cart"
        onClick={() => setCartOpen(true)}
      >
        🛒 {cart.length}
      </div>

      {/* ================= WHATSAPP ================= */}

      <div
        className="whatsapp-btn"
        onClick={() =>
          setShowWhatsApp(!showWhatsApp)
        }
      >
        💬
      </div>

      {/* ================= WHATSAPP POPUP ================= */}

      {showWhatsApp && (

        <div className="whatsapp-box">

          <p>
            Need help? Chat with us 👇
          </p>

          <button onClick={openWhatsApp}>
            Chat on WhatsApp
          </button>

        </div>

      )}

      {/* ================= CART PANEL ================= */}

      <CartPanel
        cart={cart}
        setCart={setCart}
        open={cartOpen}
        setOpen={setCartOpen}
      />

      {/* ================= ANIMATED ROUTES ================= */}

      <AnimatedRoutes
        cart={cart}
        setCart={setCart}
      />

    </Router>

  );
}

export default App;