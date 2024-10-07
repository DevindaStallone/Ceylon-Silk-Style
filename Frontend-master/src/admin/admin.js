import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editableProductIndex, setEditableProductIndex] = useState(null);
  


  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    price: '',
    sizes: '',
    image: null,
    category: 'men',
    subCategory: 't-shirt',
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchQuery, products]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (error) {
      setError('Error fetching products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(lowercasedQuery) ||
      product.description.toLowerCase().includes(lowercasedQuery) ||
      product.price.toString().includes(lowercasedQuery) ||
      product.sizes.join(', ').toLowerCase().includes(lowercasedQuery) ||
      product.category.toLowerCase().includes(lowercasedQuery) ||
      product.subCategory.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredProducts(filtered);
  };

  const handleUpdateProduct = async (productId, updatedData) => {
    const formData = new FormData();
    Object.keys(updatedData).forEach((key) => {
      if (Array.isArray(updatedData[key])) {
        formData.append(key, updatedData[key].join(','));
      } else {
        formData.append(key, updatedData[key]);
      }
    });

    try {
      setLoading(true);
      await axios.put(`http://localhost:5000/api/products/${productId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchProducts();
    } catch (error) {
      setError('Error updating product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async () => {
    const formData = new FormData();
    formData.append('title', newProduct.title);
    formData.append('description', newProduct.description);
    formData.append('price', newProduct.price);
    formData.append('sizes', newProduct.sizes);
    formData.append('image', newProduct.image);
    formData.append('category', newProduct.category);
    formData.append('subCategory', newProduct.subCategory);

    try {
      setLoading(true);
      await axios.post('http://localhost:5000/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setNewProduct({ title: '', description: '', price: '', sizes: '', image: null, category: 'men', subCategory: 't-shirt' });
      fetchProducts();
    } catch (error) {
      setError('Error adding product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e, productIndex) => {
    const file = e.target.files[0];
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];
      updatedProducts[productIndex] = {
        ...updatedProducts[productIndex],
        image: file,
      };
      return updatedProducts;
    });
  };

  const toggleSoldOut = async (product) => {
    const isMarkingAsAvailable = !product.soldOut;

    if (window.confirm(`Are you sure you want to ${isMarkingAsAvailable ? 'mark as available' : 'mark as sold out'}?`)) {
      const updatedData = { ...product, soldOut: isMarkingAsAvailable };

      if (isMarkingAsAvailable) {
        updatedData.outOfStockSizes = [];
      }

      await handleUpdateProduct(product._id, updatedData);
    }
  };

  const toggleOutOfStockSize = async (product, size) => {
    const updatedOutOfStockSizes = product.outOfStockSizes || [];

    if (updatedOutOfStockSizes.includes(size)) {
      updatedOutOfStockSizes.splice(updatedOutOfStockSizes.indexOf(size), 1);
    } else {
      updatedOutOfStockSizes.push(size);
    }

    const updatedProduct = { ...product, outOfStockSizes: updatedOutOfStockSizes };
    await handleUpdateProduct(product._id, updatedProduct);
  };

  const handleEdit = (productIndex) => {
    setEditableProductIndex(productIndex === editableProductIndex ? null : productIndex);
  };

  const handleFieldChange = (productIndex, field, value) => {
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];
      if (field === 'sizes') {
        updatedProducts[productIndex] = {
          ...updatedProducts[productIndex],
          [field]: value.split(',').map(size => size.trim()),
        };
      } else {
        updatedProducts[productIndex] = {
          ...updatedProducts[productIndex],
          [field]: value,
        };
      }
      return updatedProducts;
    });
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        setLoading(true);
        await axios.delete(`http://localhost:5000/api/products/${productId}`);
        fetchProducts();
      } catch (error) {
        setError('Error deleting product. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeleteAllProducts = async () => {
    if (window.confirm('Are you sure you want to delete all products?')) {
      try {
        setLoading(true);
        await axios.delete('http://localhost:5000/api/products');
        fetchProducts();
      } catch (error) {
        setError('Error deleting all products. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-10 pt-36 text-gray-200">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-white text-center mb-12">Manage Products</h1>

        {loading && <p className="text-center text-blue-400">Loading...</p>}
        {error && <p className="text-center text-red-400">{error}</p>}

       

        {/* Add Product Form */}
        <div className="max-w-4xl mx-auto bg-gray-800 shadow-lg rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-semibold text-white mb-6">Add New Product</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={newProduct.title}
              onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
              className="w-full p-4 border border-gray-700 rounded-md bg-gray-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Description"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              className="w-full p-4 border border-gray-700 rounded-md bg-gray-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              className="w-full p-4 border border-gray-700 rounded-md bg-gray-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Sizes (comma-separated)"
              value={newProduct.sizes}
              onChange={(e) => setNewProduct({ ...newProduct, sizes: e.target.value })}
              className="w-full p-4 border border-gray-700 rounded-md bg-gray-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="file"
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })}
              className="w-full border border-gray-700 rounded-md bg-gray-900 text-gray-200"
            />
            <select
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              className="w-full p-4 border border-gray-700 rounded-md bg-gray-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="men">Men</option>
              <option value="women">Women</option>
            </select>
            <select
              value={newProduct.subCategory}
              onChange={(e) => setNewProduct({ ...newProduct, subCategory: e.target.value })}
              className="w-full p-4 border border-gray-700 rounded-md bg-gray-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="t-shirt">T-Shirt</option>
              <option value="shorts">Shorts</option>
              <option value="pants">Pants</option>
              <option value="skirts">Skirts</option>
              <option value="leggings">Leggings</option>
            </select>
            <button
              onClick={handleAddProduct}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Product
            </button>
          </div>
        </div>

        {/* Search Input */}
        <div className="max-w-4xl mx-auto mb-8">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-4 border border-gray-700 rounded-md bg-gray-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleDeleteAllProducts}
          className="bg-red-600 mb-10 hover:bg-red-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 mt-8"
        >
          Delete All Products
        </button>
        {/* Product List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <div key={product._id} className="bg-gray-800 shadow-lg rounded-lg p-6 relative">
              {product.image && (
                <img
                  src={`http://localhost:5000/${product.image}`}
                  alt={product.title}
                  className="w-full h-96 object-cover rounded-lg mb-4"
                />
              )}
              {/* Product details */}
              <h3 className="text-xl font-semibold text-white mb-2 uppercase">{product.title}</h3>
              <p className="text-gray-400 mb-2 capitalize">{product.description}</p>
              <p className="text-gray-400 mb-2 capitalize">{product.category}</p>
              <p className="text-gray-400 mb-2 capitalize">{product.subCategory}</p>
              <p className="text-gray-400 mb-2">Sizes: {product.sizes.join(', ')}</p>
              <div className="mt-2 mb-2 flex">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => toggleOutOfStockSize(product, size)}
                    className={`py-1 px-2 mb-2 rounded-md text-sm font-semibold mr-2 ${product.outOfStockSizes?.includes(size) ? 'bg-red-600 text-white' : 'bg-gray-600 text-gray-200'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <p className="text-white mb-2">Price: ${product.price}</p>

              <div className='mb-5'>
                  <p className={`mb-1 text-white font-semibold px-3 py-1 rounded inline-block ${product.soldOut ? 'bg-red-600' : 'bg-green-600'}`}>
                        {product.soldOut ? 'Sold Out' : 'Available'}
                      </p>
                </div>
              
              {/* Action buttons */}
              <div className="flex justify-between items-center">
                <button
                  onClick={() => handleEdit(index)}
                  className="bg-green-600 hover:bg-green-700 text-white py-1 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {editableProductIndex === index ? 'Cancel' : 'Edit'}
                </button>
                <button
                  onClick={() => handleDeleteProduct(product._id)}
                  className="bg-red-600 hover:bg-red-700 text-white py-1 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Delete
                </button>
                <button
                  onClick={() => toggleSoldOut(product)}
                  className={`py-1 px-4 rounded-md focus:outline-none ${product.soldOut ? 'bg-gray-600' : 'bg-yellow-600'} text-white`}
                >
                  {product.soldOut ? 'Mark as Available' : 'Mark as Sold Out'}
                </button>
                
              </div>
              {editableProductIndex === index && (
                <div className="mt-4">
                  {/* Editable fields */}
                  <input
                    type="text"
                    value={product.title}
                    onChange={(e) => handleFieldChange(index, 'title', e.target.value)}
                    className="w-full p-2 border border-gray-700 rounded-md bg-gray-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <textarea
                    value={product.description}
                    onChange={(e) => handleFieldChange(index, 'description', e.target.value)}
                    className="w-full p-2 border border-gray-700 rounded-md bg-gray-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    value={product.price}
                    onChange={(e) => handleFieldChange(index, 'price', e.target.value)}
                    className="w-full p-2 border border-gray-700 rounded-md bg-gray-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    value={product.sizes.join(', ')}
                    onChange={(e) => handleFieldChange(index, 'sizes', e.target.value)}
                    className="w-full p-2 border border-gray-700 rounded-md bg-gray-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, index)}
                    className="w-full border border-gray-700 rounded-md bg-gray-900 text-gray-200"
                  />
                  <button
                    onClick={() => handleUpdateProduct(product._id, {
                      title: product.title,
                      description: product.description,
                      price: product.price,
                      sizes: product.sizes,
                      image: product.image,
                    })}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
                  >
                    Save
                  </button>
                </div>
              )}
             
            </div>
          ))}

        </div>

        
      </div>
    </div>
  );
};

export default AdminPage;
