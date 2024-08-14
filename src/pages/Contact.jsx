import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import 'tailwindcss/tailwind.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Contact = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleContactSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: 'success',
      title: 'Message Sent!',
      text: 'Your message has been successfully sent. We will get back to you soon.',
      timer: 3000,
      showConfirmButton: false,
    });
    setEmail('');
    setMessage('');
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: 'success',
      title: 'Subscribed!',
      text: 'You have been successfully subscribed to our newsletter.',
      timer: 3000,
      showConfirmButton: false,
    });
    setNewsletterEmail('');
  };

  const address = "152 Gado Nasko Rd, Beside NADREM Supermarket, Phase 4, Kubwa Abuja";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-customGray dark:bg-customBlack p-6">
        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-3xl font-bold text-customBlue dark:text-customOrange mb-6 text-center">Contact Us</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-customBlue dark:text-customOrange mb-4">Get in Touch</h3>
              <form onSubmit={handleContactSubmit}>
                <div className="mb-4">
                  <label className="block text-customDark text-sm font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-customDark border rounded-lg focus:outline-none focus:border-customBlue"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-customDark text-sm font-bold mb-2" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-customDark border rounded-lg focus:outline-none focus:border-customBlue"
                    rows="5"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-customBlue dark:bg-customOrange text-white py-2 px-4 rounded-lg shadow-lg hover:bg-customBlueDark transition">
                  Send Message
                </button>
              </form>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-customBlue dark:text-customOrange mb-4">Contact Information</h3>
              <ul className="space-y-4">
                <li className="flex items-center text-customDark">
                  <FaMapMarkerAlt className="text-customBlue dark:text-customOrange w-6 h-6 mr-3" />
                  <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    {address}
                  </a>
                </li>
                <li className="flex items-center text-customDark">
                  <FaPhone className="text-customBlue dark:text-customOrange w-6 h-6 mr-3" />
                  <span>08136779436, 07057341075</span>
                </li>
                <li className="flex items-center text-customDark">
                  <FaEnvelope className="text-customBlue dark:text-customOrange w-6 h-6 mr-3" />
                  <span>neweradigitalprintsintl@gmail.com</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="text-xl font-semibold text-customBlue dark:text-customOrange mb-4 text-center">Subscribe to Our Newsletter</h3>
            <form onSubmit={handleNewsletterSubmit} className="flex items-center justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                className="w-full md:w-2/3 px-3 py-2 text-customDark border rounded-l-lg focus:outline-none focus:border-customBlue"
              />
              <button
                type="submit"
                className="bg-customBlue dark:bg-customOrange text-white py-2 px-4 rounded-r-lg shadow-lg hover:bg-customBlueDark transition">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
