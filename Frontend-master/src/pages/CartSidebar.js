import React from 'react';
import { Link } from 'react-router-dom';

const CartSidebar = ({ cart, isOpen, onClose, removeFromCart, updateQuantity }) => {
  // Calculate total price
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div
      className={`fixed top-0 right-0 w-80 h-full text-white bg-gradient-to-b from-[#27285C] to-[#15142B]  shadow-lg transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} z-50`}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Your Cart</h2>
          <button onClick={onClose} className="text-xl">
            <i className="fa fa-times"></i>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <p className="text-gray-300">Your cart is empty.</p>
          ) : (
            <div>
              {cart.map((item) => (
                <div key={`${item._id}-${item.selectedSize}`} className="flex items-center mb-4 border-b pb-4">
                  <img
                    src={`http://localhost:5000/${item.image}`}
                    alt={item.title}
                    className="w-16 h-16 object-cover mr-4"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{item.title} <br/> Size: <span className='uppercase'>{item.selectedSize}</span></h3>
                    <p className="text-gray-200">${item.price}</p>
                    <div className="flex items-center mt-2">
                      <button
                        className="bg-violet-700 px-2 py-1 rounded"
                        onClick={() => updateQuantity(item._id, item.selectedSize, -1)}
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        className="bg-violet-700 px-2 py-1 rounded"
                        onClick={() => updateQuantity(item._id, item.selectedSize, 1)}
                      >
                        +
                      </button>
                      <button
                        className="ml-4 text-red-500 text-2xl"
                        onClick={() => removeFromCart(item._id, item.selectedSize)}
                      >
                        <i class="fa fa-trash-o"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="mt-4 border-t pt-4">
                <h3 className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</h3>
                <Link to="/checkout">
                  <button className="mt-4 w-full bg-violet-700 text-white py-2 rounded">
                    Proceed to Checkout
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
