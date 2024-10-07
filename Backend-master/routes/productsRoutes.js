const express = require('express');
const Product = require('../models/Products'); // Adjust path as necessary
const upload = require('../config/multerConfig'); // Adjust path as necessary

const router = express.Router();

router.get('/products', async (req, res) => {
  try {
    const { category, price, size, search, subCategory } = req.query; // Extract filters from query parameters
    
    let query = {};
    
    // Category filter
    if (category) {
      query.category = category;
    }

    // SubCategory filter
    if (subCategory) {
      query.subCategory = subCategory;
    }


    // Price filter: Handle price ranges like "0-50", "50-100", "200-"
    if (price) {
      const [min, max] = price.split('-');
      if (max) {
        query.price = { $gte: parseInt(min), $lte: parseInt(max) };  // Both min and max provided
      } else {
        query.price = { $gte: parseInt(min) };  // Only minimum provided, e.g., "200-"
      }
    }

    // Size filter
    if (size) {
      query.sizes = size;
    }

    // Search filter (case-insensitive search on product title)
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    // Fetch filtered products from the database
    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});



// POST route to add a new product
router.post('/products', upload.single('image'), async (req, res) => {
  try {
    const { title, description, price, sizes, category, subCategory } = req.body;
    const image = req.file ? req.file.path : ''; // Path to the uploaded file

    // Check if sizes is a string, split if necessary, otherwise fallback to an empty array
    const parsedSizes = typeof sizes === 'string' ? sizes.split(',').map(size => size.trim()) : [];

    const newProduct = new Product({
      title,
      description,
      price,
      sizes: parsedSizes, // Use the parsed sizes
      image,
      category,
      subCategory,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT route to update a product by ID
router.put('/products/:id', upload.single('image'), async (req, res) => {
  const { title, description, price, sizes, category, subCategory, soldOut, outOfStockSizes } = req.body;

  // Check if sizes is a string, split if necessary, otherwise fallback to an empty array
  const parsedSizes = typeof sizes === 'string' ? sizes.split(',').map(size => size.trim()) : [];

  const updatedData = {
    title,
    description,
    price,
    sizes: parsedSizes, // Use the parsed sizes
    category,
    subCategory,
    soldOut: soldOut === 'true', // Ensure boolean value
    outOfStockSizes: Array.isArray(outOfStockSizes) ? outOfStockSizes : [],
  };

  if (req.file) {
    updatedData.image = req.file.path; // Update image if a new one is uploaded
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    console.log('Updated product:', updatedProduct);
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET a single product by ID
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// DELETE route to delete a product by ID
router.delete('/products/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
});

// DELETE route to delete all products
router.delete('/products', async (req, res) => {
  try {
    await Product.deleteMany({});
    res.json({ message: 'All products deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting products', error });
  }
});



module.exports = router;
