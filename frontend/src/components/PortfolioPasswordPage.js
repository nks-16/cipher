import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { validateDraft } from "../api/draftApi";

const PortfolioPasswordPage = () => {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const navigate = useNavigate();

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors

        try {
            const questionId = "d1";
            const username = localStorage.getItem("username") || "guest"; // Ensure username is valid
            const sanitizedPassword = password.toLowerCase().trim(); // Convert to lowercase and trim spaces

            const data = { username, questionId, answer: sanitizedPassword };

            console.log("Submitting Data:", data);

            const response = await validateDraft(data);

            if (response) {
                setMessage("✅ Password verified! Redirecting...");
                setIsSubmitted(true); // Mark submission successful
            } else {
                setError(response?.message || "❌ Incorrect password. Try again.");
            }
        } catch (error) {
            console.error("API Error:", error);
            setError("⚠️  Please try again.");
        }
    };

    // Redirect after success
    useEffect(() => {
        if (isSubmitted) {
            const timer = setTimeout(() => navigate("/portfolio-content"), 1500);
            return () => clearTimeout(timer); // Cleanup timeout
        }
    }, [isSubmitted, navigate]);

    return (
        <div
            className="min-h-screen flex items-center justify-center relative overflow-hidden bg-cover bg-center"
            style={{
                backgroundImage: "url('/images/portfolio8.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            {/* Password Entry Box */}
            <div className="relative z-10 bg-white bg-opacity-40 backdrop-blur-lg border border-white border-opacity-30 shadow-2xl p-8 w-full max-w-md rounded-3xl">
                <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-800" style={{ fontFamily: "'Agency FB', sans-serif" }}>
                    Enter Access Code
                </h1>

                <form onSubmit={handlePasswordSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="password" className="block text-lg font-medium text-gray-700 mb-2" style={{ fontFamily: "'Agency FB', sans-serif" }}>
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-xl bg-white bg-opacity-60 backdrop-blur-md shadow-md focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-500 transition-all"
                            placeholder="Enter password"
                            style={{ fontFamily: "'Agency FB', sans-serif" }}
                            required
                            disabled={isSubmitted}
                        />
                    </div>

                    {/* Display error message */}
                    {error && <p className="text-sm text-red-500 text-center font-semibold" style={{ fontFamily: "'Agency FB', sans-serif" }}>{error}</p>}

                    {/* Display success message */}
                    {message && <p className="text-sm text-green-500 text-center font-semibold" style={{ fontFamily: "'Agency FB', sans-serif" }}>{message}</p>}

                    <button
                        type="submit"
                        className={`w-full font-bold py-3 px-6 rounded-xl shadow-lg transition-all transform focus:outline-none text-lg
                            ${isSubmitted ? "bg-gray-500 cursor-not-allowed" : "bg-blue-800 text-white hover:bg-blue-600 hover:scale-105 active:scale-95 focus:ring-4 focus:ring-blue-300"}`}
                        style={{ fontFamily: "'Agency FB', sans-serif" }}
                        disabled={isSubmitted}
                    >
                        {isSubmitted ? "✔ Verified" : "Unlock"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PortfolioPasswordPage;