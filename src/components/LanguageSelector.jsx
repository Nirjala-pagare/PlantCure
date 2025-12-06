import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = ({ className = '' }) => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const selectorRef = useRef(null);

  const currentLanguage = (i18n.language || 'en').split('-')[0];

  const languages = useMemo(
    () => [
      { code: 'en', label: t('languageSelector.english'), flag: '🇬🇧' },
      { code: 'hi', label: t('languageSelector.hindi'), flag: '🇮🇳' },
      { code: 'mr', label: t('languageSelector.marathi'), flag: '🇮🇳' }
    ],
    [t]
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectorRef.current && !selectorRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem('i18nextLng', code);
    setIsOpen(false);
  };

  const activeLanguage = languages.find((lang) => lang.code === currentLanguage) ?? languages[0];

  return (
    <div ref={selectorRef} className={`relative ${className}`}>
      <button
        type="button"
        aria-label={t('languageSelector.ariaLabel')}
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-between w-full md:w-auto gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:border-primary-500 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        <span className="text-lg">🌐</span>
        <span className="flex items-center gap-2">
          <span className="text-base">{activeLanguage.flag}</span>
          <span className="hidden sm:inline">{activeLanguage.label}</span>
        </span>
        <svg
          className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-48 rounded-lg border border-gray-100 bg-white py-2 shadow-lg">
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleLanguageChange(lang.code)}
              className={`flex w-full items-center gap-3 px-4 py-2 text-left text-sm transition-colors ${
                lang.code === activeLanguage.code
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
