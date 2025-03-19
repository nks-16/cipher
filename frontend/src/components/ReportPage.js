import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { validateReport } from "../api/reportApi";

const ReportPage = () => {
    const [answers, setAnswers] = useState(Array(5).fill(""));
    const navigate = useNavigate();

    useEffect(() => {
        const isSubmitted = localStorage.getItem("reportSubmitted");
        if (isSubmitted) {
            navigate("/thank-you"); // Redirect if already submitted
        }
    }, [navigate]);
    
    const questions = [
        `Who meticulously constructed the façade of Aether?
Format: Firstname Lastname`,
        `Among the many silences in this story, one echoes the loudest. On what date and at approximately what time had Lily intended to meet Ava?
Format: ddmmhh:mm`,
        `Who emerges as the most likely orchestrator of Lily’s murder?
Format: Firstname Lastname`,
        "In which section of the facility does OWL reside, waiting to be found?",
        `For those who have truly seen beyond the deception, one last step remains. What are the precise coordinates that lead to OWL?
Format: xx.xxxx N, xx.xxxx E`
    ];

    const handleAnswerChange = (index, value) => {
        setAnswers((prev) => {
            const newAnswers = [...prev];
            newAnswers[index] = value;
            return newAnswers;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const username = localStorage.getItem("username");
            const responses = await Promise.all(
                answers.map(async (answer, index) => {
                    const questionNumber = index + 1;
                    const trimmedAnswer = answer.trim().toLowerCase();
                    const data = { username, questionNumber, answer: trimmedAnswer };
                    console.log("Submitting Data:", data);
                    return validateReport(data);
                })
            );

            if (responses.every((res) => res)) {
                localStorage.setItem("reportSubmitted", "true"); // Mark as submitted
                navigate("/thank-you");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-cover bg-center relative" style={{ backgroundImage: "url('/images/Landing.jpg')" }}>
            <div className="absolute inset-0 bg-black bg-opacity-65"></div>
            <header className="relative z-10 flex items-center justify-between bg-opacity-60 px-4 py-2 bg-gray-800 text-white">
                <div className="w-12 h-12 md:w-16 md:h-16">
                    <img src="/images/nisb-logo.png" alt="NISB" className="w-full h-full object-contain" />
                </div>
                <div className="w-24 h-12 md:w-32 md:h-16">
                    <img src="/images/report.png" alt="Report" className="w-full h-full object-contain" />
                </div>
                <div className="w-12 h-12 md:w-16 md:h-16">
                    <img src="/images/wie-logo.png" alt="WIE" className="w-full h-full object-contain" />
                </div>
            </header>

            <main className="relative z-10 flex-grow flex items-center justify-center p-4 md:p-6">
                <div className="bg-opacity-70 rounded-lg shadow-lg p-6 w-full max-w-4xl">
                    <h1 className="text-white text-sm md:text-lg font-bold mb-6 text-center" style={{ fontFamily: "'Agency FB', sans-serif" }}>
                        As the illusion collapses and reality emerges, only those who have truly observed will piece together the full picture. Before we close the final chapter, five critical questions remain.
                    </h1>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {questions.map((question, index) => (
                            <div key={index} className="bg-gray-900 bg-opacity-60 p-4 rounded-lg">
                                <div className="flex flex-col md:flex-row md:items-center">
                                    <div className="md:w-2/3 mb-3 md:mb-0">
                                        <p className="text-white text-base md:text-lg font-medium" style={{ fontFamily: "'Agency FB', sans-serif" }}>
                                            <span className="text-blue-400 mr-2">{index + 1}.</span> 
                                            {question}
                                        </p>
                                    </div>
                                    <div className="md:w-1/3 md:pl-4">
                                        <input
                                            type="text"
                                            value={answers[index]}
                                            onChange={(e) => handleAnswerChange(index, e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white bg-opacity-90"
                                            placeholder="Your answer"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        
                        <div className="flex justify-center md:justify-end mt-8">
                            <button
                                type="submit"
                                className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
                                style={{ fontFamily: "'Agency FB', sans-serif" }}
                            >
                                Submit Answers
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default ReportPage;
