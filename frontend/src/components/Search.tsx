import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { get } from 'aws-amplify/api';
import FlagDropdown from './FlagDropdown';
import { useTranslation } from 'react-i18next';
import logo from '../../public/truth-seeker-high-resolution-logo-black-transparent-2.svg'; // Adjust the path as needed

const Search = () => {
  const { t, i18n } = useTranslation();
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('en');

  const languageOptions = [
    { value: 'cs', label: 'Czech', flagCode: 'CZ' },
    { value: 'de', label: 'German', flagCode: 'DE' },
    { value: 'en', label: 'English', flagCode: 'GB' },
  ];

  const suggestions = t('suggestions', { returnObjects: true });

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  const handleSearch = async (input) => {
    setLoading(true);
    try {
      const encodedUriInput = encodeURIComponent(input);
      const response = await get({
        apiName: "TruthSeekerRestApi", 
        path: `generate_response/${language}/${encodedUriInput}`,
        options: {
          headers: {'Content-Type': 'application/json'}
        }
      }).response;
      const data = await response.body.json();
      setResponse(data);
    } catch (error) {
      console.error('Error calling Lambda function:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    handleSearch(suggestion);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4" style={{ backgroundImage: 'url(/background.jpg)', backgroundSize: 'cover' }}>
      {loading && (
        <div className="spinner-overlay">
          <div className="spinner" role="status" aria-live="polite"></div>
        </div>
      )}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
        <img src={logo} alt="App Logo" className="mx-auto mb-6" style={{ width: '150px' }} />
        {/* <h1 className="text-3xl font-bold mb-6 text-center" role="heading" aria-level="1">{t('appTitle')}</h1> */}
        <div className="w-full mb-6 flex items-center">
          <FlagDropdown
            value={language}
            onChange={handleLanguageChange}
            options={languageOptions}
            className="custom-height"
            aria-label={t('languageSelector')}
          />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('placeholder')}
            className="w-full p-4 border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 custom-height"
            aria-label={t('searchInput')}
          />
          <button
            onClick={() => handleSearch(input)}
            className="bg-[#d1a17a] text-white p-4 rounded-r-lg hover:bg-[#b5886a] transition duration-200 custom-height"
            aria-label={t('searchButton')}
          >
            {t('searchButton')}
          </button>
        </div>
        <div className="flex flex-wrap gap-4 mb-8" role="list">
          {suggestions.map((suggestion, index) => (
            <span
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="suggestion px-4 py-2 bg-blue-100 text-blue-800 rounded-full cursor-pointer hover:bg-blue-200 transition duration-200"
              role="listitem"
              tabIndex={0}
              onKeyPress={(e) => { if (e.key === 'Enter') handleSuggestionClick(suggestion); }}
              aria-label={t('suggestion', { suggestion })}
            >
              {suggestion}
            </span>
          ))}
        </div>
        {response && (
          <div className="mt-8">
            {/* <h2 className="text-2xl font-bold mb-4" role="heading" aria-level="2">{t('responseTitle')}</h2> */}
            <ReactMarkdown className="bg-gray-100 p-6 rounded-lg shadow-md" aria-live="polite">{response}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;