import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import EmailContext from "../context/EmailContext";
import { validateEmail } from "../api/emailApi";

const EmailDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const emails = useContext(EmailContext);
    
    const [showDetails, setShowDetails] = useState(false);
    const [showDecryptModal, setShowDecryptModal] = useState(false);
    const [decryptedText, setDecryptedText] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    const email = emails.find((email) => email.id === id);

    useEffect(() => {
        setError("");
        setSuccessMessage("");
    }, [id]);

    useEffect(() => {
        if (showDecryptModal) {
            const handleBackNavigation = () => setShowDecryptModal(false);
            window.addEventListener("popstate", handleBackNavigation);
            return () => window.removeEventListener("popstate", handleBackNavigation);
        }
    }, [showDecryptModal]);

    if (!email) {
        return <div className="p-4 text-red-500">Email not found.</div>;
    }

    const handleDecrypt = () => setShowDecryptModal(true);
    const handleCloseDecryptModal = () => {
        setShowDecryptModal(false);
        setDecryptedText("");
        setError("");
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);
        
        try {
            const username = localStorage.getItem("username") || "guest";
            const sanitizedPassword = decryptedText.toLowerCase().trim();
            
            const response = await validateEmail({ username, questionId: email.id, answer: sanitizedPassword });
            if (response) {
                setSuccessMessage("✅ Password verified!");
                setTimeout(() => {
                    handleCloseDecryptModal();
                }, 1000);
            } else {
                setError(response?.message || "❌ Incorrect password. Try again.");
            }
        } catch (error) {
            console.error("API Error:", error);
            setError("⚠️ Please try again.");
        }
        
        setIsLoading(false);
    };

    return (
        <div className="p-4">
            <button
                onClick={() => navigate(location.pathname.startsWith("/inbox") ? "/inbox" : "/sent")}
                className="mb-4 text-blue-500 hover:text-blue-700 focus:outline-none"
            >
                &larr; Back to {location.pathname.startsWith("/inbox") ? "Inbox" : "Sent"}
            </button>

            <div className="bg-white rounded-lg shadow-lg p-6">
                {successMessage && <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">{successMessage}</div>}
                <h2 className="text-2xl font-semibold mb-2 text-gray-800">{email.subject}</h2>
                <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {email.sender.charAt(0)}
                    </div>
                    <div>
                        <p className="font-semibold text-gray-800">{email.sender}</p>
                        <p className="text-sm text-gray-600">to <span className="text-gray-800">{email.recipient}</span></p>
                    </div>
                </div>
                
                <button onClick={() => setShowDetails(!showDetails)} className="mt-4 text-blue-500 hover:text-blue-700 text-sm focus:outline-none">
                    {showDetails ? "Hide Details" : "Show Details"}
                </button>

                {showDetails && (
                    <div className="mt-4 space-y-4">
                        <p><strong>CC:</strong> {email.cc.join(", ")}</p>
                        <p><strong>Date:</strong> {email.timestamp}</p>
                        <p><strong>Subject:</strong> {email.subject}</p>
                    </div>
                )}

                <div className="mt-6 pt-4 border-t border-gray-200">
                    <p className="text-gray-700 whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: email.body }}></p>
                </div>

                <button onClick={handleDecrypt} className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                    Decrypt
                </button>
            </div>

            {showDecryptModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Enter Decrypted Text</h2>
                        <form onSubmit={handlePasswordSubmit} className="space-y-4">
                            <input
                                type="text"
                                value={decryptedText}
                                onChange={(e) => setDecryptedText(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter decrypted text"
                                required
                            />
                            {error && <p className="text-sm text-red-500">{error}</p>}
                            <div className="flex justify-end space-x-4">
                                <button onClick={handleCloseDecryptModal} type="button" className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">Close</button>
                                <button type="submit" className={`bg-blue-500 text-white px-4 py-2 rounded-lg ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`} disabled={isLoading}>
                                    {isLoading ? "Verifying..." : "Submit"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmailDetailPage;