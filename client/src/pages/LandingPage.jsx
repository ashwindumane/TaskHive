import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../App.css";
import bgimage from "../assets/intro-mobile.png";
import Reviews from "./components/ReviewSec";
import { FaTasks, FaUserCircle, FaShieldAlt } from "react-icons/fa";
import logo from "../assets/logo1.png";

export default function LandingPage() {
  return (
    <div className="font-sans text-gray-800 bg-white">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col lg:flex-row justify-center items-center text-center px-5 py-4 lg:py-0 bg-cover bg-white hero">
        <div className="text-left max-w-md">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex space-x-6"
          >
            <motion.img className="w-15 h-15" src={logo} />
            <h1 className="text-4xl sm:text-5xl font-extrabold text-red-500 mb-4 font-serif">
              Taskverse
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-base sm:text-lg mb-6 text-gray-800"
          >
            Organize, track and complete your tasks with the most intuitive task
            manager.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 border rounded-md w-full sm:w-64"
            />
            <Link
              to="/register"
              className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-700 w-full sm:w-auto text-center"
            >
              Get Started!
            </Link>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="w-full lg:w-1/2 flex justify-center items-center mb-6 lg:mb-0"
        >
          <img
            src={bgimage}
            alt="intro"
            className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl rounded-lg object-cover"
          />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-10 px-6 bg-white text-center" id="features">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-10"
        >
          Features
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <FaTasks size={30} />,
              title: "Task Management",
              desc: "Create, edit, complete, and delete tasks easily.",
            },
            {
              icon: <FaUserCircle size={30} />,
              title: "User Dashboard",
              desc: "Clean and personalized dashboard to manage your work.",
            },
            {
              icon: <FaShieldAlt size={30} />,
              title: "Fast & Secure",
              desc: "Fast performance with secure authentication.",
            },
           
          ].map((feature, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-lg shadow-lg shadow-red-200 hover:shadow-xl p-6 transition transform hover:scale-105 duration-500 group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
            >
              <div className="flex items-center justify-center mb-4">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-transparent text-red-500 border border-red-500 transition-all duration-300 group-hover:bg-red-500 group-hover:text-white">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews">
        <Reviews />
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6 bg-white" id="faqs">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center mb-10"
        >
          FAQs
        </motion.h2>
        <div className="max-w-3xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h4 className="text-lg font-semibold text-red-500">
              Is Taskverse free to use?
            </h4>
            <p className="text-gray-700">
              Yes, it's completely free for all users.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h4 className="text-lg font-semibold text-red-500">
              Can I use Taskverse on mobile?
            </h4>
            <p className="text-gray-700">
              Yes, the UI is responsive and works great on all devices.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center bg-gray-100 text-gray-600">
        <p>&copy; {new Date().getFullYear()} Taskverse. All rights reserved.</p>
      </footer>
    </div>
  );
}
