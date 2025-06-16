import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function ProfilePage() {
  const { user } = useContext(AuthContext);

  return (
    <div className="max-w-xl mx-auto py-10 px-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-red-500">
        Your Profile
      </h2>

      <div className="bg-white p-6 rounded shadow space-y-4 text-gray-800">
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="text-sm text-gray-500">First Name</label>
            <p className="font-medium">{user?.firstName || "N/A"}</p>
          </div>
          <div className="w-1/2">
            <label className="text-sm text-gray-500">Last Name</label>
            <p className="font-medium">{user?.lastName || "N/A"}</p>
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-500">Email</label>
          <p className="font-medium">{user?.email || "N/A"}</p>
        </div>

        <div>
          <label className="text-sm text-gray-500">Phone Number</label>
          <p className="font-medium">{user?.number || "N/A"}</p>
        </div>
      </div>
    </div>
  );
}
