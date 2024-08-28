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
    <div className="antialiased">
      <NavBar />
      <div className="max-w-5xl mx-auto pt-20">
        <div className="flex items-center justify-center mb-12">
          {/* <img src={logo} alt="Truth Seeker Logo" className="h-32 mr-6" /> */}
          <div>
            <div className="">
              <h1 className="text-center text-7xl font-extrabold text-gray-50 font-serif tracking-tight">{t('appTitle')}</h1>
              <p className="app-subtitle text-center md:text-3xl text-2xl text-indigo-300 font-light mt-2">{t('appSubtitle')}</p>
            </div>
          </div>
        </div>
        <p className="text-center md:text-lg text-sm text-wrap leading-loose text-indigo-300 font-light mt-5">
          <span className="text-white md:text-xl text-base leading-snag font-serif">{t('appSubsubtitlePart1')}</span>
          {t('appSubsubtitlePart2')}
          <span className="text-white md:text-xl text-base">{t('appSubsubtitlePart3')}</span>
          {t('appSubsubtitlePart4')}
          <span className="text-white underline underline-offset-2 md:text-xl text-base">{t('appSubsubtitlePart5')}</span>
          {t('appSubsubtitlePart6')}
        </p>
        <div className='md:px-24 py-4'>
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
                className="bg-slate-50 text-indigo-950 text-2xl font-light leading-relaxed"
                components={{
                  h1: ({ node, ...props }) => <h1 className="tracking-tight text-center p-5 my-10 text-4xl md:text-5xl leading-snag font-serif font-medium border-b-4 border-indigo-900" {...props} />,
                  h2: ({ node, ...props }) => <h2 className="font-serif font-medium mt-6 mb-3 py-2 text-3xl " {...props} />,
                  h3: ({ node, ...props }) => <h3 className="m-4 font-medium underline underline-offset-2" {...props} />,
                  p: ({ node, ...props }) => <p className="indent-5" {...props} />,
                  ul: ({ node, ...props }) => <ul className="" {...props} />,
                  li: ({ node, ...props }) => <li className="" {...props} />,

                }}
              >
                {response}
              </ReactMarkdown>
              <References references={references} referenceTitle={t('referenceTitle')} />
            </div>
          </div>
        )}
        {/* </div> */}

      </div>
      {loading && <Spinner loading={loading} textSequence={textSequence} />}
    </div>
  );
};

export default Search;