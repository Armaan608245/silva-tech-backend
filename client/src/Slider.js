import React, { useEffect, useState } from "react";
import axios from "axios";

function Slider() {
  const [slides, setSlides] = useState([]);
  const [index, setIndex] = useState(0);
  const [hover, setHover] = useState(false);

  // 🔥 FETCH
  useEffect(() => {
    axios.get("https://silva-tech-backend-pazp.onrender.com/slider")
      .then(res => setSlides(res.data))
      .catch(err => console.log(err));
  }, []);

  // 🔥 FILTER VALID SLIDES
  const validSlides = slides.filter(
    s => s.image && s.image.trim() !== ""
  );

  // 🔥 AUTO SLIDE (ONLY FOR IMAGES)
  useEffect(() => {
    if (validSlides.length > 0 && !hover) {
      const current = validSlides[index]?.image;

      // ❌ DON'T AUTO SLIDE IF VIDEO
      if (current && current.includes(".mp4")) return;

      const interval = setInterval(() => {
        setIndex(prev => {
          let newIndex = prev + 1;
          if (newIndex >= validSlides.length) newIndex = 0;
          return newIndex;
        });
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [validSlides, hover, index]);

  // 🔥 PREVIOUS
  const prevSlide = () => {
    if (validSlides.length === 0) return;

    setIndex(prev => {
      let newIndex = prev - 1;
      if (newIndex < 0) newIndex = validSlides.length - 1;
      return newIndex;
    });
  };

  // 🔥 NEXT
  const nextSlide = () => {
    if (validSlides.length === 0) return;

    setIndex(prev => {
      let newIndex = prev + 1;
      if (newIndex >= validSlides.length) newIndex = 0;
      return newIndex;
    });
  };

  if (validSlides.length === 0) return <p>Loading slider...</p>;

  const current = validSlides[index].image;

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: "100%",
        height: "520px",
        position: "relative",
        overflow: "hidden",
        borderRadius: "25px",
        background: "#000"
      }}
    >

      {/* 🔥 BACKGROUND BLUR */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          filter: "blur(40px)",
          opacity: 0.4,
          transform: "scale(1.2)",
          zIndex: 0
        }}
      >
        {current.includes(".mp4") ? (
          <video
            src={current}
            muted
            loop
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <img
            src={current}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
      </div>

      {/* 🔥 MAIN CONTENT */}
      <div
        key={index}
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {current.includes(".mp4") ? (
          <video
            src={current}
            controls   // ✅ SOUND WORKS
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: "15px",
              objectFit: "contain"
            }}
          />
        ) : (
          <img
            src={current}
            alt="slide"
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: "15px",
              objectFit: "contain"
            }}
          />
        )}
      </div>

      {/* 🔥 LEFT ARROW */}
      <button
        onClick={prevSlide}
        style={{
          position: "absolute",
          left: "20px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "rgba(255,255,255,0.1)",
          border: "none",
          color: "#fff",
          fontSize: "28px",
          padding: "12px",
          borderRadius: "50%",
          cursor: "pointer",
          backdropFilter: "blur(10px)",
          zIndex: 2
        }}
      >
        ‹
      </button>

      {/* 🔥 RIGHT ARROW */}
      <button
        onClick={nextSlide}
        style={{
          position: "absolute",
          right: "20px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "rgba(255,255,255,0.1)",
          border: "none",
          color: "#fff",
          fontSize: "28px",
          padding: "12px",
          borderRadius: "50%",
          cursor: "pointer",
          backdropFilter: "blur(10px)",
          zIndex: 2
        }}
      >
        ›
      </button>

      {/* 🔥 DOTS */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          zIndex: 2
        }}
      >
        {validSlides.map((_, i) => (
          <span
            key={i}
            onClick={() => setIndex(i)}
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: i === index ? "#fff" : "#777",
              cursor: "pointer"
            }}
          ></span>
        ))}
      </div>

    </div>
  );
}

export default Slider;