import { useState } from "react";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-white rounded-lg shadow-md p-6">
        <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          Login
        </h2>

        <div className="space-y-4">
          {/* Email */}
          <input
            type="email"
            placeholder="Enter email"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
          />

          {/* Password */}
          <div className="flex items-center w-full border border-gray-300 rounded-lg focus-within:border-blue-500">
            <input
                type={show ? "text" : "password"}
                placeholder="Enter password"
                className="flex-1 px-4 py-2 focus:outline-none min-w-0"
            />
            <button
                type="button"
                onClick={handleClick}
                className="px-3 text-sm text-blue-600 hover:underline whitespace-nowrap"
            >
                {show ? "Hide" : "Show"}
            </button>
        </div>


          {/* Login Button */}
          <button className="w-full !bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Login
          </button>

          {/* Forgot Password */}
          <div className="text-right">
            <Link
              to="/auth/forgot-password"
              className="text-sm text-gray-500 hover:text-blue-600"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Sign up */}
          <div className="flex justify-center text-sm text-gray-500">
            <span>Don't have an account?</span>
            <Link
              to="/"
              className="ml-1 text-blue-600 hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
