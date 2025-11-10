import { useState } from "react";
import axios from "axios";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const SignUp = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: { target: { type: string; value: any; }; }) => {
    setFormData({
      ...formData,
      [e.target.type === "text" ? "username" : e.target.type]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("http://localhost:4000/user/signup", formData);
      setMessage(res.data.message || "Sign-up successful!");

      setTimeout(() => {
        navigate("/auth/login");
      }, 1500);
      
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // This ensures 'error' is an AxiosError, so TS knows it has 'response'
        setMessage(error.response?.data?.message || "Something went wrong!");
      } else if (error instanceof Error) {
        // Generic JS error (not Axios)
        setMessage(error.message);
      } else {
        // Fallback for anything else
        setMessage("An unexpected error occurred.");
      }
    }
    
  };

  return (
<div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
  <div className="w-full max-w-md md:max-w-lg lg:max-w-xl">
    <div className="shadow-md rounded-lg p-6 sm:p-8 bg-white">
      <div>
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
          Sign up
        </h2>

        {/* userName Fields */}

        <input
            type="text"
            placeholder="Enter User Name"
            value={formData.username}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

        {/* Email */}
        <input
          type="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Sign Up Button */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition"
        >
          {loading ? "Signing up..." : "Sign up"}
        </button>

        {message && (
            <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
          )}

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
