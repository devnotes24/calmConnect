/* eslint-disable camelcase */
const express = require('express');
const createProductModel = require('../Model/productDataMd');

// GET all products
exports.getAllProducts = async (req, res) => {
    const Product = createProductModel(req.globalDB);
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Server error while retrieving products' });
  }
};

// GET single product by ID
exports.get_product_by_id = async (req, res) => {
const Product = createProductModel(req.globalDB);

  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Server error while retrieving product' });
  }
};

// POST a new product
exports.createProduct = async (req, res) => {
const Product = createProductModel(req.globalDB);

  try {
    const count = await Product.countDocuments();
    const new_product = new Product({
      _id: String(count + 1), // Increment _id by 1
      ...req.body
    });
    
    await new_product.save();
    res.status(201).json({ success: 'Product created successfully', product: new_product });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create product' });
  }
};

// PUT update a product, including adding a review
exports.updateProduct = async (req, res) => {
const Product = createProductModel(req.globalDB);

  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Add new review to the reviewsArray
    if (req.body.reviewsArray) {
      req.body.reviewsArray.forEach(review => {
        product.reviewsArray.push(review);
      });
    }

    await product.save();
    res.json({ success: 'Product updated successfully', product });
  } catch (error) {
    res.status(500).json({ error: 'Server error while updating product' });
  }
};

// DELETE a product by ID
exports.deleteProduct = async (req, res) => {
    const Product = createProductModel(req.globalDB);
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    await product.remove();
    res.json({ success: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error while deleting product' });
  }
};
