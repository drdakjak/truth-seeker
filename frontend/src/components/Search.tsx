import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { get } from 'aws-amplify/api';
import FlagDropdown from './FlagDropdown';
import { useTranslation } from 'react-i18next';

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
  console.log(language);
  const suggestions = t('suggestions', { returnObjects: true });

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const encodedUriInput = encodeURIComponent(input);

      const health_check = await get({
        apiName: "TruthSeekerRestApi", 
        path: "health",
      }).response;
      console.log(health_check);

      const response = await get({
        apiName: "TruthSeekerRestApi", 
        path: `generate_response/${language}/${encodedUriInput}`,
        options: {
          headers: {'Content-Type': 'application/json'}
        }
      }).response;
      console.log("Generate Response finished");

      console.log(response.body);
      const data = await response.body.json();
      console.log(data);
      setResponse(data);
    } catch (error) {
      console.error('Error calling Lambda function:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    handleSearch();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">{t('appTitle')}</h1>
        <div className="w-full mb-6 flex items-center">
          <FlagDropdown
            value={language}
            onChange={handleLanguageChange}
            options={languageOptions}
            className="custom-height"
          />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('placeholder')}
            className="w-full p-4 border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 custom-height"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white p-4 rounded-r-lg hover:bg-blue-700 transition duration-200 custom-height"
          >
            {t('searchButton')}
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {suggestions.map((suggestion, index) => (
            <span
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="suggestion"
            >
              {suggestion}
            </span>
          ))}
        </div>
        {loading && (
          <div className="spinner">
            Loading...
          </div>
        )}
        {response && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">{t('responseTitle')}</h2>
            <ReactMarkdown className="bg-gray-100 p-4 rounded-lg">{response}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;