import logo from '../../public/logo.svg';
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { get } from 'aws-amplify/api';
import FlagDropdown from './FlagDropdown';
import { useTranslation } from 'react-i18next';
import '../output.css';

const Search = () => {
  const { t, i18n } = useTranslation();
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState(t('language'));
  const [references, setReferences] = useState([]);
  const [timeCounter, setTimeCounter] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const textSequence = t('textSequence', { returnObjects: true });

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
          headers: { 'Content-Type': 'application/json' }
        }
      }).response;
      const data = await response.body.json();
      const content = data["content"];
      const references = data["references"];
      setResponse(content);
      setReferences(references);
    } catch (error) {
      console.error('Error calling Lambda function:', error);
      setResponse("An error occurred while processing your request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    handleSearch(suggestion);
  };

  const ReferenceTab = ({ refNumber, title, url }) => (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="reference-tab inline-block bg-gray-200 rounded-lg py-2 px-3 text-sm font-medium text-gray-800 hover:bg-gray-300 transition duration-150 ease-in-out m-1"
    >
      <span className="font-bold">[{refNumber}]</span>
      <span className="block">{title}</span>
    </a>
  );

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl">
        <div className="p-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <FlagDropdown
              value={language}
              onChange={handleLanguageChange}
              options={languageOptions}
              className="w-full sm:w-48"
              aria-label={t('languageSelector')}
            />
            <div className="relative w-full">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('placeholder')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                aria-label={t('searchInput')}
              />
            </div>
          </div>
          <button
            onClick={() => handleSearch(input)}
            className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center space-x-2"
            aria-label={t('searchButton')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
            <span>{t('searchButton')}</span>
          </button>

          <div className="flex flex-wrap gap-2 overflow-x-auto pb-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm hover:bg-gray-200 transition-all duration-300"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>

      {response && (
        <div className="mt-8 bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 animate-fadeIn">
          <div className="p-6 space-y-6">
            <ReactMarkdown
              className="prose max-w-none"
              components={{
                h1: ({ node, ...props }) => <h1 className="text-2xl font-bold text-gray-900 mb-4" {...props} />,
                h2: ({ node, ...props }) => <h2 className="text-xl font-semibold text-gray-800 mb-3" {...props} />,
                h3: ({ node, ...props }) => <h3 className="text-lg font-medium text-gray-700 mb-2" {...props} />,
                p: ({ node, ...props }) => <p className="text-gray-600 mb-4 leading-relaxed" {...props} />,
                ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-4" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal pl-5 mb-4" {...props} />,
                li: ({ node, ...props }) => <li className="mb-2" {...props} />,
              }}
            >
              {response}
            </ReactMarkdown>

            {references.length > 0 && (
              <div className="mt-8 border-t pt-4">
                <h2 className="text-xl font-bold mb-4">{t('references')}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {references.map((ref, index) => (
                    <ReferenceTab
                      key={index}
                      refNumber={ref[0]}
                      title={ref[1]}
                      url={ref[2]}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {loading && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center backdrop-filter backdrop-blur-sm transition-all duration-300">
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4 animate-pulse">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-800">{textSequence[currentTextIndex]}</p>
              <p className="text-sm text-gray-600">{timeCounter}s</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;