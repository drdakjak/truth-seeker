import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "appTitle": "Q&A Web App",
      "responseTitle": "Response",
      "searchButton": "Search",
      "placeholder": "Enter your question",
      "suggestions": [
        "Is climate change real?",
        "What is the capital of France?",
        "How to learn programming?"
      ]
    }
  },
  cs: {
    translation: {
      "appTitle": "Q&A Webová aplikace",
      "responseTitle": "Odpověď",
      "searchButton": "Hledat",
      "placeholder": "Zadejte svou otázku",
      "suggestions": [
        "Je změna klimatu skutečná?",
        "Jaké je hlavní město Francie?",
        "Jak se naučit programovat?"
      ]
    }
  },
  de: {
    translation: {
      "appTitle": "Q&A Webanwendung",
      "responseTitle": "Antwort",
      "searchButton": "Suche",
      "placeholder": "Geben Sie Ihre Frage ein",
      "suggestions": [
        "Ist der Klimawandel real?",
        "Was ist die Hauptstadt von Frankreich?",
        "Wie lernt man Programmieren?"
      ]
    }
  }
};

i18n
  .use(LanguageDetector) // Add language detector
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en", // Fallback language if detection fails
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;