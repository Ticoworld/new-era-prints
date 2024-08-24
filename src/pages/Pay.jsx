import React, { useState } from "react";
import Swal from 'sweetalert2';
const PaystackPop = (await import('@paystack/inline-js')).default;


const Pay = () => {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');

  const handlePayment = async (e) => {
    e.preventDefault(); // Prevent the form from submitting

    const amountInKobo = String(amount * 100); // Convert to kobo and ensure it's a string
    const emailString = email.trim(); // Ensure email is a trimmed string

    if (!emailString || !amountInKobo) {
      console.error('Email or amount is missing.');
      return;
    }

    try {
      // Send a request to the backend to initialize the payment
      const response = await fetch('https://new-era-server-five.vercel.app/payment/initialize-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailString, amount: amountInKobo }), // Send data as JSON with strings
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (!data.accessCode) {
        throw new Error(data.error || 'Failed to retrieve access code');
      }

      // Open Paystack payment page
      const PaystackPop = (await import('@paystack/inline-js')).default;
      const popup = new PaystackPop();
      popup.newTransaction({
        key: 'pk_test_442fdeff7de7baa8f5af33a9ac83de5d95ff7679',
        access_code: data.accessCode,
        onSuccess: async (transaction) => {
          // Payment was successful, verify it
          const verificationResponse = await fetch(`https://new-era-server-five.vercel.app/payment/verify-payment/${transaction.reference}?amount=${amountInKobo}`);
          const verificationData = await verificationResponse.json();

          if (verificationData.success) {
            console.log('Payment Verified:', verificationData.transactionData);
          } else {
            console.error('Verification failed:', verificationData.message);
          }
        },
        onCancel: () => {
          console.error('Payment was canceled.');
        },
      });
    } catch (error) {
      console.error('Error handling payment:', error.message);
    }
  };

  return (
    <div>
      <form className="p-10" onSubmit={handlePayment}>
        <label htmlFor="email">Email:</label>
        <input 
          type="email" 
          className="p-2 mt-2 border-2" 
          id="email" 
          name="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
        <br />
        <label htmlFor="amount">Amount:</label>
        <input 
          type="number" 
          className="p-2 mt-2 border-2" 
          id="amount" 
          name="amount" 
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required 
        />
        <br />
        <button type="submit" className="bg-black text-white p-3">
          Pay
        </button>
      </form>
    </div>
  );
};

export default Pay;
