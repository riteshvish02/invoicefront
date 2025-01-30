import React from "react";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg w-96 text-center">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Welcome</h2>
        <p className="text-gray-600 mb-4">Choose an option to continue</p>

        <button
          onClick={() => navigate("/signin")}
          className="w-full mb-2 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Sign In
        </button>

        <button
          onClick={() => navigate("/login")}
          className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
