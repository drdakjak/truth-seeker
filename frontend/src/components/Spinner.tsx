import React, { useEffect, useState } from 'react';

const Spinner = ({ textSequence, loading }) => {
    const [timeCounter, setTimeCounter] = useState(60);
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (loading) {
            timer = setInterval(() => {
                setTimeCounter((prev) => prev - 1);
                setCurrentTextIndex((prev) => (prev + 1) % textSequence.length);
            }, 1000);
        } else {
            setTimeCounter(60);
            setCurrentTextIndex(0);
        }
        return () => clearInterval(timer);
    }, [loading]);
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4">
                <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                <div className="text-center">
                    <p className="text-lg font-semibold text-gray-800">{textSequence[currentTextIndex]}</p>
                    <p className="text-sm text-gray-600">{timeCounter}s</p>
                </div>
            </div>
        </div>
    );
};
export default Spinner;