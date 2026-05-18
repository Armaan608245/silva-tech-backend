require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const cloudinary = require("cloudinary").v2;

const multer = require("multer");

const {
  CloudinaryStorage
} = require("multer-storage-cloudinary");

const app = express();

/* ================= MIDDLEWARE ================= */

app.use(cors());

app.use(express.json());

/* ================= HOME ================= */

app.get("/", (req, res) => {

  res.send("Silva Tech API Running ✅");

});

/* ================= CLOUDINARY ================= */

cloudinary.config({

  cloud_name: process.env.CLOUD_NAME,

  api_key: process.env.API_KEY,

  api_secret: process.env.API_SECRET

});

/* ================= STORAGE ================= */

const storage = new CloudinaryStorage({

  cloudinary,

  params: async (req, file) => ({

    folder: "silver-tech-computer",

    resource_type: "auto",

    format: file.mimetype.split("/")[1]

  })

});

const upload = multer({ storage });

/* ================= MODELS ================= */

const Product = require("./models/temp");

const User = require("./models/User");

const Activity = require("./models/Activity");

const Slider = require("./models/Slider");

/* ================= UPLOAD ================= */

app.post(

  "/api/upload",

  upload.single("file"),

  (req, res) => {

    try {

      if (!req.file) {

        return res.status(400).json({

          message: "No file uploaded ❌"

        });

      }

      res.json({

        url: req.file.path

      });

    } catch (err) {

      res.status(500).send(err.message);

    }

  }

);

/* ================= USERS ================= */

app.get("/api/users", async (req, res) => {

  try {

    const users = await User.find();

    res.json(users);

  } catch (err) {

    res.status(500).send(err.message);

  }

});

/* ================= AUTH ================= */

app.post("/api/signup", async (req, res) => {

  try {

    const hashedPassword = await bcrypt.hash(

      req.body.password,

      10

    );

    const user = new User({

      ...req.body,

      password: hashedPassword

    });

    await user.save();

    res.json({

      message: "Signup success ✅"

    });

  } catch (err) {

    res.status(500).send(err.message);

  }

});

app.post("/api/login", async (req, res) => {

  try {

    const user = await User.findOne({

      email: req.body.email

    });

    if (!user) {

      return res.status(400).send(

        "User not found ❌"

      );

    }

    const isMatch = await bcrypt.compare(

      req.body.password,

      user.password

    );

    if (!isMatch) {

      return res.status(400).send(

        "Wrong password ❌"

      );

    }

    const token = jwt.sign(

      { id: user._id },

      process.env.JWT_SECRET,

      { expiresIn: "1d" }

    );

    res.json({

      user,

      token

    });

  } catch (err) {

    res.status(500).send(err.message);

  }

});

/* ================= PRODUCTS ================= */

/* GET ALL PRODUCTS */

app.get("/api/products", async (req, res) => {

  try {

    const products = await Product.find();

    res.json(products);

  } catch (err) {

    res.status(500).send(err.message);

  }

});

/* GET SINGLE PRODUCT */

app.get("/api/products/:id", async (req, res) => {

  try {

    const product = await Product.findById(

      req.params.id

    );

    res.json(product);

  } catch (err) {

    res.status(500).send(err.message);

  }

});

/* ADD PRODUCT */

app.post("/api/products", async (req, res) => {

  try {

    const data = {

      ...req.body,

      price: Number(req.body.price),

      media: (req.body.media || []).filter(Boolean),

      isTopSeller:

        req.body.isTopSeller === true ||

        req.body.isTopSeller === "true" ||

        req.body.isTopSeller === 1 ||

        req.body.isTopSeller === "1"

    };

    const newProduct = new Product(data);

    await newProduct.save();

    res.send("Product Added ✅");

  } catch (err) {

    res.status(500).send(err.message);

  }

});

/* UPDATE PRODUCT */

app.put("/api/products/:id", async (req, res) => {

  try {

    const updatedData = {

      ...req.body,

      isTopSeller:

        req.body.isTopSeller === true ||

        req.body.isTopSeller === "true" ||

        req.body.isTopSeller === 1 ||

        req.body.isTopSeller === "1"

    };

    await Product.findByIdAndUpdate(

      req.params.id,

      updatedData

    );

    res.send("Product Updated ✅");

  } catch (err) {

    res.status(500).send(err.message);

  }

});

/* DELETE PRODUCT */

app.delete("/api/products/:id", async (req, res) => {

  try {

    await Product.findByIdAndDelete(

      req.params.id

    );

    res.send("Product Deleted ✅");

  } catch (err) {

    res.status(500).send(err.message);

  }

});

/* ================= SLIDER ================= */

/* ADD SLIDER */

app.post("/api/add-slider", async (req, res) => {

  try {

    const { url, type } = req.body;

    if (!url) {

      return res.status(400).send(

        "URL required ❌"

      );

    }

    await new Slider({

      url,

      type: type || "image"

    }).save();

    res.send("Slider Added ✅");

  } catch (err) {

    res.status(500).send(err.message);

  }

});

/* GET SLIDERS */

app.get("/api/slider", async (req, res) => {

  try {

    const sliders = await Slider.find();

    res.json(sliders);

  } catch (err) {

    res.status(500).send(err.message);

  }

});

/* DELETE SLIDER */

app.delete("/api/slider/:id", async (req, res) => {

  try {

    await Slider.findByIdAndDelete(

      req.params.id

    );

    res.send("Slider Deleted ✅");

  } catch (err) {

    res.status(500).send(err.message);

  }

});

/* ================= ACTIVITY ================= */

app.post("/api/activity", async (req, res) => {

  try {

    await new Activity(req.body).save();

    res.send("Activity Saved ✅");

  } catch (err) {

    res.status(500).send(err.message);

  }

});

app.get("/api/activity", async (req, res) => {

  try {

    const activity = await Activity.find();

    res.json(activity);

  } catch (err) {

    res.status(500).send(err.message);

  }

});

/* ================= DATABASE ================= */

mongoose.connect(process.env.MONGO_URI)

.then(() => {

  console.log("MongoDB Connected ✅");

})

.catch((err) => {

  console.log("Mongo Error ❌", err);

});

/* ================= SERVER ================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(

    `Server running on port ${PORT} 🚀`

  );

});