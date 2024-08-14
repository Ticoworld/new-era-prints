import React, { useState } from "react";
import { FaTrashAlt, FaPlus, FaMinus } from "react-icons/fa";
import Swal from "sweetalert2";
import 'tailwindcss/tailwind.css';
import CustomerHeader from "../components/CustomerHeader";

const Cart = () => {
  // Example array of products with quantity
  const [cartItems, setCartItems] = useState([
    {
      name: "Business Card",
      price: 19.99,
      image: "https://via.placeholder.com/100",
      quantity: 1,
    },
    {
      name: "Flyer Design",
      price: 9.99,
      image: "https://via.placeholder.com/100",
      quantity: 1,
    },
    {
      name: "Poster Design",
      price: 14.99,
      image: "https://via.placeholder.com/100",
      quantity: 1,
    },
  ]);

  // Calculate total price
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Remove item from cart
  const removeFromCart = (index) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to remove this item from your cart?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const newCartItems = [...cartItems];
        newCartItems.splice(index, 1);
        setCartItems(newCartItems);

        Swal.fire(
          'Removed!',
          'The item has been removed from your cart.',
          'success'
        );
      }
    });
  };

  // Increment item quantity
  const incrementQuantity = (index) => {
    const newCartItems = [...cartItems];
    newCartItems[index].quantity += 1;
    setCartItems(newCartItems);
  };

  // Decrement item quantity
  const decrementQuantity = (index) => {
    const newCartItems = [...cartItems];
    if (newCartItems[index].quantity > 1) {
      newCartItems[index].quantity -= 1;
      setCartItems(newCartItems);
    }
  };

  return (
    <div>
      <CustomerHeader />
      <div className="min-h-screen bg-gray-100 p-6 dark:bg-customBlack">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Cart</h2>
          {cartItems.length > 0 ? (
            <div>
              <ul className="divide-y divide-gray-200">
                {cartItems.map((item, index) => (
                  <li key={index} className="py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 object-cover rounded-lg"
                      />
                      <div>
                        <p className="text-lg font-medium text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-600">${(item.price * item.quantity).toFixed(2)}</p>
                        <div className="flex items-center mt-2">
                          <button
                            onClick={() => decrementQuantity(index)}
                            className="bg-gray-300 text-gray-800 py-1 px-3 rounded-lg shadow-lg hover:bg-gray-400 transition"
                          >
                            <FaMinus />
                          </button>
                          <span className="mx-4 text-gray-800">{item.quantity}</span>
                          <button
                            onClick={() => incrementQuantity(index)}
                            className="bg-gray-300 text-gray-800 py-1 px-3 rounded-lg shadow-lg hover:bg-gray-400 transition"
                          >
                            <FaPlus />
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(index)}
                      className="bg-red-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-red-700 transition"
                    >
                      <FaTrashAlt />
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-4 text-right">
                <p className="text-lg font-semibold text-gray-800">
                  Total: ${totalPrice.toFixed(2)}
                </p>
                <button
                  className="mt-2 bg-green-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-green-700 transition"
                  onClick={() => window.location.href = '/checkout'}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-600">Your cart is empty.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
