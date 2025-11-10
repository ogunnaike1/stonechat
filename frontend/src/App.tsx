import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import SignUp from "./pages/auth/Signup";
import LoginForm from "./pages/auth/Login";
import ForgotPasswordForm from "./pages/ForgotPassword";
import ResetPasswordForm from "./pages/ResetPassword";
import ChatHome from "./pages/ChatHome";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/auth/login" element={<LoginForm />} />
        <Route path="/chathome" element={<ChatHome />} />
        <Route path="/reset-password" element={<ResetPasswordForm />} />
        <Route
          path="/forget-password"
          element={
            <ForgotPasswordForm
              email=""
              onSetEmail={(event) => {
                throw new Error("Function not implemented.");
              }}
              onClick={() => {
                throw new Error("Function not implemented.");
              }}
            />
          }
        />
      </Routes>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default App;
