
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const productRoutes = require("./src/routes/productRoutes");

const app = express();

// Middleware
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Inventory Management System API is running!"
    });
});

// Product routes
app.use("/api/products", productRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully!");

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });
