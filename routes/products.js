const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// Product listing endpoint
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Create new product endpoint
router.post('/', async (req, res) => {
    const { name, image, description, price } = req.body;
    try {
        const newProduct = new Product({ name, image, description, price });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Get product by ID endpoint
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
