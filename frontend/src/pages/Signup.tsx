import { Link as RouterLink } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full ">
        <div className=" shadow-md rounded-lg p-6 sm:p-8">
          <div>
            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
              Sign up
            </h2>

            {/* Name Fields */}
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <input
                type="text"
                placeholder="First name"
                className="flex-1  border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                placeholder="Last name"
                className="flex-1 border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Email */}
            <input
              type="email"
              placeholder="Enter email"
              className="w-full border px-3 py-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Enter password"
              className="w-full border px-3 py-2 rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {/* Sign Up Button */}
            <button
              type="button"
              className="w-full !bg-blue-500  text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition"
            >
              Sign up
            </button>

            {/* Login Link */}
            <div className="mt-4 text-sm text-center text-gray-600">
              <span>Already have an account? </span>
              <RouterLink
                to="/auth/login"
                className="text-blue-500 hover:underline"
              >
                Login
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
