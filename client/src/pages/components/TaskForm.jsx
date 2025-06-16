import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineCancel } from "react-icons/md";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); if (!title.trim()) {
    toast.error("Please enter a task title");
    return;
  }
    onAdd({ title, priority, dueDate });
    setTitle("");
    setPriority("Low");
    setDueDate("");
    toast.success("Task Added!");
    setIsOpen(false);
  };

  return (
    <div>
      {/* Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center border border-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-100 transition bg-white"
      >
        <span className="mr-2">Create New Task</span>
        <div className="w-px h-5 bg-gray-300 mx-2"></div>
        <FaPlus />
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60  flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-white"
              initial={{ scale: 0.8, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 30, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
              >
                <MdOutlineCancel size={25}/>
              </button>
              <form
                onSubmit={handleSubmit}
                className=" bg-white shadow p-8 rounded mb-6"
              >
                <div className="mb-5 border-b">
                  <h1 className="font-bold text-xl mb-4 flex justify-center">
                    Create Task
                  </h1>
                </div>
                <input
                  type="text"
                  placeholder="Title"
                  name="title"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 mb-2"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <select
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 mb-2"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
                <input
                  type="date"
                  placeholder="Due Date"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 mb-2"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </form>
              <div className="mt-2 flex px-5 pb-2 justify-between">
                  <button
                    onClick={handleSubmit}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Add Task
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={true}
        closeOnClick
        pauseOnHover
        draggable
      />
    </div>
  );
}
