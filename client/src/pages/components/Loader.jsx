import React from "react";

const Loader = () => (
  <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-red-500 border-solid"></div>
  </div>
);

export default Loader;
