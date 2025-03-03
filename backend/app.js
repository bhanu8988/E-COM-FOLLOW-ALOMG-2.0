const express = require("express");
const app = express();
const path = require("path");
const ErrorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const product = require("./controller/product");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/", express.static("uploads"));
app.use(cors());

// Serve static files for uploads and products
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/products", express.static(path.join(__dirname, "products")));

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
      path: "backend/config/.env",
    });
};

// Import Routes
const user = require("./controller/user");

app.use("/api/v2/user", user);
app.use("/api/v2/product", product);

// Error Handling
app.use(ErrorHandler);

module.exports = app;