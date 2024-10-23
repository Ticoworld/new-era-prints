import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminAuth = ({serverUrl}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setMessage('');
    setEmail('');
    setPassword('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch(
        isLogin ? `${serverUrl}/admin/login` : `${serverUrl}/admin/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(isLogin ? 'Login successful!' : 'Registration successful!');
        setIsSuccess(true);
        if (isLogin) {
          localStorage.setItem('AdminToken', data.token);
          localStorage.setItem('expiresAt',data.expirationTime * 1000); 
          navigate('/admin'); // Redirect to the admin page
        }
      } else {
        setMessage(data.message || 'An error occurred.');
        setIsSuccess(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An unexpected error occurred.');
      setIsSuccess(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="flex justify-center">
          <button
            onClick={toggleForm}
            className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
          >
            {isLogin ? 'Go to Register' : 'Go to Login'}
          </button>
        </div>
        {message && (
          <div className={`text-center text-sm ${isSuccess ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-2xl font-bold text-center">
            {isLogin ? 'Admin Login' : 'Admin Register'}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Email:</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Password:</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAuth;
