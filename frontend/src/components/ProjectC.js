import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateProject } from "../api/projectApi";

const ProjectC = () => {
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const [decryptedText, setDecryptedText] = useState(""); // State for decrypted text input
    const [error, setError] = useState(""); // State for error messages
    const navigate = useNavigate();

    const handleDecryptProject = () => {
        setShowModal(true); // Show the modal for decrypted text input
    };

    const handleCloseModal = () => {
        setShowModal(false); // Close the modal
        setDecryptedText(""); // Reset the input field
        setError(""); // Clear any error messages
    };

    const handleDecryptedTextSubmit = async (e) => {
        e.preventDefault();
        try {
                            const questionId = "p3";
                            const trimmedPassword = decryptedText.trim().toLowerCase();
                            const username = localStorage.getItem("username");
                            const data = { username, questionId, answer: trimmedPassword };
                
                            console.log("Submitting Data:", data);
                
                            const response = await validateProject(data);
                
                            if (response) {
                                setTimeout(() => navigate("/report-page"), 1500);
                            } else {
                                setError(response?.data?.message || "Incorrect password. Try again.");
                            }
                        } catch (error) {
                            console.error(error);
                            setError("An error occurred. Please try again.");
                        }
    };

    return (
        <div
            className="p-4 min-h-screen bg-cover bg-center relative"
            style={{
                backgroundImage: "url('/images/portfolio8.jpg')", // Background image
            }}
        >
            {/* Overlay to reduce background opacity */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            <div className="relative z-10">
                <button
                    onClick={() => navigate("/portfolio-content")} // Navigate to the portfolio content page
                    className="mb-4 text-blue-500 hover:text-blue-700 focus:outline-none"
                >
                    &larr; Back to Portfolio
                </button>

                {/* Constrain the width of this div */}
                <div className="rounded-lg shadow p-6 mx-auto max-w-6xl w-full">
                    {/* Image for Project Title */}
                    <img
                        src="/images/project-3-title.png" // Replace with your image path
                        alt="Project C Title"
                        className="w-full h-auto mb-8 rounded-lg shadow-lg"
                    />

                    {/* Image for Project Description */}
                    <img
                        src="/images/project-3-content.png" // Replace with your image path
                        alt="Project C Description"
                        className="w-full h-auto mb-8 rounded-lg shadow-lg"
                    />

                    {/* Decrypt Project Button */}
                    <button
                        onClick={handleDecryptProject}
                        className="mt-6 bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
                    >
                        Decrypt Project
                    </button>

                    {/* Modal for Decrypted Text */}
                    {showModal && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
                            <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
                                <h2 className="text-xl font-semibold mb-4">Enter Decrypted Text</h2>
                                <form onSubmit={handleDecryptedTextSubmit} className="space-y-4">
                                    <input
                                        type="text"
                                        value={decryptedText}
                                        onChange={(e) => setDecryptedText(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter decrypted text"
                                        required
                                    />
                                    {error && <p className="text-sm text-red-500">{error}</p>}
                                    <div className="flex justify-end space-x-4">
                                        <button
                                            type="button"
                                            onClick={handleCloseModal}
                                            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 focus:outline-none"
                                        >
                                            Close
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectC;