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

  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
    number: "",
    general: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({...errors, [name]: ""});
    }
  };

  const validatePassword = (password) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }
    if (!/[a-zA-Z]/.test(password)) {
      return "Must contain at least one letter";
    }
    if (!/[0-9]/.test(password)) {
      return "Must contain at least one number";
    }
    return "";
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {...errors};

    // Validate password
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      newErrors.password = passwordError;
      isValid = false;
    }

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    // Validate phone number if provided
    if (formData.number && formData.number.length < 10) {
      newErrors.number = "Please enter a valid 10-digit phone number";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({...errors, general: ""});

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
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
      toast.success("Account created successfully! Redirecting...");
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      setErrors({
        ...errors,
        general: err.response?.data?.msg || "Registration failed. Please try again."
      });
    } finally {
      setIsSubmitting(false);
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
          <img src={signupimg} className="w-full max-w-2xl" alt="Signup illustration" />
        </div>
        
        <div className="w-full max-w-lg bg-white shadow-xl shadow-red-200 rounded-xl p-8 space-y-4">
          <div className="text-center mb-6 cursor-pointer" onClick={() => navigate("/")}>
            <h1 className="text-3xl font-extrabold text-red-500 tracking-wide">TaskHive</h1>
            <p className="text-sm text-gray-500 italic">Stay on top of your tasks</p>
          </div>
          
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create Your Account</h2>
          
          {errors.general && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {errors.general}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex gap-3">
              <div className="w-1/2">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name *"
                  className={`w-full p-3 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-red-500`}
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="w-1/2">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email *"
                className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-red-500`}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <input
                type="tel"
                name="number"
                placeholder="Phone Number"
                className={`w-full p-3 border ${errors.number ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-red-500`}
                value={formData.number}
                onChange={handleChange}
              />
              {errors.number && <p className="text-red-500 text-xs mt-1">{errors.number}</p>}
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Password *"
                className={`w-full p-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-red-500`}
                value={formData.password}
                onChange={handleChange}
                required
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              <div className="text-xs text-gray-500 mt-1">
                Password requirements:
                <ul className="list-disc pl-5">
                  <li>At least 6 characters</li>
                  <li>At least one letter</li>
                  <li>At least one number</li>
                </ul>
              </div>
            </div>

            <div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password *"
                className={`w-full p-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-red-500`}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>

            <button
              type="submit"
              className={`w-full bg-red-500 text-white p-3 rounded hover:bg-red-700 transition ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating Account...' : 'Sign Up'}
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