import React from "react";
import { useNavigate } from "react-router-dom";

const PortfolioContentPage = () => {
    const navigate = useNavigate();

    return (
        <div
            className="p-4 min-h-screen bg-cover bg-center flex flex-col items-center justify-center relative"
            style={{
                backgroundImage: "url('/images/portfolio8.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            {/* Overlay to reduce background image opacity */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            {/* Constrain the width of this div and center-align it */}
            <div className="relative max-w-4xl w-full mx-auto z-10">
                {/* Image for Portfolio Title */}
                <img
                    src="/images/portfolio-content.png"
                    alt="Portfolio Title"
                    className="w-full h-auto mb-8 rounded-lg shadow-lg"
                />

                {/* Projects container with responsive layout */}
                <div className="w-full px-4 md:px-6">
                    {/* Projects section header */}
                    <div className="mb-4 md:mb-6">
                        <h2 className="text-white text-2xl md:text-3xl font-bold">Projects</h2>
                    </div>

                    {/* Project listings with responsive design */}
                    <div className="space-y-4 md:space-y-6">
                        {/* Project 1 */}
                        <div 
                            className="flex items-center bg-blue bg-opacity-70 rounded-lg p-3 cursor-pointer hover:bg-opacity-90 transition-all"
                            onClick={() => navigate("/portfolio/project-a")}
                        >
                            <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-blue-800 rounded-full flex items-center justify-center">
                                <span className="text-white text-xl md:text-2xl font-bold">1</span>
                            </div>
                            <div className="ml-4">
                                {/* Apply Agency FB font to the project name */}
                                <h3 className="text-white text-base md:text-xl font-medium" style={{ fontFamily: "'Agency FB', sans-serif" }}>
                                    Project Borealis: Waveform Stability & Encrypted Data Integrity
                                </h3>
                            </div>
                        </div>

                        {/* Project 2 */}
                        <div 
                            className="flex items-center bg-blue bg-opacity-70 rounded-lg p-3 cursor-pointer hover:bg-opacity-90 transition-all"
                            onClick={() => navigate("/portfolio/project-b")}
                        >
                            <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-blue-800 rounded-full flex items-center justify-center">
                                <span className="text-white text-xl md:text-2xl font-bold">2</span>
                            </div>
                            <div className="ml-4">
                                {/* Apply Agency FB font to the project name */}
                                <h3 className="text-white text-base md:text-xl font-medium" style={{ fontFamily: "'Agency FB', sans-serif" }}>
                                    Pulse Sync
                                </h3>
                            </div>
                        </div>

                        {/* Project 3 */}
                        <div 
                            className="flex items-center bg-blue bg-opacity-70 rounded-lg p-3 cursor-pointer hover:bg-opacity-90 transition-all"
                            onClick={() => navigate("/portfolio/project-c")}
                        >
                            <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-blue-800 rounded-full flex items-center justify-center">
                                <span className="text-white text-xl md:text-2xl font-bold">3</span>
                            </div>
                            <div className="ml-4">
                                {/* Apply Agency FB font to the project name */}
                                <h3 className="text-white text-base md:text-xl font-medium" style={{ fontFamily: "'Agency FB', sans-serif" }}>
                                    Project Borealis: Phase-II – Structural Reordering & Secure Data Flow
                                </h3>
                            </div>
                        </div>
                    </div>

                    {/* Call to action button */}
                    <div className="flex justify-center mt-8">
                        <button
                            onClick={() => navigate("/portfolio/project-a")}
                            className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            style={{ fontFamily: "'Agency FB', sans-serif" }} // Apply Agency FB font to the button text
                        >
                            Know My Journey
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PortfolioContentPage;