import React from 'react';

import { FaFaceFrown, FaFaceSmile,  FaFaceGrinHearts } from "react-icons/fa6";
import { useTranslation } from 'react-i18next';

const Rating = ({ rating, handleRating }) => {
    const { t } = useTranslation();

    return (

        <div className="mt-6 flex justify-center items-center">
            <p className="mr-4 text-xl font-sans text-indigo-950">{t("ratingText")}</p>

            <button
                onClick={() => handleRating(0)}
                className={`mr-2 p-2 hover:scale-110 rounded bg-indigo-600 ${rating === 0 ? 'bg-indigo-900' : 'bg-indigo-600'}`}
            >
                <FaFaceFrown className="text-2xl text-yellow-300" />
            </button>

            <button
                onClick={() => handleRating(1)}
                className={`mr-2 p-2 hover:scale-110 rounded bg-indigo-600 ${rating === 1 ? 'bg-indigo-900' : 'bg-indigo-600'}`}
            >
                <FaFaceSmile className="text-2xl  text-yellow-300" />
            </button>
            
            <button
                onClick={() => handleRating(2)}
                className={`p-2 hover:scale-110 rounded  bg-indigo-600 ${rating === 2 ? 'bg-indigo-900' : 'bg-indigo-600'}`}
            >
                <FaFaceGrinHearts className="text-2xl text-yellow-300" />
            </button>


        </div>
    );
};

export default Rating;
