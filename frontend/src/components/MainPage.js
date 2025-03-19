import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { validateCipher } from "../api/cipherApi";

const MainPage = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState("");
    const defaultEmail = "default@example.com"; // Default non-editable email

    useEffect(() => {
        const storedUsername = localStorage.getItem("username") || "Team";
        setUsername(storedUsername);
    }, []);

    const handleChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const trimmedPassword = password.toLowerCase().trim();

        if (!trimmedPassword) {
            setError("❌ Please enter the secret code!");
            return;
        }

        try {
            const questionId = "q1";
            const data = { username, questionId, answer: trimmedPassword };

            console.log("Submitting Data:", data);

            const response = await validateCipher(data);

            if (response) {
                setMessage("✅ Password verified!");
                setIsSubmitted(true);
                setTimeout(() => navigate("/email"), 1500);
            } else {
                setError(response?.message || "❌ Incorrect password. Try again.");
            }
        } catch (error) {
            console.error("API Error:", error);
            setError("⚠️ Error connecting to the server. Please try again.");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("username");
        navigate("/");
    };

    return (
        <div
            className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('/images/Landing.jpg')` }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-65"></div>

            <header
                className="relative z-10 flex items-center justify-between w-full px-6 md:px-12 py-3 shadow-lg"
                style={{ backgroundColor: "rgba(21, 83, 113, 0.5)" }}
            >
                <img src="/images/nisb-logo.png" alt="NISB" className="w-10 h-10 md:w-12 md:h-12" />
                <h1 className="text-xl md:text-2xl font-bold text-white">{username}</h1>
                <div className="flex items-center space-x-4">
                    <img src="/images/wie-logo.png" alt="WIE" className="w-10 h-10 md:w-12 md:h-12" />
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-lg shadow-md transition-all transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-red-300"
                    >
                        Logout
                    </button>
                </div>
            </header>

            <main className="relative z-10 flex-grow flex flex-col items-center justify-center px-6 py-10 -mt-8">
                <div className="mb-8 mt-10 text-center">
                    <img src="/images/text.png" alt="Enter the Secret Code" className="w-full max-w-lg mx-auto" />
                </div>

                <div className="w-full max-w-6xl p-12 md:p-16 bg-blue-900 bg-opacity-0 rounded-2xl shadow-xl text-center">
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    {message && <p className="text-green-500 mb-4">{message}</p>}

                    <form onSubmit={handleSubmit}>
                        {/* Non-editable Email Input */}
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-white text-lg md:text-xl font-semibold mb-2">
                                Email:
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={defaultEmail}
                                className="w-full px-4 py-3 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg shadow-md focus:outline-none"
                                readOnly
                            />
                        </div>

                        {/* Password Input */}
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-white text-lg md:text-xl font-semibold mb-2">
                                Secret Code:
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={handleChange}
                                placeholder="Enter the secret code"
                                className="w-full px-4 py-3 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                                disabled={isSubmitted}
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className={`w-full text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all transform ${
                                isSubmitted ? "bg-gray-400 cursor-not-allowed" : "bg-blue-800 hover:bg-blue-500 hover:scale-105 active:scale-95"
                            } focus:outline-none focus:ring-4 focus:ring-indigo-300`}
                            disabled={isSubmitted}
                        >
                            {isSubmitted ? "Submitted" : "Enter"}
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default MainPage;
