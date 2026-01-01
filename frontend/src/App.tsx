import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/auth/Signup";
import LoginForm from "./pages/auth/Login";
import ForgotPasswordForm from "./pages/ForgotPassword";
import ResetPasswordForm from "./pages/ResetPassword";
import ChatHome from "./pages/ChatHome";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <div>
      <Routes>
        {/* PUBLIC ROUTES (blocked if logged in) */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />

        <Route
          path="/auth/login"
          element={
            <PublicRoute>
              <LoginForm />
            </PublicRoute>
          }
        />

        <Route path="/reset-password" element={<ResetPasswordForm />} />
        <Route
          path="/forget-password"
          element={
            <ForgotPasswordForm
              email=""
              onSetEmail={() => {}}
              onClick={() => {}}
            />
          }
        />

        {/* PROTECTED ROUTES */}
        <Route
          path="/chathome"
          element={
            <ProtectedRoute>
              <ChatHome />
            </ProtectedRoute>
          }
        />
      </Routes>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default App;
