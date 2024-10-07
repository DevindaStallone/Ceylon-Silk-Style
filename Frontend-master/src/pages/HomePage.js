import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BackgroundGradientAnimation } from "../components/ui/background-gradient-animation";
import { PinContainer } from "../components/ui/3d-pin";
import mens from '../assets/images/men.png';
import womens from '../assets/images/women.png';
import logo from '../assets/images/logo.png';

const HomePage = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [randomProducts, setRandomProducts] = useState([]); // Store random products
  const [selectedSizes, setSelectedSizes] = useState({}); // Track selected sizes per product
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Fetch product details by ID if required
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        console.log('Fetched product:', response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        console.log('Fetched products:', response.data);
        setProducts(response.data);

        // Set the random products when products are fetched
        const shuffledProducts = getRandomProducts(response.data, 4);
        setRandomProducts(shuffledProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Function to shuffle and limit displayed products (for "Most Popular")
  const getRandomProducts = (productsArray, count) => {
    const shuffled = [...productsArray].sort(() => 0.5 - Math.random()); // Shuffle array
    return shuffled.slice(0, count); // Return the top 'count' items
  };

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

  

  return (
    <div className="home-page">
      {/* Hero Section */}
      <BackgroundGradientAnimation>
        <div className="absolute z-40 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-8xl text-center md:text-4xl lg:text-9xl">
          <p className="bg-clip-text text-transparent  drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
            CEYLON SILK STYLE
            <img src={logo} alt="Logo" className='z-10 absolute -top-36 left-1/4 pl-8' />
          </p>
        </div>
      </BackgroundGradientAnimation>

      {/* Product List Section */}
       <div className="min-h-screen bg-black py-10">
        <div className="container mx-auto">
          <h1 className="text-7xl font-bold text-white text-center mb-8">Most Popular</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
            {randomProducts.map((product) => (
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

      <div className="min-h-screen bg-gradient-to-b from-[#27285C] to-[#15142B]  py-10">
        <div className="container mx-auto">
          <div className="h-[40rem] w-full flex items-center justify-center z-40 grid grid-cols-2">
            <PinContainer title="MENS" href="/mens">
              <div
                className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[40rem] h-[35rem] ">
                <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-4xl text-slate-100">
                  Mens Wear
                </h3>
                <div className="text-base !m-0 !p-0 font-normal">
                  <img src={mens} alt="Mens Wear" />
                </div>
              </div>
            </PinContainer>
            <PinContainer title="WOMENS" href="/women">
              <div
                className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[40rem] h-[35rem] ">
                <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-4xl text-slate-100">
                  Womens Wear
                </h3>
                <div className="text-base !m-0 !p-0 font-normal">
                  <img src={womens} alt="Womens Wear" />
                </div>
              </div>
            </PinContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
