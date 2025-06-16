import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import Form from "./TaskForm"

export default function NewButtonWithModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center border border-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-100 transition bg-transparent"
      >
        <span className="mr-2">New</span>
        <div className="w-px h-5 bg-gray-300 mx-2"></div>
        <FaPlus />
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-md bg-opacity-30 flex justify-center items-center z-50">
          <div className=" w-100 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
            >
              &times;
            </button>
            <Form/>
          </div>
        </div>
      )}
    </div>
  );
}
