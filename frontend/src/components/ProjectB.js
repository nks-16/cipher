import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateProject } from "../api/projectApi";

const ProjectB = () => {
    const [showModal, setShowModal] = useState(false);
    const [decryptedText, setDecryptedText] = useState("");
    const [error, setError] = useState("");
    const [attempts, setAttempts] = useState(0);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleDecryptProject = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setDecryptedText("");
        setError("");
        setAttempts(0);
    };

    const handleDecryptedTextSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const questionId = "p2";
            const trimmedPassword = decryptedText.trim().toLowerCase();
            const username = localStorage.getItem("username");
            const data = { username, questionId, answer: trimmedPassword };

            console.log("Submitting Data:", data);
            const response = await validateProject(data);

            if (response?.success) {
                setTimeout(() => navigate("/portfolio/project-c"), 1500);
            } else {
                setError(response?.message || "Incorrect password. Try again.");
            }
        } catch (error) {
            setAttempts((prevAttempts) => {
                const newAttempts = prevAttempts + 1;
                if (newAttempts >= 5) {
                    setError("❌ This is not the mail you are looking for!");
                } else {
                    setError("⚠️ Please try again.");
                }
                return newAttempts;
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 min-h-screen bg-cover bg-center relative" style={{ backgroundImage: "url('/images/portfolio8.jpg')" }}>
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="relative z-10">
                <button
                    onClick={() => navigate("/portfolio-content")}
                    className="mb-4 text-blue-500 hover:text-blue-700 focus:outline-none"
                >
                    &larr; Back to Portfolio
                </button>
                <div className="rounded-lg shadow p-6 mx-auto max-w-5xl w-full mt-8">
                    <img src="/images/project-2-title.png" alt="Project B Title" className="w-full h-auto mb-8 rounded-lg shadow-lg" />
                    <img src="/images/project-2-content.png" alt="Project B Description" className="w-full h-auto mb-8 rounded-lg shadow-lg" />
                    <button
                        onClick={handleDecryptProject}
                        className="mt-6 bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
                    >
                        Decrypt Project
                    </button>
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
                                            className={`bg-blue-800 text-white px-4 py-2 rounded-lg focus:outline-none ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                                            disabled={loading}
                                        >
                                            {loading ? "Submitting..." : "Submit"}
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

export default ProjectB;