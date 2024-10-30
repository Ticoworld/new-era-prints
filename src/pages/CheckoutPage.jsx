import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../components/Loader";

const CheckoutPage = ({serverUrl}) => {
  const [billingAddress, setBillingAddress] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("Usertoken");
        const response = await fetch(`${serverUrl}/user/getdata`, {
          headers: { "x-access-token": token },
        });
        const data = await response.json();
        if (data.success) {
          const cartItems = data.cartItems || [];
          setProducts(cartItems);
          const totalPrice = cartItems.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
          );
          setTotal(totalPrice);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleAddressChange = (e) => {
    setBillingAddress({
      ...billingAddress,
      [e.target.name]: e.target.value,
    });
  };

  const validateBillingAddress = () => {
    return Object.values(billingAddress).every((field) => field.trim() !== "");
  };

  const updateOrder = async()=>{
    try {
        const token = localStorage.getItem('Usertoken');
    const response = await fetch(`${serverUrl}/user/createOrder`,{
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        "x-access-token": token
      }, 
      body: JSON.stringify({
        products: products, 
        billingAddress: billingAddress,
        total: total
      })
    });
    const data = await response.json();
    if(data.success) {
      console.log('');
    }
    } catch (error) {
      
    }
  }

  const handlePlaceOrder = () => {
    if (!validateBillingAddress()) {
      Swal.fire({
        icon: "error",
        title: "Incomplete Information",
        text: "Please fill in all billing address fields before placing an order.",
      });
      return;
    }

    Swal.fire({
      title: "Place Order",
      text: `Do you want to place this order`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, place order!",
    }).then((result) => {
      if (result.isConfirmed) { 
        
        updateOrder()
        // Construct the message for WhatsApp
        const orderMessage = `
        Hello, I would like to place an order. Here are my details and the items I want to purchase:
      
        *My Details:*
        - Name: ${billingAddress.name}
        - Email: ${billingAddress.email}
        - Phone: ${billingAddress.phone}
        - Address: ${billingAddress.address}, ${billingAddress.city}, ${billingAddress.state}, ${billingAddress.zip}
      
        *Products I Want to Buy:*
        ${products.map((product) => {
          return `
            - ${product.quantity} x ${product.name} -
            ${product.image ? `Image: ${product.image}` : ''}
          `;
        }).join("\n")}
      
      
        Please confirm the order and let me know if you need any further details. Thank you!
      `;
      

        // Encode the message to be URL-safe
        const encodedMessage = encodeURIComponent(orderMessage);

        // Replace `ADMIN_PHONE_NUMBER` with the admin's WhatsApp number (in international format)
        const whatsappLink = `https://wa.me/+2348136779436?text=${encodedMessage}`;

        // Open the WhatsApp link
        window.open(whatsappLink, "_blank");
      }
    });
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-100 p-6 dark:bg-customBlack">
        {loading ? (
          <Loader />
        ) : (
          <div className="max-w-8xl mx-auto bg-white shadow-lg rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="billing-address bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  Billing Address
                </h2>
                <form>
                  {[{ label: "Name", name: "name", type: "text" }, { label: "Email", name: "email", type: "email" }, { label: "Phone", name: "phone", type: "tel" }, { label: "Address", name: "address", type: "text" }, { label: "City", name: "city", type: "text" }, { label: "State", name: "state", type: "text" }, { label: "Zip Code", name: "zip", type: "text" }].map(({ label, name, type }) => (
                    <div key={name} className="mb-4">
                      <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300" htmlFor={name}>
                        {label}
                      </label>
                      <input
                        type={type}
                        id={name}
                        name={name}
                        value={billingAddress[name]}
                        onChange={handleAddressChange}
                        className="border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  ))}
                </form>
              </div>

              <div className="order-summary bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Order Summary</h2>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">Products</h3>
                  <ul className="list-disc pl-5">
                    {products.map((product, index) => (
                      <li key={index} className="mb-2 flex justify-between text-gray-800 dark:text-gray-100"> 
                        <div>
                          <span>{product.name}</span>
                        <div><img src={product.image} alt="" className="w-16 h-16"/></div>
                        </div>
                        
                        {/* <span>₦{(product.price * product.quantity).toFixed(2)}</span> */}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-4 text-right">
                  {/* <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">Total: ₦{total.toFixed(2)}</p> */}
                </div>
                <button
                  onClick={handlePlaceOrder}
                  className="bg-green-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-green-700 transition"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
