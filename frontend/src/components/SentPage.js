import React, { useState } from "react";
import Sidebar from "./Sidebar";
import EmailList from "./EmailList";

const SentPage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Main Content */}
            <div className="flex-1 p-4">
                <h1 className="text-2xl font-bold mb-4">Sent</h1>
                <EmailList />
            </div>
        </div>
    );
};

export default SentPage;