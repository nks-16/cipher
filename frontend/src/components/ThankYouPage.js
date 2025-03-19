import React from 'react';

const ThankYouPage = () => {
    return (
        <div
            className="min-h-screen bg-cover bg-center"
            style={{
                backgroundImage: "url('/images/Thank-You.png')", // Replace with your image path
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            {/* The entire page is now just the background image */}
        </div>
    );
};

export default ThankYouPage;