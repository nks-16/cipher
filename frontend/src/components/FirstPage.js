import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginTeam } from "../api/teamApi"; // Import API function

const FirstPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleLogin = async () => {
        if (!username.trim() || !password.trim()) {
            setMessage("Please enter both username and password!");
            return;
        }
    
        setLoading(true);
        setMessage("");
    
        try {
            const credentials = { username, password };
            const response = await loginTeam(credentials);
            const data = response.data;
            console.log(data);
            setLoading(false);
    
            if (data) {
                localStorage.setItem("username", username);
                if (data.redirectToEmail) {
                    navigate("/email", { state: { email: data.user.email } });
                } else {
                    setTimeout(() => {
                        navigate("/main", { state: { username } });
                    }, 500); // Reduce timeout to ensure smooth transition
                }
            } else {
                setMessage(data.message || "Login failed. Please check your credentials.");
            }
        } catch (error) {
            setLoading(false);
            setMessage(error.response?.data?.message || "Error connecting to the server. Please try again.");
        }
    };
    

    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat relative"
            style={{ backgroundImage: `url('/images/Landing.jpg')` }}
        >
            {/* Overlay to reduce background image opacity */}
            <div
                className="absolute inset-0 bg-black bg-opacity-65" // Adjust opacity here (e.g., bg-opacity-50 for 50% opacity)
            ></div>

            {/* Header */}
            <header
                className="w-full px-6 md:px-12 py-2 shadow-lg relative z-10" // Add z-10 to bring header above the overlay
                style={{ backgroundColor: 'rgba(21, 83, 113, 0.5)' }} // Apply custom color with 50% opacity
            >
                <div className="flex items-center justify-between">
                    <img src="./images/nisb-logo.png" alt="NISB" className="w-12 h-12 md:w-16 md:h-16" />
                    <img src="./images/inspiro-logo.png" alt="Center Logo" className="w-12 h-12 md:w-20 md:h-16" />

                    {/* Right Logo */}
                    <img src="./images/wie-logo.png" alt="WIE" className="w-12 h-12 md:w-16 md:h-16" />
                </div>
            </header>

            {/* Event Name Above the Inner Div */}
            <div className="text-center mt-12 relative z-10"> {/* Add z-10 to bring content above the overlay */}
                {/* Replace text with an image */}
                <img
                    src="./images/Silent Cipher.png" // Path to your image
                    alt="Silent Cipher"
                    className="w-64 md:w-80 mt-4" // Adjust width as needed
                />
            </div>

            {/* Login Form */}
            <main className="flex-grow flex items-center justify-center px-6 py-10 relative z-10"> {/* Add z-10 to bring content above the overlay */}
                {/* Increased width of the inner div */}
                <div className="w-full max-w-3xl p-8 md:p-12 bg-blue-900 bg-opacity-0 rounded-2xl shadow-xl text-center mb-12"> {/* Increased bottom margin to mb-12 */}

                    {/* Username Input */}
                    <div className="mb-4 text-left">
                        <label htmlFor="username" className="block text-red-500 text-sm md:text-base font-semibold mb-2">
                            Username:
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            className="w-full px-4 py-3 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                        />
                    </div>

                    <div className="mb-6 text-left">
                        <label htmlFor="password" className="block text-red-500 text-sm md:text-base font-semibold mb-2">
                            Password:
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="w-full px-4 py-3 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                        />
                    </div>

                    {message && (
                        <p className={`mb-4 text-sm ${message.includes("success") ? "text-green-500" : "text-red-500"}`}>
                            {message}
                        </p>
                    )}

                    {/* Login Button with Image */}
                    <div className="flex justify-center"> {/* Center the button */}
                        <button
                            className={`w-32 h-12 relative overflow-hidden rounded-lg shadow-lg transition-all transform ${
                                loading ? "bg-gray-400 cursor-not-allowed" : "hover:scale-105 active:scale-95"
                            } focus:outline-none focus:ring-4 focus:ring-indigo-300`}
                            onClick={handleLogin}
                            disabled={loading}
                        >
                            <img
                                src="./images/Play-button.png" // Replace with the path to your image
                                alt="Play"
                                className="w-full h-full object-cover" // Ensure the image covers the entire button
                            />
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default FirstPage;


