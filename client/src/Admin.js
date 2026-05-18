import React, { useEffect, useState } from "react";
import axios from "axios";

function Admin() {

  const API = "https://silva-tech-backend-pazp.onrender.com";

  const [tab, setTab] = useState("products");

  const [products, setProducts] = useState([]);
  const [sliders, setSliders] = useState([]);

  const [editingId, setEditingId] = useState(null);

  /* ================= PRODUCT ================= */

  const [newProduct, setNewProduct] = useState({

    name: "",
    price: "",
    description: "",

    category: "",
    subcategory: "",

    brand: "",
    warranty: "",
    stock: "",
    emi: "",
    installation: "",

    processor: "",
    ram: "",
    storage: "",
    memory: "",
    color: "",

    printerType: "",
    printSpeed: "",
    wireless: "",

    networkSpeed: "",
    wifiStandard: "",
    coverage: "",

    sensorType: "",
    megapixels: "",
    videoQuality: "",

    compatibility: "",
    spareType: "",

    media: ["", "", "", ""],

    isTopSeller: false,
    isComingSoon: false,
    isFeatured: false
  });

  /* ================= SLIDER ================= */

  const [sliderData, setSliderData] = useState({
    url: "",
    type: "image"
  });

  /* ================= FETCH ================= */

  useEffect(() => {

    fetchProducts();
    fetchSlider();

  }, []);

  const fetchProducts = async () => {

    const res = await axios.get(`${API}/products`);

    setProducts(res.data);
  };

  const fetchSlider = async () => {

    const res = await axios.get(`${API}/slider`);

    setSliders(res.data);
  };

  /* ================= IMAGE ================= */

  const handleUpload = async (e, index) => {

    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("file", file);

    const res = await axios.post(
      `${API}/upload`,
      formData
    );

    const arr = [...newProduct.media];

    arr[index] = res.data.url;

    setNewProduct({
      ...newProduct,
      media: arr
    });
  };

  /* ================= SLIDER ================= */

  const handleSliderUpload = async (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("file", file);

    const res = await axios.post(
      `${API}/upload`,
      formData
    );

    setSliderData({
      ...sliderData,
      url: res.data.url
    });
  };

  /* ================= CLEAR ================= */

  const clearForm = () => {

    setNewProduct({

      name: "",
      price: "",
      description: "",

      category: "",
      subcategory: "",

      brand: "",
      warranty: "",
      stock: "",
      emi: "",
      installation: "",

      processor: "",
      ram: "",
      storage: "",
      memory: "",
      color: "",

      printerType: "",
      printSpeed: "",
      wireless: "",

      networkSpeed: "",
      wifiStandard: "",
      coverage: "",

      sensorType: "",
      megapixels: "",
      videoQuality: "",

      compatibility: "",
      spareType: "",

      media: ["", "", "", ""],

      isTopSeller: false,
      isComingSoon: false,
      isFeatured: false
    });

    setEditingId(null);
  };

  /* ================= SAVE ================= */

  const handleAddProduct = async () => {

    const data = {

      ...newProduct,

      price: parseInt(newProduct.price) || 0,

      media: newProduct.media.filter(m => m),

      isTopSeller: Boolean(newProduct.isTopSeller),

      isComingSoon: Boolean(newProduct.isComingSoon),

      isFeatured: Boolean(newProduct.isFeatured)
    };

    if (editingId) {

      await axios.put(
        `${API}/products/${editingId}`,
        data
      );

      alert("Updated ✅");

    } else {

      await axios.post(
        `${API}/products`,
        data
      );

      alert("Added ✅");
    }

    fetchProducts();

    clearForm();
  };

  /* ================= DELETE ================= */

  const handleDelete = async (id) => {

    await axios.delete(`${API}/products/${id}`);

    fetchProducts();
  };

  /* ================= EDIT ================= */

  const handleEdit = (p) => {

    setNewProduct({

      ...p,

      media: p.media || ["", "", "", ""],

      isTopSeller: Boolean(p.isTopSeller),

      isComingSoon: Boolean(p.isComingSoon),

      isFeatured: Boolean(p.isFeatured)
    });

    setEditingId(p._id);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  /* ================= SLIDER ================= */

  const addSlider = async () => {

    if (!sliderData.url) {

      return alert("Upload slider image ❌");
    }

    await axios.post(
      `${API}/slider`,
      sliderData
    );

    alert("Slider Added ✅");

    setSliderData({
      url: "",
      type: "image"
    });

    fetchSlider();
  };

  const deleteSlider = async (id) => {

    await axios.delete(`${API}/slider/${id}`);

    fetchSlider();
  };

  /* ================= SAFE IMAGE ================= */

  const safeImage = (img) => {

    if (
      !img ||
      img.includes("localhost") ||
      img.includes("127.0.0.1")
    ) {

      return "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200";
    }

    return img;
  };

  return (

    <div className="premium-admin">

      {/* ================= SIDEBAR ================= */}

      <div className="premium-admin-sidebar">

        <div className="admin-logo">

          <img
            src="/logo.jpeg"
            alt=""
          />

          <div>

            <h2>
              SILVA TECH
            </h2>

            <p>
              Admin Panel
            </p>

          </div>

        </div>

        <button
          className={
            tab === "products"
              ? "active-admin-btn"
              : ""
          }
          onClick={() => setTab("products")}
        >
          📦 Products
        </button>

      </div>

      {/* ================= MAIN ================= */}

      <div className="premium-admin-main">

        {/* ================= PRODUCTS ================= */}

        {tab === "products" && (

          <>

            <div className="admin-topbar">

              <h1>
                Product Management
              </h1>

              <button
                className="clear-btn"
                onClick={clearForm}
              >
                Clear Form
              </button>

            </div>

            {/* FORM */}

            <div className="premium-admin-form">

              <div className="admin-input-grid">

                <input
                  placeholder="Product Name"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      name: e.target.value
                    })
                  }
                />

                <input
                  type="number"
                  placeholder="Price"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      price: e.target.value
                    })
                  }
                />

                <input
                  placeholder="Brand"
                  value={newProduct.brand}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      brand: e.target.value
                    })
                  }
                />

                <input
                  placeholder="Warranty"
                  value={newProduct.warranty}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      warranty: e.target.value
                    })
                  }
                />

                <input
                  placeholder="Stock Quantity"
                  value={newProduct.stock}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      stock: e.target.value
                    })
                  }
                />

                <input
                  placeholder="Processor"
                  value={newProduct.processor}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      processor: e.target.value
                    })
                  }
                />

                <input
                  placeholder="RAM"
                  value={newProduct.ram}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      ram: e.target.value
                    })
                  }
                />

                <input
                  placeholder="Storage"
                  value={newProduct.storage}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      storage: e.target.value
                    })
                  }
                />
                <input
                  placeholder="Memory"
                  value={newProduct.memory}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      memory: e.target.value
                    })
                  }
                />

                <input
                  placeholder="Color"
                  value={newProduct.color}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      color: e.target.value
                    })
                  }
                />

                <input
                  placeholder="EMI Available"
                  value={newProduct.emi}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      emi: e.target.value
                    })
                  }
                />

                <input
                  placeholder="Installation Service"
                  value={newProduct.installation}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      installation: e.target.value
                    })
                  }
                />

                {/* CATEGORY */}

                <select
                  value={newProduct.category}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      category: e.target.value
                    })
                  }
                >

                  <option value="">
                    Select Category
                  </option>

                  <option value="desktop">
                    Desktop
                  </option>

                  <option value="laptop">
                    Laptop
                  </option>

                  <option value="apple">
                    Apple
                  </option>

                  <option value="accessories">
                    Accessories
                  </option>

                </select>

                {/* TYPE */}

                <select
                  value={newProduct.subcategory}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      subcategory: e.target.value
                    })
                  }
                >

                  <option value="">
                    Select Type
                  </option>

                  <option value="personal">
                    Personal
                  </option>

                  <option value="corporate">
                    Corporate
                  </option>

                  <option value="gaming">
                    Gaming
                  </option>

                  <option value="desktop-spares">
                    DESKTOP SPARES
                  </option>

                  <option value="laptop-spares">
                    LAPTOP SPARES
                  </option>

                  <option value="printers">
                    PRINTERS
                  </option>

                  <option value="storage-solutions">
                    STORAGE SOLUTIONS
                  </option>

                  <option value="scanners">
                    SCANNERS
                  </option>

                  <option value="network-equipments">
                    NETWORK EQUIPMENTS
                  </option>

                </select>

                {/* PRINTER */}

                <input
                  placeholder="Printer Type"
                  value={newProduct.printerType}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      printerType: e.target.value
                    })
                  }
                />

                <input
                  placeholder="Print Speed"
                  value={newProduct.printSpeed}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      printSpeed: e.target.value
                    })
                  }
                />

                <input
                  placeholder="Wireless Support"
                  value={newProduct.wireless}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      wireless: e.target.value
                    })
                  }
                />

                {/* NETWORK */}

                <input
                  placeholder="Network Speed"
                  value={newProduct.networkSpeed}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      networkSpeed: e.target.value
                    })
                  }
                />

                <input
                  placeholder="WiFi Standard"
                  value={newProduct.wifiStandard}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      wifiStandard: e.target.value
                    })
                  }
                />

                <input
                  placeholder="Coverage Area"
                  value={newProduct.coverage}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      coverage: e.target.value
                    })
                  }
                />

                {/* DSLR */}

                <input
                  placeholder="Sensor Type"
                  value={newProduct.sensorType}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      sensorType: e.target.value
                    })
                  }
                />

                <input
                  placeholder="Megapixels"
                  value={newProduct.megapixels}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      megapixels: e.target.value
                    })
                  }
                />

                <input
                  placeholder="Video Quality"
                  value={newProduct.videoQuality}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      videoQuality: e.target.value
                    })
                  }
                />

                {/* SPARES */}

                <input
                  placeholder="Compatibility"
                  value={newProduct.compatibility}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      compatibility: e.target.value
                    })
                  }
                />

                <input
                  placeholder="Spare Type"
                  value={newProduct.spareType}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      spareType: e.target.value
                    })
                  }
                />

              </div>

              <textarea
                placeholder="Product Description"
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    description: e.target.value
                  })
                }
              ></textarea>

              {/* TOGGLES */}

              <div className="premium-toggle-box">

                <label>

                  <input
                    type="checkbox"
                    checked={newProduct.isTopSeller}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        isTopSeller: e.target.checked
                      })
                    }
                  />

                  🔥 Top Seller

                </label>

                <label>

                  <input
                    type="checkbox"
                    checked={newProduct.isComingSoon}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        isComingSoon: e.target.checked
                      })
                    }
                  />

                  🚀 Coming Soon

                </label>

                <label>

                  <input
                    type="checkbox"
                    checked={newProduct.isFeatured}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        isFeatured: e.target.checked
                      })
                    }
                  />

                  ⭐ Featured

                </label>

              </div>

              {/* MEDIA */}

              <div className="premium-upload-grid">

                {newProduct.media.map((m, i) => (

                  <div
                    key={i}
                    className="premium-upload-box"
                  >

                    <input
                      type="file"
                      onChange={(e) =>
                        handleUpload(e, i)
                      }
                    />

                    <input
                      placeholder="Paste Image URL"
                      value={m}
                      onChange={(e) => {

                        const arr = [...newProduct.media];

                        arr[i] = e.target.value;

                        setNewProduct({
                          ...newProduct,
                          media: arr
                        });
                      }}
                    />

                    {m && (

                      <img
                        src={safeImage(m)}
                        alt=""
                      />

                    )}

                  </div>

                ))}

              </div>

              <button
                className="premium-save-btn"
                onClick={handleAddProduct}
              >

                {editingId
                  ? "Update Product"
                  : "Add Product"}

              </button>

            </div>

            {/* PRODUCTS */}

            <h2 className="admin-section-title">
              All Products
            </h2>

            <div className="premium-product-grid">

              {products.map((p) => (

                <div
                  key={p._id}
                  className="premium-product-card"
                >

                  <img
                    src={safeImage(p.media?.[0])}
                    alt=""
                  />

                  <div className="product-card-content">

                    <h3>{p.name}</h3>

                    <p>
                      ₹{p.price}
                    </p>

                    <span>
                      {p.category}
                    </span>

                    <div className="premium-tags">

                      {p.isTopSeller && (
                        <div className="top-badge">
                          🔥 Top Seller
                        </div>
                      )}

                      {p.isComingSoon && (
                        <div className="coming-badge">
                          🚀 Coming Soon
                        </div>
                      )}

                      {p.isFeatured && (
                        <div className="top-badge">
                          ⭐ Featured
                        </div>
                      )}

                    </div>

                    <div className="stock-badge">
                      Stock: {p.stock || 0}
                    </div>

                    <div className="premium-card-btns">

                      <button
                        onClick={() => handleEdit(p)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDelete(p._id)
                        }
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </>

        )}

      </div>

    </div>
  );
}

export default Admin;