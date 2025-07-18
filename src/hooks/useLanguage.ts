import { useState, useEffect } from 'react';
import { Language, getTranslation, Translations } from '@/lib/translations';

const LANGUAGE_STORAGE_KEY = 'tabtext-language';

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (saved && ['en', 'it', 'es', 'ru', 'zh'].includes(saved)) {
      return saved as Language;
    }
    
    // Auto-detect browser language
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('it')) {
      return 'it';
    }
    if (browserLang.startsWith('es')) {
      return 'es';
    }
    if (browserLang.startsWith('ru')) {
      return 'ru';
    }
    if (browserLang.startsWith('zh')) {
      return 'zh';
    }
    return 'en';
  });

  const [t, setT] = useState<Translations>(() => getTranslation(language));

  useEffect(() => {
    setT(getTranslation(language));
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language]);

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  return {
    language,
    t,
    changeLanguage,
  };
};