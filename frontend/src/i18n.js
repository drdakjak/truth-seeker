import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "appTitle": "Q&A Web App",
      "responseTitle": "The truth is perhaps hidden somewhere here: ", //"Response",
      "searchButton": "Feed", //"Search",
      "placeholder": "Feed the Rabbit with a Question", //"Enter your question",
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
      "responseTitle": "Pravda se skrývá možná někde tady: ", // "Odpověď", 
      "searchButton": "Nakrm", //"Hledej",
      "placeholder": "Nakrm králíka otázkou", //"Zadejte svou otázku",
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
      "responseTitle": "Die Wahrheit verbirgt sich vielleicht irgendwo hier:", //"Antwort",
      "searchButton": "Füttere", // "Suche",
      "placeholder": "Füttere den Hasen mit einer Frage", //"Geben Sie Ihre Frage ein",
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