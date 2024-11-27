import React, { useState, useEffect } from 'react';

const ValentinesCountdown = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });



    useEffect(() => {
        const calculateTimeLeft = () => {
            // Set specific date to February 1st at 5 PM
            const valentinesEvent: any = new Date(new Date().getFullYear(), 1, 1, 17, 0, 0); // February 1st, 5 PM
            const now: any = new Date();

            // If the event has passed this year, target next year
            if (now > valentinesEvent) {
                valentinesEvent.setFullYear(valentinesEvent.getFullYear() + 1);
            }

            const difference: number = valentinesEvent - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            }
        };

        // Update every second
        const timer = setInterval(calculateTimeLeft, 1000);
        calculateTimeLeft(); // Initial call

        // Cleanup interval on component unmount
        return () => clearInterval(timer);
    }, []);

    // Rose-inspired text colors
    const rosePalette = {
        text: 'text-rose-500',
        accent: 'text-rose-600',
        button: 'bg-rose-500'
    };

    return (

        <div className="w-full h-full flex items-center justify-center p-4">
            <div className="w-full max-w-md text-center"> {/* Changed max-w and added text-center */}
                <h1 className={`text-3xl font-bold mb-6 ${rosePalette.text}`}>
                    Perfect Match Returns...
                </h1>
                <div className="flex justify-center items-center space-x-4 mb-4"> {/* Added mb-4 for spacing */}
                    {Object.entries(timeLeft).map(([unit, value]) => (
                        <div key={unit} className="text-center">
                            <div className={`text-4xl font-bold ${rosePalette.accent}`}>
                                {value.toString().padStart(2, '0')}
                            </div>
                            <div className={`text-sm uppercase ${rosePalette.text}`}>
                                {unit}
                            </div>
                        </div>
                    ))}
                </div>
                <div className={`text-sm ${rosePalette.text}`}>
                    <div className="flex justify-center space-x-4">
                        <button
                            className={`${rosePalette.button} text-white px-6 py-2 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105`}
                            onClick={() => {/* Add your function here */ }}
                        >
                            2024 Statistics
                        </button>
                        <button
                            className={`${rosePalette.button} text-white px-6 py-2 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105`}
                            onClick={() => {/* Add your function here */ }}
                        >
                            2023 Statistics
                        </button>
                    </div>
                </div>
            </div>

        </div>

    );
};

export default ValentinesCountdown;