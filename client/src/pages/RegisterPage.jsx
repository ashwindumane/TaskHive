import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import signupimg from "../assets/signup.png";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordPattern.test(formData.password)) {
      return setError(
        "Password must contain at least one letter and one number"
      );
    }
    if (formData.number && formData.number.length < 10) {
      return setError("Please enter a valid phone number");
    }

    try {
      const payload = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        password: formData.password.trim(),
        number: formData.number.trim(),
      };

      const res = await registerUser(payload);
      login(res.data);
      toast.success("Account creation successful! Redirecting...");
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      setError(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <>
      <motion.div
        className="min-h-screen flex flex-col lg:flex-row space-x-10 items-center justify-center bg-radial from-red-50 via-white to-red-100 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 1 }}
      >
        <div>
          <img src={signupimg} className="w-full max-w-2xl" />
        </div>
        <div className="w-full max-w-lg bg-white shadow-xl shadow-red-200 rounded-xl p-8 space-y-4">
          <div
            className="text-center mb-6 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <h1 className="text-3xl font-extrabold text-red-500 tracking-wide">
              Taskverse
            </h1>
            <p className="text-sm text-gray-500 italic">
              Stay on top of your tasks
            </p>
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Create Your Account
          </h2>
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex gap-3">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="number"
              placeholder="Phone Number"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              value={formData.number}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-700"
            >
              Sign Up
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">Already have an Account?</p>
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="mt-1 text-red-500 font-medium hover:underline text-sm"
            >
              Log In
            </button>
          </div>
        </div>
      </motion.div>
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={true}
        closeOnClick
        pauseOnHover
        draggable
      />
    </>
  );
};

export default Signup;
