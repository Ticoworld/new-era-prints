import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../components/Loader";
import PaystackPop from '@paystack/inline-js';
import { handlePayment } from "../utils/paystack";

const CheckoutPage = () => {
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
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        setLoading(true); // Set loading to true when starting fetch
        const token = localStorage.getItem("token");
        const response = await fetch(`https://new-era-server-five.vercel.app/user/getdata`, {
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
        setLoading(false); // Set loading to false after fetch is complete
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
    // Check if all fields are filled
    return Object.values(billingAddress).every(field => field.trim() !== "");
  };

  const handlePlaceOrder = () => {
    if (!validateBillingAddress()) {
      Swal.fire({
        icon: 'error',
        title: 'Incomplete Information',
        text: 'Please fill in all billing address fields before placing an order.',
      });
      return;
    }

    Swal.fire({
      title: "Place Order",
      text: `Do you want to place an order with a total amount of $${total.toFixed(2)}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, place order!",
    }).then((result) => {
      if (result.isConfirmed) {
        handlePayment(billingAddress, total); // Use the imported function
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
              {/* Billing Address Section */}
              <div className="billing-address bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  Billing Address
                </h2>
                <form>
                  {[
                    { label: "Name", name: "name", type: "text" },
                    { label: "Email", name: "email", type: "email" },
                    { label: "Phone", name: "phone", type: "tel" },
                    { label: "Address", name: "address", type: "text" },
                    { label: "City", name: "city", type: "text" },
                    { label: "State", name: "state", type: "text" },
                    { label: "Zip Code", name: "zip", type: "text" },
                  ].map(({ label, name, type }) => (
                    <div key={name} className="mb-4">
                      <label
                        className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300"
                        htmlFor={name}>
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

              {/* Order Summary Section */}
              <div className="order-summary bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  Order Summary
                </h2>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">
                    Products
                  </h3>
                  <ul className="list-disc pl-5">
                    {products.map((product, index) => (
                      <li
                        key={index}
                        className="mb-2 flex justify-between text-gray-800 dark:text-gray-100">
                        <span>{product.name}</span>
                        <span>
                          ${(product.price * product.quantity).toFixed(2)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-4 text-right">
                  <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                    Total: ${total.toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={handlePlaceOrder}
                  className="bg-green-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-green-700 transition">
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



// import Swal from 'sweetalert2';
// import PaystackPop from '@paystack/inline-js';

// export const handlePayment = async (billingAddress, total) => {
//   const email = billingAddress.email.trim(); // Ensure no extra spaces
//   const amount = String(total * 100); // Convert amount to kobo and ensure it's a string

//   if (!email || !amount) {
//     return Swal.fire({
//       icon: 'error',
//       title: 'Missing Parameters',
//       text: 'Email or amount is missing.',
//     });
//   }

//   try {
//     // Initialize payment
//     const response = await fetch('https://new-era-server-five.vercel.app/payment/initialize-payment', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email, amount }),
//     });

//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }

//     const data = await response.json();

//     if (!data.accessCode) {
//       throw new Error(data.error || 'Failed to retrieve access code');
//     }

//     // Initialize PaystackPop and open the payment popup
//     const popup = new PaystackPop();
//     popup.newTransaction({
//       key: 'pk_test_442fdeff7de7baa8f5af33a9ac83de5d95ff7679',
//       access_code: data.accessCode,
//       email: email,
//       amount: amount, // Amount in kobo
//       onSuccess: async (transaction) => {
//         // Verify the transaction
//         try {
//           const verifyResponse = await fetch(`https://new-era-server-five.vercel.app/payment/verify-payment/${transaction.reference}?amount=${amount}`);
//           const verifyData = await verifyResponse.json();

//           if (verifyData.success) {
//             // Update the purchase history
//             const historyUpdateResponse = await fetch('https://new-era-server-five.vercel.app/user/update-history', {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//                 'x-access-token': localStorage.getItem('token'), // Adjust the token retrieval based on your implementation
//               },
//               body: JSON.stringify({
//                 transactionReference: transaction.reference,
//                 amount: total,
//                 email: email
//               }),
//             });

//             const historyUpdateData = await historyUpdateResponse.json();

//             if (historyUpdateResponse.ok) {
//               Swal.fire({
//                 icon: 'success',
//                 title: 'Payment Successful!',
//                 text: `Transaction ref: ${transaction.reference}`,
//               });
//             } else {
//               Swal.fire({
//                 icon: 'error',
//                 title: 'History Update Failed',
//                 text: historyUpdateData.message || 'Failed to update purchase history',
//               });
//             }
//           } else {
//             Swal.fire({
//               icon: 'error',
//               title: 'Payment Verification Failed',
//               text: verifyData.message,
//             });
//           }
//         } catch (error) {
//           Swal.fire({
//             icon: 'error',
//             title: 'Verification Error',
//             text: `An error occurred during verification: ${error.message}`,
//           });
//         }
//       },
//       onCancel: () => {
//         Swal.fire({
//           icon: 'error',
//           title: 'Payment Cancelled',
//           text: 'The payment process was canceled.',
//         });
//       },
//     });
//   } catch (error) {
//     console.error('Error handling payment:', error);
//     Swal.fire({
//       icon: 'error',
//       title: 'Payment Error',
//       text: `An error occurred: ${error.message}`,
//     });
//   }
// };


