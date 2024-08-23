import logo from '../../public/truth-seeker-high-resolution-logo-black-transparent-2.svg';

import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { get } from 'aws-amplify/api';
import FlagDropdown from './FlagDropdown';
import { useTranslation } from 'react-i18next';

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
        setCurrentTextIndex((prev) => (prev + 1 ) % textSequence.length);
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
      console.log(`generate_response/${language}/${encodedUriInput}`)
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
      console.log(data)
      setResponse(content);
      setReferences(references);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-center mb-12">
          <img src={logo} alt="Truth Seeker Logo" className="h-32 mr-6" />
          <div>
            <div className="app-container">
              <h1 className="app-title text-6xl font-extrabold text-gray-900 font-serif tracking-tight">{t('appTitle')}</h1>
              <p className="app-subtitle text-2xl text-indigo-600 font-light mt-2">{t('appSubtitle')}</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-center mb-6">
              <FlagDropdown
                value={language}
                onChange={handleLanguageChange}
                options={languageOptions}
                className="w-32 mr-4"
                aria-label={t('languageSelector')}
              />
              <div className="flex-grow relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t('placeholder')}
                  className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  aria-label={t('searchInput')}
                />
                <button
                  onClick={() => handleSearch(input)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-150 ease-in-out"
                  aria-label={t('searchButton')}
                >
                  {t('searchButton')}
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {suggestions.map((suggestion, index) => (
                <span
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-indigo-200 transition duration-150 ease-in-out word-wrap break-word word-break break-word white-space normal"
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => { if (e.key === 'Enter') handleSuggestionClick(suggestion); }}
                >
                  {suggestion}
                </span>
              ))}
            </div>
          </div>

          {response && (
            <div className="response-container fade-in">
              <div className="response-content">
                <ReactMarkdown
                  className="prose max-w-none"
                  components={{
                    h1: ({ node, ...props }) => <h1 className="response-section" {...props} />,
                    h2: ({ node, ...props }) => <h2 className="response-section" {...props} />,
                    h3: ({ node, ...props }) => <h3 className="response-section" {...props} />,
                    p: ({ node, ...props }) => <p className="response-section" {...props} />,
                  }}
                >
                  {response}
                </ReactMarkdown>
                
                {references.length > 0 && (
                  <div className="mt-8 border-t pt-4">
                    <h2 className="text-xl font-bold mb-4">{t('references')}</h2>
                    <div className="references-container">
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
        </div>
      </div>

     
      {loading && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4">
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