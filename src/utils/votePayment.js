import Swal from 'sweetalert2';
import PaystackPop from '@paystack/inline-js';
const serverUrl = import.meta.env.VITE_API_BASE_URL;

export const handlePayment = async (email, amount, name, contestantUsername, votes) => {
  try {
    // Notify user about the payment initialization
    Swal.fire({
      title: 'Initializing Payment',
      text: 'Please wait while we set up your payment.',
      icon: 'info',
      showConfirmButton: false,
      timer: 2000, // Show the message for 2 seconds
    });

    // Initialize payment
    const response = await fetch(`${serverUrl}/payment/vote-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, amount, name, username: contestantUsername, votes }),
    });

    if (!response.ok) {
      throw new Error('Failed to initialize payment');
    }

    const data = await response.json();

    if (!data.accessCode) {
      throw new Error(data.error || 'Failed to retrieve access code');
    }

    return new Promise((resolve, reject) => {
      const popup = new PaystackPop();
      popup.newTransaction({
        key: 'pk_test_442fdeff7de7baa8f5af33a9ac83de5d95ff7679',
        access_code: data.accessCode,
        email: email,
        amount: String(amount * 100), // Amount in kobo
        onSuccess: async (transaction) => {
          // Notify user about the payment success
          Swal.fire({
            title: 'Payment Successful',
            text: `Your payment of ${amount.toFixed(2)} has been processed successfully.`,
            icon: 'success',
            confirmButtonText: 'OK',
          });

          // Verify the payment
          try {
            const verifyResponse = await fetch(`https://new-era-server-five.vercel.app/payment/verify-vote-payment/${transaction.reference}?amount=${amount * 100}`, {
              method: 'GET',
            });

            if (!verifyResponse.ok) {
              throw new Error('Failed to verify payment');
            }

            const result = await verifyResponse.json();

            if (result.success) {
              // Update the contestant with the name and number of votes
              const updateResponse = await fetch('https://new-era-server-five.vercel.app/contestant/update-votes', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'x-access-token': localStorage.getItem('token'), // Adjust the token retrieval based on your implementation
                },
                body: JSON.stringify({
                  username: contestantUsername,
                  name: name,
                  votes: votes || 2, // Adjust as needed
                }),
              });

              const updateData = await updateResponse.json();

              if (updateResponse.ok) {
                resolve({ success: true });
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Contestant Update Failed',
                  text: updateData.message || 'Failed to update contestant data',
                });
                reject(new Error(updateData.message || 'Failed to update contestant data'));
              }
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Payment Verification Failed',
                text: result.message,
              });
              reject(new Error(result.message || 'Payment verification failed'));
            }
          } catch (error) {
            Swal.fire({
              title: 'Error',
              text: `An error occurred during verification: ${error.message}`,
              icon: 'error',
              confirmButtonText: 'OK',
            });
            reject(error);
          }
        },
        onCancel: () => {
          Swal.fire({
            title: 'Payment Cancelled',
            text: 'You have cancelled the payment.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
          reject(new Error('Payment was canceled'));
        },
      });
    });
  } catch (error) {
    Swal.fire({
      title: 'Error',
      text: `An error occurred: ${error.message}`,
      icon: 'error',
      confirmButtonText: 'OK',
    });

    throw error;
  }
};
