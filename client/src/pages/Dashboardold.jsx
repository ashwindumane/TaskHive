import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Taskform from "./components/TaskForm";
import { motion } from "framer-motion";
import { FaSave, FaEdit, FaUndoAlt, FaCheck } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import Notasks from "../assets/undraw_web-search_9qqc.png";
import Loader from "./components/Loader";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTask, setEditTask] = useState({
    title: "",
    priority: "Low",
    dueDate: "",
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-500 text-white";
      case "Medium":
        return "bg-yellow-400 text-gray-800";
      case "Low":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-300 text-black";
    }
  };

  useEffect(() => {
    if (!user) navigate("/login");
    else fetchTasks();
  }, [user]);

  const fetchTasks = async () => {
    setLoading(true);
    setTimeout(async() =>{
    try {
      const res = await axios.get("https://taskverse-cy53.onrender.com/api/tasks", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setTasks(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
    finally {
          setLoading(false);
        }
    },500);
  };

  const handleCreate = async (task) => {
    if (!task.title.trim()) return;
    try {
      const res = await axios.post("https://taskverse-cy53.onrender.com/api/tasks", task, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setTasks([...tasks, res.data]);
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://taskverse-cy53.onrender.com/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const res = await axios.put(
        `https://taskverse-cy53.onrender.com/api/tasks/${id}`,
        editTask,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
      setEditingTaskId(null);
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const handleComplete = async (id, completed) => {
    try {
      const res = await axios.put(
        `https://taskverse-cy53.onrender.com/api/tasks/${id}`,
        { completed: !completed },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  return (
    <>
     {loading && <Loader />}
    <motion.div
      className="min-h-screen bg-radial from-red-50 via-white to-red-100 px-4 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 1 }}
    >
      <header>
        <h2 className="text-xl font-bold mt-2 sm:mt-0 text-center sm:text-left">
          Welcome, {user?.firstName}!
        </h2>
      </header>

      <section className=" mt-4  mb-10 w-full  px-4">
        <div>
          <Taskform onAdd={handleCreate} />
        </div>
      </section>

      <section>
        <h1 className="text-xl font-bold mb-2">Your Tasks</h1>
        {tasks.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 gap-6 mb-10 w-full px-2 sm:px-4">
            {tasks.map((task) => (
              <li
                key={task._id}
                className={`border-2 border-l-10 shadow-md rounded-lg p-6 hover:shadow-xl transition duration-300 transform hover:scale-105 ${
                  task.completed
                    ? "border-green-500 hover:shadow-green-200 "
                    : "border-red-500 hover:shadow-red-200"
                }`}
              >
                {editingTaskId === task._id ? (
                  <>
                    <input
                      value={editTask.title}
                      onChange={(e) =>
                        setEditTask({ ...editTask, title: e.target.value })
                      }
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 mb-2"
                    />
                    <select
                      value={editTask.priority}
                      onChange={(e) =>
                        setEditTask({ ...editTask, priority: e.target.value })
                      }
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 mb-2"
                    >
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                    </select>
                    <input
                      type="date"
                      value={editTask.dueDate}
                      onChange={(e) =>
                        setEditTask({ ...editTask, dueDate: e.target.value })
                      }
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 mb-2"
                    />
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-start mb-1">
                      <h4
                        className={`text-lg font-semibold mb-1 break-words ${
                          task.completed ? "line-through text-gray-600" : ""
                        }`}
                      >
                        {task.title}
                      </h4>
                      {task.completed ? (
                        <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded-full ml-2">
                          Completed
                        </span>
                      ) : (
                        <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full ml-2">
                          Due
                        </span>
                      )}
                    </div>
                    <div className="flex space-x-5">
                      <p className="text-sm text-gray-700 mb-1 break-words">
                        Priority:
                        <span
                          className={`text-xs mx-1 px-2 py-0.5 rounded-full  ${getPriorityColor(
                            task.priority
                          )}`}
                        >
                          {task.priority}
                        </span>
                      </p>
                      {task.dueDate && (
                        <p className="text-sm text-gray-700 mb-1 break-words">
                          Due: {task.dueDate.slice(0, 10)}
                        </p>
                      )}
                    </div>
                  </>
                )}
                <div className="space-x-2 mt-3 flex flex-row">
                  {editingTaskId === task._id ? (
                    <button
                      onClick={() => handleUpdate(task._id)}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      <FaSave />
                    </button>
                  ) : (
                    <>
                      <button
                        data-tooltip-id="infoTip"
                        data-tooltip-content="Edit this task!"
                        onClick={() => {
                          setEditingTaskId(task._id);
                          setEditTask({
                            title: task.title,
                            priority: task.priority,
                            dueDate: task.dueDate?.slice(0, 10),
                          });
                        }}
                        className=" text-yellow-500 px-2 py-1 rounded cursor-pointer"
                      >
                        <FaEdit size={20} />
                      </button>
                      <Tooltip
                        id="infoTip"
                        place="top"
                        variant="info"
                        className="!bg-yellow-600 !text-white text-sm px-2 py-1 !rounded"
                      />
                    </>
                  )}
                  <>
                    <button
                      data-tooltip-id={`complete-tip-${task._id}`}
                      data-tooltip-content={
                        task.completed
                          ? "Mark as Incomplete"
                          : "Mark as Complete"
                      }
                      onClick={() => handleComplete(task._id, task.completed)}
                      className="text-green-500 px-2 py-1 rounded cursor-pointer"
                    >
                      {task.completed ? (
                        <FaUndoAlt size={20} />
                      ) : (
                        <FaCheck size={20} />
                      )}
                    </button>

                    <Tooltip
                      id={`complete-tip-${task._id}`}
                      place="top"
                      className="!bg-green-500 !text-white text-sm px-2 py-1 rounded"
                    />
                  </>

                  <>
                    <button
                      data-tooltip-id="delete-tip"
                      data-tooltip-content="Delete task"
                      onClick={() => handleDelete(task._id)}
                      className="text-red-500 px-2 py-1 rounded cursor-pointer"
                    >
                      <MdDeleteOutline size={20} />
                    </button>

                    <Tooltip
                      id="delete-tip"
                      place="top"
                      className="!bg-red-500 !text-white text-xs px-2 py-1 rounded"
                    />
                  </>
                  <p className="text-sm text-gray-500 break-words justify-end">
                    Created: {task.createdAt?.slice(0, 10)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center text-center mt-10">
            <img
              src={Notasks}
              alt="No tasks"
              className="w-full max-w-md mb-4 opacity-90"
            />
            <h4 className="text-xl font-semibold mb-2 text-gray-800">
              No Tasks Yet
            </h4>
            <p className="text-gray-600 mb-4">
              Start by creating your first task.
            </p>
          </div>
        )}
      </section>
    </motion.div>
    </>
  );
};

export default Dashboard;
