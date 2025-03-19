import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

const DraftsPage = () => {
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
                <h1 className="text-2xl font-bold mb-4">Drafts</h1>
                <div className="bg-white rounded-lg shadow p-6">
                    {/* Drafted Message */}
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">Drafted Message</h2>
                        <div className="text-gray-700 border-l-4 border-gray-300 pl-4">
                            <p className="mb-4">
                                Subject: Confidential Portfolio Review Request
                            </p>
                            <p className="mb-2">
                                Dear [Recipient],
                            </p>
                            <p className="mb-4">
                                I hope this message finds you well. I wanted to share my portfolio of recent work that I believe will be relevant to our upcoming discussion.
                            </p>
                            <p className="mb-4">
                                You can access my portfolio using the secure link below. Please note that the portfolio is password-protected to maintain confidentiality.
                            </p>
                            <p className="mb-4">
    <Link 
        to="/portfolio" 
        className="text-blue-500 hover:text-blue-700"
    >
        Click here to view my portfolio
    </Link>
</p>
                            <p className="mb-4">
                                For security reasons, I will provide the password separately via our secure channel.
                            </p>
                            <p className="mb-4">
                                Looking forward to your feedback and our discussion.
                            </p>
                            <p>
                                Regards,<br />
                                [Your Name]
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DraftsPage;