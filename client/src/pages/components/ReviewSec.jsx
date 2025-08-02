import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../../App.css";

const reviews = [
  { name: "Alice", text: "TaskHive changed how I manage my tasks!" },
  { name: "Bob", text: "So intuitive and clean. Love the design!" },
  { name: "Charlie", text: "Helped me meet my deadlines efficiently." },
  { name: "Diana", text: "Fast and secure. Just what I needed." },
  { name: "Ethan", text: "Perfect task app for students and freelancers." },
  { name: "Fatima", text: "The UI is so clean, I use it every day." },
  { name: "George", text: "Highly recommend to anyone managing projects." },
  { name: "Hannah", text: "It simplified my daily to-dos!" },
  { name: "Ishan", text: "Feature-rich but simple. Excellent!" },
  { name: "Jade", text: "I’ve become more productive thanks to TaskHive." },
  { name: "Kunal", text: "Love how everything is organized." },
  { name: "Laura", text: "Tasks are now fun to complete!" },
  { name: "Manuel", text: "Great tool for remote teams too." },
  { name: "Nisha", text: "Very reliable and helpful." },
  { name: "Oscar", text: "My favorite productivity tool!" },
];

export default function ReviewsPage() {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
  const container = scrollRef.current;

  const handleScroll = () => {
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const cardWidth = container.querySelector('.review-card')?.offsetWidth || 1;
    const index = Math.round(scrollLeft / (cardWidth + 16)); 
    setActiveIndex(Math.min(index, reviews.length - 1));
  };

  container?.addEventListener("scroll", handleScroll);
  return () => container?.removeEventListener("scroll", handleScroll);
}, []);

  return (
    <div className=" bg-red-50 py-10 px-4 text-center overflow-hidden">
      <h1 className="text-4xl font-bold mb-6">What Our Users Say</h1>

      {/* scroll for small screens */}
      <div className="block md:hidden">
        <div
          className="overflow-x-auto scroll-snap-x snap-x snap-mandatory scroll-smooth"
          ref={scrollRef}
        >
          <div className="flex gap-4 w-max">
            {reviews.map((review, i) => (
              <div
                key={i}
                className="min-w-[80vw] snap-center bg-white p-6 rounded shadow review-card"
              >
                <p className="italic text-gray-700">"{review.text}"</p>
                <p className="mt-2 font-semibold text-red-600">
                  - {review.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicators */}
        <div className="flex justify-center mt-4 gap-2">
          {reviews.map((_, i) => (
            <span
              key={i}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                i === activeIndex ? "bg-red-600 scale-125" : "bg-red-200"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Infinite scroll for larger screens */}
      <div className="hidden md:block relative overflow-hidden group mt-6">
        <motion.div
          className="flex gap-6 w-max"
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        >
          {[...reviews, ...reviews].map((review, idx) => (
            <div
              key={idx}
              className=" mx-4 p-4 bg-white shadow rounded text-left"
            >
              <p className="text-gray-700 italic">"{review.text}"</p>
              <p className="mt-2 font-semibold text-red-500">- {review.name}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
