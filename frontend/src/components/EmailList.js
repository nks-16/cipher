import React from "react";
import { Link } from "react-router-dom";

const EmailList = () => {
    // Sample email data (can be fetched from context or API)
    const emails = [
        {
            id: 1,
            sender: "John Doe",
            recipient: "Jane Smith",
            subject: "Meeting Reminder",
            timestamp: "2 hours ago",
            preview: "Don't forget about the meeting tomorrow at 10 AM.",
            cc: ["alice@example.com", "bob@example.com"],
            body: "Hi Jane, just a reminder about our meeting tomorrow at 10 AM. Please ensure you have the project updates ready. Best, John",
        },
        {
            id: 2,
            sender: "Jane Smith",
            recipient: "John Doe",
            subject: "Project Update",
            timestamp: "5 hours ago",
            preview: "Here's the latest update on the project.",
            cc: ["charlie@example.com"],
            body: "Hi John, here's the latest update on the project. Let me know if you have any questions. Best, Jane",
        },
    ];

    return (
        <div className="bg-white rounded-lg shadow">
            {emails.map((email) => (
                <div key={email.id} className="p-4 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-gray-400 rounded-full mr-3"></div>
                            <div>
                                {/* Link to Email Detail Page */}
                                <Link
                                    to={`/sent/${email.id}`}
                                    className="font-semibold hover:underline"
                                >
                                    {email.sender}
                                </Link>
                                <p className="text-sm text-gray-600">{email.subject}</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-500">{email.timestamp}</p>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{email.preview}</p>
                </div>
            ))}
        </div>
    );
};

export default EmailList;