import { useState } from "react";
import Footer from "./Footer";

const ResetPasswordForm = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-1 justify-center items-center px-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            Reset Password
          </h2>

          <div className="space-y-4">
            {/* Email */}
            <input
              type="email"
              placeholder="Enter email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            />

            {/* New Password */}
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                placeholder="Enter password"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-16 focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={handleClick}
                className="absolute right-3 top-2 text-sm text-blue-600 hover:underline"
              >
                {show ? "Hide" : "Show"}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                placeholder="Confirm password"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-16 focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={handleClick}
                className="absolute right-3 top-2 text-sm text-blue-600 hover:underline"
              >
                {show ? "Hide" : "Show"}
              </button>
            </div>

            {/* Submit */}
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
              Reset Password
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ResetPasswordForm;
