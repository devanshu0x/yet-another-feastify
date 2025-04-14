// SuccessPage.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SuccessPage = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(15);

  useEffect(() => {
    toast.success('Order placed successfully!');

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const redirectTimer = setTimeout(() => {
      navigate('/');
    }, 15000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-nyanza px-4">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md w-full">
        <h1 className="text-2xl font-bold text-coquelicot mb-4">🎉 Order Successful!</h1>
        <p className="text-gray-700 text-lg mb-2">
          Thank you for your purchase.
        </p>
        <p className="text-gray-600 mb-6">
          Redirecting to homepage in <span className="font-semibold">{countdown}</span> seconds...
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-coquelicot text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
