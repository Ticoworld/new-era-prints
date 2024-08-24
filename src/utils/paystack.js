import Swal from "sweetalert2";
import PaystackPop from "@paystack/inline-js";

export const handlePayment = async (billingAddress, products, total) => {
  const email = billingAddress.email.trim(); 
  const amount = String(total * 100); 

  if (!email || !amount) {
    return Swal.fire({
      icon: "error",
      title: "Missing Parameters",
      text: "Email or amount is missing.",
    });
  }

  try {
    // Initialize payment
    const response = await fetch(
      "http://localhost:3000/payment/initialize-payment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, amount }),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    if (!data.accessCode) {
      throw new Error(data.error || "Failed to retrieve access code");
    }

    // Initialize PaystackPop and open the payment popup
    const popup = new PaystackPop();
    popup.newTransaction({
      key: "pk_test_442fdeff7de7baa8f5af33a9ac83de5d95ff7679",
      access_code: data.accessCode,
      email: email,
      amount: amount, // Amount in kobo
      onSuccess: async (transaction) => {
        try {
          // Verify the transaction
          const verifyResponse = await fetch(
            `http://localhost:3000/payment/verify-payment/${transaction.reference}?amount=${amount}`
          );
          const verifyData = await verifyResponse.json();

          if (verifyData.success) {
            // Create the order
            const orderResponse = await fetch(
              "http://localhost:3000/user/createOrder",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "x-access-token": localStorage.getItem("token"),
                },
                body: JSON.stringify({
                  billingAddress,
                  products,
                  total,
                }),
              }
            );

            if (orderResponse.ok) {
              // Clear the cart
              const clearCartResponse = await fetch(
                "http://localhost:3000/user/clearCart",
                {
                  method: "POST",
                  headers: {
                    "x-access-token": localStorage.getItem("token"),
                  },
                }
              );

              if (clearCartResponse.ok) {
                Swal.fire({
                  icon: "success",
                  title: "Payment Successful!",
                  text: `Transaction ref: ${transaction.reference}`,
                });
              } else {
                Swal.fire({
                  icon: "warning",
                  title: "Cart Clearing Failed",
                  text: "Payment was successful, but the cart was not cleared.",
                });
              }
            } else {
              Swal.fire({
                icon: "error",
                title: "Order Creation Failed",
                text: "Payment was successful, but the order could not be created.",
              });
            }
          } else {
            Swal.fire({
              icon: "error",
              title: "Payment Verification Failed",
              text: verifyData.message,
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Verification Error",
            text: `An error occurred during verification: ${error.message}`,
          });
        }
      },
      onCancel: () => {
        Swal.fire({
          icon: "error",
          title: "Payment Cancelled",
          text: "The payment process was canceled.",
        });
      },
    });
  } catch (error) {
    console.error("Error handling payment:", error);
    Swal.fire({
      icon: "error",
      title: "Payment Error",
      text: `An error occurred: ${error.message}`,
    });
  }
};


