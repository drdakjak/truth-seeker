
import React, { useState } from 'react';

import FlagDropdown from './FlagDropdown';
import { useTranslation } from 'react-i18next';

const NavBar = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(t('language'));

  const languageOptions = [
    { value: 'cs', label: 'Czech', flagCode: 'CZ' },
    { value: 'de', label: 'German', flagCode: 'DE' },
    { value: 'en', label: 'English', flagCode: 'GB' },
  ];

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };
    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="../../public/logo-white.svg" className="h-10" alt="Truth Seeker Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Truth Seeker</span>
                </div>
                <div className="flex items-center md:order-2 space-x-1 md:space-x-0 rtl:space-x-reverse">
                    <FlagDropdown
                    value={language}
                    onChange={handleLanguageChange}
                    options={languageOptions}
                    // className="w-32 mr-4"
                    aria-label={t('languageSelector')}
                  />
                </div>
            </div>
        </nav>
    );
};

export default NavBar;