import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import EmailContext from "../context/EmailContext";

const EmailPage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const navigate = useNavigate();
    const emails = useContext(EmailContext);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleEmailClick = (email) => {
        navigate(`/inbox/${email.id}`, { state: { email } });
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Main Content */}
            <div className="flex-1 p-4">
                <h1 className="text-2xl font-bold mb-4">Inbox</h1>
                <div className="bg-white rounded-lg shadow">
                    {emails.map((email) => (
                        <div
                            key={email.id}
                            className="p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                            onClick={() => handleEmailClick(email)}
                        >
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    {/* Circular Avatar with First Letter of Sender's Name */}
                                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                                        {email.sender.charAt(0)}
                                    </div>
                                    <div className="ml-3">
                                        <p className="font-semibold">{email.sender}</p>
                                        <p className="text-sm text-gray-600">{email.subject}</p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-500">{email.timestamp}</p>
                            </div>
                            <p className="mt-2 text-sm text-gray-600">{email.preview}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EmailPage;