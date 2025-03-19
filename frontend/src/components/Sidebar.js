import React from "react";
import { FiMenu, FiInbox, FiSend, FiFileText } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
    const navigate = useNavigate();

    return (
        <div
            className={`bg-gray-800 text-white w-64 min-h-screen transition-all duration-300 ${
                isSidebarOpen ? "block" : "hidden"
            }`}
        >
            <div className="p-4">
                <button onClick={toggleSidebar} className="text-white focus:outline-none">
                    <FiMenu size={24} />
                </button>
            </div>
            <nav className="mt-4">
                <ul>
                    <li
                        className="p-3 hover:bg-gray-700 cursor-pointer flex items-center"
                        onClick={() => navigate("/email")}
                    >
                        <FiInbox size={20} className="mr-3" />
                        Inbox
                    </li>
                    <li
                        className="p-3 hover:bg-gray-700 cursor-pointer flex items-center"
                        onClick={() => navigate("/sent")}
                    >
                        <FiSend size={20} className="mr-3" />
                        Sent
                    </li>
                    <li
                        className="p-3 hover:bg-gray-700 cursor-pointer flex items-center"
                        onClick={() => navigate("/drafts")}
                    >
                        <FiFileText size={20} className="mr-3" />
                        Drafts
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;