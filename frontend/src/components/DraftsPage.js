import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

const DraftsPage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isDriveLinkOpened, setIsDriveLinkOpened] = useState(false); // State to track if the Google Drive link is opened

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Sample draft data (can be fetched from context or API)
    const draft = {
        id: 1,
        subject: "The doors shift, but the key remains.",
        timestamp: "3rd July, 10:18 am",
        body: `If you know, you know. The path unfolds through the link. The image holds the key—guard it well. Within the details, ‘a’ marks where the echoes began, while ‘b’ is where they now reside. To step beyond the veil, follow the path—

^@$#$%~<^ !#?__[<>:+/!$]~<^+|-__:+/%^#]<{&~^]<{!$]__+|-#$%<~>!#? !$]

%=* :+/%^#[<>#$% ~<^ : ^@$^@$[<>[<>#$%@!&`,
    };

    // Function to handle opening the Google Drive link
    const handleOpenDriveLink = () => {
        window.open("https://drive.google.com/file/d/1sqHQy5Cdr_N5c8ZwCWV88LlsUOGkp7an/view?usp=drive_link", "_blank");
        setIsDriveLinkOpened(true); // Mark the link as opened
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Main Content */}
            <div className="flex-1 p-4">
                <h1 className="text-2xl font-bold mb-4">Drafts</h1>

                {/* Draft Email */}
                <div className="bg-white rounded-lg shadow p-6">
                    {/* Email Header */}
                    <div className="border-b border-gray-200 pb-4">
                        <h2 className="text-2xl font-semibold mb-2 text-gray-800">{draft.subject}</h2>
                        <p className="text-sm text-gray-600">{draft.timestamp}</p>
                    </div>

                    {/* Email Body */}
                    <div className="mt-6 pt-4">
                        <p className="text-gray-700 whitespace-pre-wrap">{draft.body}</p>
                    </div>

                    {/* Google Drive Link */}
                    <div className="mt-6">
                        <button
                            onClick={handleOpenDriveLink}
                            className="text-blue-500 hover:text-blue-700 focus:outline-none"
                        >
                            Image Link
                        </button>
                    </div>

                    {/* Portfolio Link (Disabled until Google Drive link is opened) */}
                    <div className="mt-6">
                        <Link
                            to="/portfolio"
                            className={`text-blue-500 hover:text-blue-700 ${
                                !isDriveLinkOpened ? "pointer-events-none opacity-50" : ""
                            }`}
                        >
                            Click here to view my portfolio
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DraftsPage;