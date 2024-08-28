import logo from '../../public/logo-white.svg';

import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { get } from 'aws-amplify/api';
import NavBar from './NavBar';
import References from './References';
import { useTranslation } from 'react-i18next';
import Suggestions from './Suggestion';
import Spinner from './Spinner';
import SearchBar from './SearchBar';

const Search = () => {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [language] = useState(t('language'));
  const [references, setReferences] = useState([]);
  const textSequence = t('textSequence', { returnObjects: true });

  const suggestions = t('suggestions', { returnObjects: true });

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
  return (
    <div className="">
      <NavBar />
      <div className="max-w-5xl mx-auto pt-20">
        <div className="flex items-center justify-center mb-12">
          {/* <img src={logo} alt="Truth Seeker Logo" className="h-32 mr-6" /> */}
          <div>
            <div className="app-container">
              <h1 className="app-title text-7xl font-extrabold text-gray-50 font-serif tracking-tight">{t('appTitle')}</h1>
              <p className="app-subtitle text-center text-3xl text-indigo-300 font-light mt-2">{t('appSubtitle')}</p>
            </div>
          </div>
        </div>
        <p className="app-subsubtitle text-center text-l text-wrap leading-snug text-indigo-300 font-light mt-5">
          <span className="text-white text-xl">{t('appSubsubtitlePart1')}</span>
          {t('appSubsubtitlePart2')}
          <span className="text-white text-xl">{t('appSubsubtitlePart3')}</span>
          {t('appSubsubtitlePart4')}
          <span className="text-white underline text-xl">{t('appSubsubtitlePart5')}</span>
          {t('appSubsubtitlePart6')}
        </p>
        <div className='px-24 py-4'>
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center mb-6">
                <SearchBar
                  input={input}
                  setInput={setInput}
                  placeholder={t('searchPlaceholder')}
                  searchButton={t('searchButton')}
                  handleSearch={handleSearch} />
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <Suggestions
                  suggestions={suggestions}
                  handleSuggestionClick={handleSuggestionClick} />
              </div>
            </div>
          </div>
        </div>

        {response && (
          <div className="bg-slate-50 fade-in mt-3 shadow-xl rounded-lg overflow-hidden border-4">
            <div className="p-6 font-sans">

              <ReactMarkdown
                className=""
                components={{
                  h1: ({ node, ...props }) => <h1 className="text-indigo-900 text-4xl my-5 font-semibold" {...props} />,
                  h2: ({ node, ...props }) => <h2 className="bg-indigo-950 text-white shadow-sm py-2 text-2xl rounded-lg" {...props} />,
                  h3: ({ node, ...props }) => <h3 className="" {...props} />,
                  p: ({ node, ...props }) => <p className="" {...props} />,
                }}
              >
                {response}
              </ReactMarkdown>
              <References references={references} referenceTitle={t('referenceTitle')} />
            </div>
          </div>
        )}
      </div>
      {loading && <Spinner loading={loading} textSequence={textSequence} />}
    </div>
  );
};

export default Search;