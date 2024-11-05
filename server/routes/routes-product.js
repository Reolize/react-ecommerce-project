const Products = require("../model/model-product");
const express = require("express");
const router = express.Router();


// Route to create a new product
router.post("/create", async (req, res) => {
    const { img, title, prevprice, newprice, company, color, category, quantity } = req.body;

    if (!img || !title || !prevprice || !newprice || !company || !color || !category || quantity == null) {
        return res.status(400).send("All fields are required");
    }

    const form = new Products({ img, title, prevprice, newprice, company, color, category, quantity });
    try {
        const newProduct = await form.save();
        res.status(201).json(newProduct);
    } catch (err) {
        console.error("Error creating product:", err);
        res.status(400).send("Error creating product: " + err);
    }
});

// Route to fetch all products
router.get("/fetch", async (req, res) => {
    try {
        const products = await Products.find();
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send("Error fetching products: " + error);
    }
});

// Route to delete a product by ID
router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Products.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).send('Product not found');
        }
        res.status(200).json({ message: 'Product deleted successfully', deletedProduct });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).send('Server error');
    }
});

router.put("/update/:id", async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const updatedProduct = await Products.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedProduct) {
            return res.status(404).send('Product not found');
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;