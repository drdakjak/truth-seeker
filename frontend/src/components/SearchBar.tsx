import React, { useState } from 'react';

const SearchBar = ({ input, setInput, placeholder, searchButton, handleSearch }) => {

    return (
        <div className="flex-grow relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={placeholder}
                className="caret-indigo-500 select-all md:select-text w-full pl-12 pr-12 py-3 text-sm md:text-xl  2xl:text-xl border-2 border-indigo-500 rounded-lg focus:ring-2 focus:ring-indigo-800 focus:border-indigo-800"
            />

            <button
                onClick={() => handleSearch(input)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-150 ease-in-out"
                aria-label={searchButton}
            >
                <svg className="animate-bounce w-6 h-6 " fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
                {/* {t('searchButton')} */}
            </button>
        </div>
    );
};

export default SearchBar;