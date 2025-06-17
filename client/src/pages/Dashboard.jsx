import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Taskform from "./components/TaskForm";
import { AnimatePresence, motion } from "framer-motion";
import { FaSave, FaEdit, FaUndoAlt, FaCheck, FaClock } from "react-icons/fa";
import { MdDeleteOutline, MdLogout, MdPendingActions } from "react-icons/md";
import { AiOutlineFileDone } from "react-icons/ai";
import { Tooltip } from "react-tooltip";
import Notasks from "../assets/undraw_web-search_9qqc.png";
import Loader from "./components/Loader";
import Avatar from "../assets/avatar.png";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
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

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    if (!user) navigate("/login");
    else fetchTasks();
  }, [user]);

  const fetchTasks = async () => {
    setLoading(true);
    setTimeout(async () => {
      try {
        const res = await axios.get(
          "https://taskverse-cy53.onrender.com/api/tasks",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setTasks(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      } finally {
        setLoading(false);
      }
    }, 500);
  };

  const handleCreate = async (task) => {
    if (!task.title.trim()) return;
    try {
      const res = await axios.post(
        "https://taskverse-cy53.onrender.com/api/tasks",
        task,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setTasks([...tasks, res.data]);
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://taskverse-cy53.onrender.com/api/tasks/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
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

  const renderTaskCard = (task) => (
    <motion.li
      key={task._id}
      layout
      initial={{ opacity: 0, scale: 0.5, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.5, y: -10 }}
      transition={{ duration: 1 }}
      className={`border-2 border-l-10 shadow-md rounded-lg p-4 hover:shadow-xl transition duration-300 transform hover:scale-105 ${
        task.completed
          ? "border-green-500 hover:shadow-green-200 bg-gradient-to-br from-green-50 to-green-100"
          : "border-red-500 hover:shadow-red-200 bg-gradient-to-br from-red-50 to-red-100"
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
          <div className="flex flex-col md:flex-row space-x-5">
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
      <div className="flex flex-row justify-between gap-2 mt-2">
        <div className="flex">
          {editingTaskId === task._id ? (
            <button
              data-tooltip-id="saveTip"
              data-tooltip-content="Save!"
              onClick={() => handleUpdate(task._id)}
              className="bg-blue-500 text-white px-2 py-1 rounded cursor-pointer"
            >
              <FaSave size={20} />
              <Tooltip
                id="saveTip"
                place="top"
                variant="info"
                className="!bg-blue-500 !text-white text-sm px-2 py-1 !rounded"
              />
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
                task.completed ? "Mark as Incomplete" : "Mark as Complete"
              }
              onClick={() => handleComplete(task._id, task.completed)}
              className="text-green-500 px-2 py-1 rounded cursor-pointer"
            >
              {task.completed ? <FaUndoAlt size={20} /> : <FaCheck size={20} />}
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
        </div>
        <p className="text-sm text-gray-500 break-words justify-end">
          Created: {task.createdAt?.slice(0, 10)}
        </p>
      </div>
    </motion.li>
  );

  return (
    <motion.div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 p-5">
      {loading && <Loader />}
      <div className="grid md:grid-flow-col grid-cols-1 md:grid-cols-5 gap-6">
        <div className="md:min-h-[650px] flex flex-col md:border-e-2 p-4 justify-between">
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4 text-center md:text-left">
              Welcome, {user?.firstName}!
            </h2>
            <div className="w-50 hidden md:flex flex-col items-center gap-2 mb-10 text-center">
              <img src={Avatar} className="w-30" />
              <div>
                <p className="text-xl font-bold font-serif">
                  {user?.firstName + " " + user?.lastName}
                </p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </div>
            <Taskform onAdd={handleCreate} />
          </div>
          <div className="items-baseline-last hidden md:block">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full text-left px-4 py-2 rounded-md mt-10 bg-red-500 text-white"
            >
              <MdLogout />
              <span>Logout</span>
            </button>
          </div>
        </div>

        <div className="col-span-2 lg:p-10 md:p-4">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center md:text-left flex items-center gap-4 justify-center">
            <MdPendingActions />
            Pending Tasks
          </h3>
          {tasks.filter((t) => !t.completed).length ? (
            <ul className="space-y-10">
              <AnimatePresence>
                {tasks.filter((t) => !t.completed).map(renderTaskCard)}
              </AnimatePresence>
            </ul>
          ) : (
            <div className="text-center text-gray-500">
              <img src={Notasks} alt="No tasks" className="w-48 mx-auto mb-2" />
              <p>No pending tasks</p>
            </div>
          )}
        </div>

        <div className="col-span-2 lg:p-10 md:p-4">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center md:text-left flex items-center gap-4 justify-center">
            <AiOutlineFileDone />
            Completed Tasks
          </h3>
          {tasks.filter((t) => t.completed).length ? (
            <ul className="space-y-10">
              <AnimatePresence>
                {tasks.filter((t) => t.completed).map(renderTaskCard)}
              </AnimatePresence>
            </ul>
          ) : (
            <div className="text-center text-gray-500">
              <p>No completed tasks</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
