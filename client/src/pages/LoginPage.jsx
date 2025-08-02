import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import sideimg from "../assets/login.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const res = await loginUser({ email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      login(res.data);
      navigate("/dashboard", { state: { backgroundLoading: true } });
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setIsLoading(true);
    setError("");
    
    try {
      const res = await loginUser({
        email: "guest@taskhive.com",
        password: "guest123",
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      login(res.data);
      navigate("/dashboard", { state: { backgroundLoading: true } });
    } catch (err) {
      setError("Guest login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col lg:flex-row space-x-10 items-center justify-center bg-radial from-red-50 via-white to-red-100 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 1 }}
    >
      <div>
        <img src={sideimg} className="w-full max-w-xl" alt="Login illustration" />
      </div>
      <div className="w-full max-w-md shadow-xl shadow-red-200 rounded-xl p-8">
        <div className="text-center mb-6 cursor-pointer" onClick={() => navigate("/")}>
          <h1 className="text-3xl font-extrabold text-red-500 tracking-wide">TaskHive</h1>
          <p className="text-sm text-gray-500 italic">Stay on top of your tasks</p>
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login to Your Account
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />

          <button
            type="submit"
            className={`w-full bg-red-500 hover:bg-red-700 text-white p-3 rounded-md font-semibold transition duration-200 ${
              isLoading ? "opacity-75 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">New to TaskHive?</p>
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="mt-1 text-red-500 font-medium hover:underline text-sm"
            disabled={isLoading}
          >
            Register here
          </button>
          <button
            onClick={handleGuestLogin}
            className={`mt-4 w-full text-red-500 hover:underline font-medium p-2 rounded-md text-sm ${
              isLoading ? "opacity-75 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Connecting as Guest..." : "Continue as Guest"}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginPage;