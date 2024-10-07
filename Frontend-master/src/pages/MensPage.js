import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MensPage = () => {
  const [mensProducts, setMensProducts] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState({}); // Track selected sizes per product
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [filters, setFilters] = useState({ priceRange: '', size: '', searchQuery: '' }); // Filter states
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products filtered by the 'men' category and apply filters
    const fetchMensProducts = async () => {
      try {
        let query = 'http://localhost:5000/api/products?category=men';

        // Apply filters
        if (filters.priceRange) query += `&price=${filters.priceRange}`;
        if (filters.size) query += `&size=${filters.size}`;
        if (filters.searchQuery) query += `&search=${filters.searchQuery}`;

        const response = await axios.get(query);
        setMensProducts(response.data); // Set fetched products to state
      } catch (error) {
        console.error('Error fetching men products:', error);
      }
    };

    fetchMensProducts();
  }, [filters]);

  // Function to handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Function to add items to the cart
  const addToCart = (product) => {
    const size = selectedSizes[product._id];
    if (!size) {
      alert('Please select a size before adding to cart.');
      return;
    }

    const updatedCart = [...cart];
    const existingIndex = updatedCart.findIndex(
      (item) => item._id === product._id && item.selectedSize === size
    );

    if (existingIndex >= 0) {
      updatedCart[existingIndex].quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1, selectedSize: size });
    }

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    setSelectedSizes((prev) => ({ ...prev, [product._id]: '' }));
  };

  // Function to handle viewing product details
  const handleViewItem = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div className="flex text-black">
      {/* Sidebar for filters */}
      <div className="fixed left-0 w-1/4 h-screen p-4 shadow-lg bg-gradient-to-b from-[#27285C] to-[#15142B] pt-24">
      <h3 className="text-2xl font-semibold mb-2  text-center text-white">Mens Products</h3>

        <h3 className="text-xl font-base mb-4 text-white">Filter Products</h3>

        {/* Search Filter */}
        <div className="mb-6">
          <label className="block text-white font-medium mb-2">Search</label>
          <input
            type="text"
            name="searchQuery"
            value={filters.searchQuery}
            onChange={handleFilterChange}
            placeholder="Search products"
            className="w-full px-4 py-2 border border-violet-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-800 shadow-md text-black"
          />
        </div>

        {/* Price Range Filter */}
        <div className="mb-6">
          <label className="block text-white font-medium mb-2">Price Range</label>
          <div className="flex flex-col">
            <label className="text-white py-1 cursor-pointer">
              <input
                type="radio"
                name="priceRange"
                value=""
                checked={filters.priceRange === ""}
                onChange={handleFilterChange}
                className="mr-3 focus:ring-violet-700 accent-violet-700"
              />
              All
            </label>
            <label className="text-white py-1 cursor-pointer">
              <input
                type="radio"
                name="priceRange"
                value="0-50"
                checked={filters.priceRange === "0-50"}
                onChange={handleFilterChange}
                className="mr-3 focus:ring-violet-700 accent-violet-700"
              />
              Under $50
            </label>
            <label className="text-white py-1 cursor-pointer">
              <input
                type="radio"
                name="priceRange"
                value="50-100"
                checked={filters.priceRange === "50-100"}
                onChange={handleFilterChange}
                className="mr-3 focus:ring-violet-700 accent-violet-700"
              />
              $50 - $100
            </label>
            <label className="text-white py-1 cursor-pointer">
              <input
                type="radio"
                name="priceRange"
                value="100-200"
                checked={filters.priceRange === "100-200"}
                onChange={handleFilterChange}
                className="mr-3 focus:ring-violet-700 accent-violet-700"
              />
              $100 - $200
            </label>
            <label className="text-white py-1 cursor-pointer">
              <input
                type="radio"
                name="priceRange"
                value="200-"
                checked={filters.priceRange === "200-"}
                onChange={handleFilterChange}
                className="mr-3 focus:ring-violet-700 accent-violet-700"
              />
              Above $200
            </label>
          </div>
        </div>

        {/* Size Filter */}
        <div className="mb-6">
          <label className="block text-white font-medium mb-2">Size</label>
          <div className="flex flex-col">
            <label className="text-white py-1 cursor-pointer">
              <input
                type="radio"
                name="size"
                value=""
                checked={filters.size === ""}
                onChange={handleFilterChange}
                className="mr-3 focus:ring-violet-700 accent-violet-700"
              />
              All Sizes
            </label>
            <label className="text-white py-1 cursor-pointer">
              <input
                type="radio"
                name="size"
                value="s"
                checked={filters.size === "s"}
                onChange={handleFilterChange}
                className="mr-3 focus:ring-violet-700 accent-violet-700"
              />
              Small
            </label>
            <label className="text-white py-1 cursor-pointer">
              <input
                type="radio"
                name="size"
                value="m"
                checked={filters.size === "m"}
                onChange={handleFilterChange}
                className="mr-3 focus:ring-violet-700 accent-violet-700"
              />
              Medium
            </label>
            <label className="text-white py-1 cursor-pointer">
              <input
                type="radio"
                name="size"
                value="l"
                checked={filters.size === "l"}
                onChange={handleFilterChange}
                className="mr-3 focus:ring-violet-700 accent-violet-700"
              />
              Large
            </label>
            <label className="text-white py-1 cursor-pointer">
              <input
                type="radio"
                name="size"
                value="xl"
                checked={filters.size === "xl"}
                onChange={handleFilterChange}
                className="mr-3 focus:ring-violet-700 accent-violet-700"
              />
              X-Large
            </label>
          </div>
        </div>
      </div>


      {/* Product Grid */}
      <div className="w-3/4 left-1/4 relative p-6 mt-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
          {mensProducts.map((product) => (
            <div key={product._id} className="max-w-xs rounded-lg shadow-lg bg-gradient-to-b from-[#27285C] to-[#15142B] relative p-6">
              {/* Price Tag */}
              <div className="absolute top-0 right-0 bg-pink-500 text-white rounded-tl-lg rounded-br-lg py-2 px-4 font-bold">
                ${product.price}
              </div>

              {/* Product Image */}
              <div className="flex justify-center">
                <img
                  src={`http://localhost:5000/${product.image}`}
                  alt={product.title}
                  className="w-56 h-72 object-cover rounded-md"
                />
              </div>

              {/* Product Info */}
              <div className="text-left mt-4">
                <h2 className="text-pink-400 font-bold text-lg">{product.title}</h2>
                <p className="text-gray-400 text-sm mt-1">
                  {product.description}
                </p>

                {/* Star Rating */}
                <div className="flex items-center mt-2">
                  <span className="text-yellow-400">★★★★☆</span>
                </div>

                {/* Titles and Descriptions */}
                <div className="mt-4">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.sizes.map((size, index) => (
                      <button
                        key={index}
                        className={`px-4 py-2 rounded-full text-sm bg-pink-500 ${selectedSizes[product._id] === size
                          ? 'bg-pink-500 text-white uppercase'
                          : 'bg-zinc-900 text-gray-300 hover:bg-pink-500 uppercase'
                          }`}
                        onClick={() =>
                          setSelectedSizes((prev) => ({
                            ...prev,
                            [product._id]: size,
                          }))
                        }
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                className="mt-6 w-full bg-zinc-950 text-white py-2 rounded-lg font-base hover:bg-zinc-900"
                onClick={() => handleViewItem(product._id)}
              >
                View Item
              </button>
              {/* Add to Cart Button */}
              <button
                onClick={() => {addToCart(product);
                  window.location.reload();}
                }
                disabled={!selectedSizes[product._id]}
                className="mt-6 w-full bg-pink-500 text-white py-2 rounded-lg font-bold hover:bg-pink-600">
                ADD TO CART
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MensPage;
