import React, { useState, useEffect } from "react";
import { FaCartPlus } from "react-icons/fa";
import { useUser } from "../pages/Shop"; 

const CustomerDashboard = ({serverUrl}) => {
  const [cart, setCart] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [products, setProducts] = useState([])
  const user = useUser()
  
  const fetchProducts = async() =>{
    try {
      const response = await fetch(`${serverUrl}/product/getproducts`, {
        method: 'GET',
        headers: {
          "Content-Type" : "application/json"
        },
      })
      const data = await response.json()
      setProducts(data)
    }
    catch(error){
      console.log(error);
    }
  }


  // Fetch the current cart items from the backend on component mount
  useEffect(() => {
    
    // Only update cart if user and cartItems are available
    if (user && user.cartItems) {
      setCart(user.cartItems);
    }

    fetchProducts();  
  }, [user]);

  // Add item to cart
  const addToCart = async (item) => {
    try {
      const response = await fetch(`${serverUrl}/user/updateCart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('Usertoken'), // Assuming token is stored in localStorage
        },
        body: JSON.stringify({
          cartItems: [...cart, item], // Add the new item to the current cart
        }),
      });
      const data = await response.json();
      if (data.success) {
        setCart([...cart, item]); // Update the local cart state
        setSuccessMessage('Item added to cart successfully!');
        setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
      } else {
        console.error('Error adding item to cart:', data.message);
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  return ( 
    
    <div className="min-h-screen bg-gray-100 dark:bg-black">
      {
        products && 
        <div className="p-6">
        <div className="bg-white dark:bg-black shadow-lg rounded-lg p-6">
          
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 dark:text-customBlue">Our Services</h2>
          {successMessage && (
            <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg">
              {successMessage}
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {
              products.map((item) => (
              <div key={item._id} className="bg-white rounded-lg shadow-lg p-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-48 w-full object-cover rounded-t-lg"
                />
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-gray-600">₦{item.price.toFixed(2)}</p>
                  <button
                    onClick={() => addToCart(item)}
                    className="mt-2 bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700 transition"
                  >
                    <FaCartPlus className="inline mr-2" />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
            }
          </div>
        </div>
      </div>
      }
      
    </div>
  );
};

export default CustomerDashboard;
