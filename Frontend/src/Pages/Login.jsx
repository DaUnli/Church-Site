import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Password from "../components/Password";
import Navbar from "../components/Navbar";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../components/Footer";
import axiosInstance from "../utils/axiosInstance";

AOS.init({ duration: 1200, once: true });

const FORM_BACKGROUND_CLASS = "bg-black/50 backdrop-blur-sm";

const Login = () => {
  const [idNumber, setIdNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!idNumber) {
      setError("Please enter a valid ID Number");
      return;
    }
    if (!password) {
      setError("Please enter a valid password");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const response = await axiosInstance.post("/login", {
        idNumber: idNumber,
        password: password,
      });

      if (response.data && response.data.error) {
        setError(response.data.message);
        setLoading(false);
        return;
      }

      if (response.data && response.data.message) {
        setError("Registration successful. Please log in.");
        setLoading(false);
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
        return;
      }

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);        
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div
        className="relative bg-cover bg-center bg-no-repeat h-screen flex items-center justify-center flex-grow py-20"
        style={{ backgroundImage: "url('/images/image.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60 z-0"></div>

        <div
          className={`relative z-10 w-full max-w-md p-8 rounded-lg ${FORM_BACKGROUND_CLASS} border-2 border-yellow-600 text-white shadow-2xl`}
        >
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <h4 className="text-3xl font-extrabold text-center mb-6 text-yellow-600">
              MEMBER LOGIN
            </h4>

            <input
              type="text"
              placeholder="ID Number"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              className="w-full px-4 py-2 rounded bg-white/10 border border-yellow-600 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-yellow-600 transition"
            />

            <Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              inputClass="w-full px-4 py-2 rounded bg-white/10 border border-yellow-600 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-yellow-600 transition"
            />

            {error && (
              <p className="text-red-400 text-sm font-medium text-center">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full font-bold py-3 px-4 rounded transition-colors duration-200 ${
                loading
                  ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                  : "bg-yellow-600 text-gray-900 hover:bg-yellow-400 shadow-lg"
              }`}
            >
              {loading ? "AUTHENTICATING..." : "LOGIN"}
            </button>

            <p className="text-center text-gray-200">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                className="text-yellow-400 font-bold hover:text-yellow-300 transition"
              >
                Register Here
              </Link>
            </p>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
