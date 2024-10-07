import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { TruckIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { wrap } from 'framer-motion';

const ProductDetailPage = () => {
  const { id } = useParams(); // Get product ID from URL params
  const [product, setProduct] = useState(null);
  const [selectedSizes, setSelectedSizes] = useState({}); // Track selected sizes per product
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [reviews, setReviews] = useState([]); // Placeholder for reviews

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    const fetchReviews = async () => {
      // Replace with real API request to fetch product reviews
      setReviews([
        { user: 'John', rating: 4, comment: 'Great product!' },
        { user: 'Jane', rating: 5, comment: 'Loved it, highly recommend!' }
      ]);
    };

    fetchProduct();
    fetchReviews();
  }, [id]);


  // Function to add items to the cart
  const addToCart = (product) => {
    const size = selectedSizes[product._id];

    if (!size) {
      alert('Please select a size before adding to cart.');
      return;
    }

    // Check if the product with the same size is already in the cart
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

    // Optionally, reset the selected size for the product
    setSelectedSizes((prev) => ({
      ...prev,
      [product._id]: '',
    }));
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="min-h-screen  flex justify-center py-10 pt-24 flex-wrap grid bg-gradient-to-b from-[#27285C] to-[#15142B] ">
      <div className="shadow-md rounded-lg flex max-w-7xl w-full p-6 bg-zinc-950">
        {/* Product Image */}
        <div className="w-1/2 pr-6">
          <img
            src={`http://localhost:5000/${product.image}`}
            alt={product.title}
            className="h-auto w-full object-cover rounded-md "
          />
        </div>

        {/* Product Details */}
        <div className="w-1/2 pl-6 flex flex-col">
          <div>
            <h2 className="text-3xl font-bold text-gray-300 mb-4">{product.title}</h2>
            <p className=" text-gray-400 font-bold text-2xl mb-4">${product.price}</p>

            {/* Size Selection */}
            <div className="mb-4">
              <h3 className="text-gray-600 font-semibold mb-2">Available Sizes:</h3>
              <div className="flex gap-2">
                {product.sizes.map((size, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 rounded-full text-sm bg-rose-900 ${selectedSizes[product._id] === size
                      ? 'bg-rose-800 text-white uppercase'
                      : 'bg-zinc-900 text-gray-300 hover:bg-rose-800 uppercase'
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

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => {
                  addToCart(product);
                  window.location.reload();
                }}
                disabled={!selectedSizes[product._id]}
                className={`w-36 py-2 px-4 rounded-md shadow-sm ${!selectedSizes[product._id]
                  ? 'bg-rose-800 cursor-not-allowed'
                  : 'bg-rose-800 hover:bg-rose-900'
                  } text-white focus:outline-none focus:ring-2 focus:ring-green-500`}
              >
                Add to Cart
              </button>

            </div>
          </div>
          <div className="mt-5 p-4 rounded-lg flex flex-col space-y-4 border-white w-3/4 border ">
            {/* Free Shipping */}
            <div className="flex items-center space-x-4">
              <TruckIcon className="h-8 w-8 text-white" />
              <div className="text-sm">
                <span className="font-semibold">Free shipping</span> on orders over <span className="font-semibold">$5,000</span>
              </div>
            </div>

            <hr className="border-gray-300" />

            {/* Easy Returns */}
            <div className="flex items-center space-x-4">
              <ArrowPathIcon className="h-8 w-8 text-white" />
              <div className="text-sm">
                <span className="font-semibold">Easy returns</span>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="mt-3 text-justify">
            <h3 className="text-gray-300 font-semibold mb-2">Product Description</h3>
            <p className="text-gray-400" style={{ width: "65ch", wordWrap: "break-word" }}>{product.description}<br /><br/>
              Performance meets style in every detail. <br />

              <span className='font-bold'>Snug and Athletic Fit </span>designed to contour your body, offering both comfort and a sleek appearance.<br/>
              <span className='font-bold'>Modern Design Elements</span> include a gradient pattern that transitions smoothly from a darker shade at the bottom to a lighter shade at the top, creating a visually striking look. The 1/4 zip closure adds functionality and style, allowing for adjustable ventilation and easy wear.<br/>
              <span className='font-bold'>Versatile Single Jersey Fabric </span>provides lightweight comfort, making this top perfect for various activities.<br/><br/>
              Product Details:<br/>

              <span className='font-bold'>Fabric:</span> Single Jersey for a soft, breathable feel.<br/>
              <span className='font-bold'>Material Composition: </span>60% Polyester, 40% Nylon.<br/>
              <span className='font-bold'>Fabric Weight:</span> 160 GSM for a lightweight, breathable fit.<br/>
              <span className='font-bold'>Functionality:</span> Moisture-wicking fabric keeps you dry, while the four-way stretch ensures ease of movement.<br/>
              <span className='font-bold'>Materials & Care:</span> Hand or Machine wash cold. Do not bleach.
              </p> {/* Add a longer description */}
          </div>
        </div>
      </div>

      {/* Reviews and Feedback Section */}
      <div className="bg-zinc-950 shadow-md rounded-lg max-w-7xl w-full mt-10 p-6">
        <h3 className="text-2xl font-bold text-gray-300 mb-4">Customer Reviews</h3>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="border-b border-gray-200 py-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-400">{review.user}</span>
                <span className="text-yellow-500">
                  {'★'.repeat(review.rating)}{' '}
                  {'☆'.repeat(5 - review.rating)}
                </span>
              </div>
              <p className="text-gray-500 mt-2">{review.comment}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
