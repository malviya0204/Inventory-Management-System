
const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// CREATE a product
router.post("/", async (req, res) => {
    try {
        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

// GET all products with filtering, sorting and pagination
router.get("/", async (req, res) => {
    try {
        const {
            category,
            search,
            sortBy = "createdAt",
            order = "desc",
            page = 1,
            limit = 10
        } = req.query;

        const filter = {};

        if (category) {
            filter.category = category;
        }

        if (search) {
            filter.name = { $regex: search, $options: "i" };
        }

        const products = await Product.find(filter)
            .sort({ [sortBy]: order === "asc" ? 1 : -1 })
            .skip((Number(page) - 1) * Number(limit))
            .limit(Number(limit));

        const total = await Product.countDocuments(filter);

        res.json({
            success: true,
            total,
            page: Number(page),
            pages: Math.ceil(total / Number(limit)),
            data: products
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET a single product
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json({ success: true, data: product });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// UPDATE a product
router.put("/:id", async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json({
            success: true,
            message: "Product updated successfully",
            data: product
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE a product
router.delete("/:id", async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json({
            success: true,
            message: "Product deleted successfully"
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// ADJUST stock (restock or sale)
router.patch("/:id/stock", async (req, res) => {
    try {
        const { quantityChange } = req.body;

        if (
            typeof quantityChange !== "number" ||
            !Number.isInteger(quantityChange) ||
            quantityChange === 0
        ) {
            return res.status(400).json({
                message: "quantityChange must be a non-zero integer"
            });
        }

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        if (product.quantity + quantityChange < 0) {
            return res.status(400).json({
                message: "Insufficient stock"
            });
        }

        product.quantity += quantityChange;
        await product.save();

        res.json({
            success: true,
            message: "Stock adjusted successfully",
            data: product
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// LOW STOCK REPORT
router.get("/reports/low-stock", async (req, res) => {
    try {
        const products = await Product.find({
            $expr: {
                $lte: ["$quantity", "$lowStockThreshold"]
            }
        });

        res.json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// CATEGORY-WISE INVENTORY SUMMARY
router.get("/reports/category-summary", async (req, res) => {
    try {
        const summary = await Product.aggregate([
            {
                $group: {
                    _id: "$category",
                    totalProducts: { $sum: 1 },
                    totalQuantity: { $sum: "$quantity" },
                    totalValue: {
                        $sum: {
                            $multiply: ["$price", "$quantity"]
                        }
                    }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        res.json({
            success: true,
            data: summary
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

module.exports = router;
