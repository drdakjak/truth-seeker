import React from 'react';

const Suggestions = ({ suggestions, handleSuggestionClick}) => {
    return (
        suggestions.map((suggestion, index) => (
            <span
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="bg-indigo-100 text-sm md:text-base 2xl:text-lg text-indigo-900 px-3 py-1 rounded-md cursor-pointer hover:bg-indigo-200 transition duration-150 ease-in-out word-wrap break-word word-break white-space normal"
              role="button"
              tabIndex={0}
              onKeyPress={(e) => { if (e.key === 'Enter') handleSuggestionClick(suggestion); } }
            >
              {suggestion}
            </span>
          ))
    );
    };
export default Suggestions;