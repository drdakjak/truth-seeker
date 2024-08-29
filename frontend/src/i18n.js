import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "appTitle": "Truth Seeker",
      "appSubtitle": "Your Way Out of the Rabbit Hole.",

      "appSubsubtitle": "Truth Seeker scans the whole internet to offer you the facts without motives.",

      "appSubsubtitlePart1": "Truth Seeker",
      "appSubsubtitlePart2": " scans the ",
      "appSubsubtitlePart3": "whole internet ",
      "appSubsubtitlePart4": "to offer you the facts ",
      "appSubsubtitlePart5": "without motives",
      "appSubsubtitlePart6": ".",

      "responseTitle": "The truth is perhaps hidden somewhere here: ", //"Response",
      "searchButton": "Feed", //"Search",
      "searchPlaceholder": "Feed the Rabbit with a Question", //"Enter your question",
      "referenceTitle": "References",
      "textSequence": ['Loading', 'Scanning the internet', 'Generating content', 'Critically thinking', 'Almost there', 'Please wait'],
      "errorMsg": "Sorry, something went wrong - we have a bug.",
      "language": "en",
      "suggestions": [
        "Was the 9/11 attack orchestrated by the U.S. government or did officials have insider knowledge?",
        "Is climate change real?",
        "Chemtrails",
      ]
    }
  },
  cs: {
    translation: {
      "appTitle": "Truth Seeker",
      "appSubtitle": "Tvoje cesta z králičí nory.",
      "appSubsubtitle": "Truth Seeker prohledává celý internet, aby ti nabídl fakta bez postranních úmyslů.",

      "appSubsubtitlePart1": "Truth Seeker",
      "appSubsubtitlePart2": " prohledává ",
      "appSubsubtitlePart3": "celý internet",
      "appSubsubtitlePart4": ", aby ti nabídl fakta bez ",
      "appSubsubtitlePart5": "postranních úmyslů",
      "appSubsubtitlePart6": ".",

      "responseTitle": "Pravda se skrývá možná někde tady: ", // "Odpověď", 
      "searchButton": "Nakrm", //"Hledej",
      "searchPlaceholder": "Nakrm králíka otázkou", //"Zadejte svou otázku",
      "textSequence": ['Čteme internety', 'Chroupáme výsledky', 'Přemýšlíme', 'Vytváříme obsah', 'Skoro hotovo'],
      "referenceTitle": "Zroje",
      "errorMsg": "Omlouváme se, něco se pokazilo - máme blechy v kódu.",
      "language": "cs",
      "suggestions": [
        "Je změna klimatu skutečná?",
        "Ovládají svět ve skutečnosti mimozemšťané?",
        "Byl virus COVID-19 uměle vytvořen nebo je spojen s technologií 5G?"
      ]
    }
  },
  de: {
    translation: {
      "appTitle": "Truth Seeker",
      "appSubtitle": "Your Way Out of the Rabbit Hole.",

      "appSubsubtitlePart1": "Truth Seeker",
      "appSubsubtitlePart2": " durchsucht das ",
      "appSubsubtitlePart3": "gesamte Internet",
      "appSubsubtitlePart4": ", um dir die Fakten ohne ",
      "appSubsubtitlePart5": "Hintergedanken",
      "appSubsubtitlePart6": " anzubieten.",
      
      "responseTitle": "Die Wahrheit verbirgt sich vielleicht irgendwo hier:", //"Antwort",
      "searchButton": "Füttere", // "Suche",
      "searchPlaceholder": "Füttere den Hasen mit einer Frage", //"Geben Sie Ihre Frage ein",
      "referenceTitle": "Referenzen",
      "errorMsg": "Entschuldigung, etwas ist schief gelaufen - wir haben einen Fehler.",
      "language": "de",
      "textSequence": ['Internet wird durchsucht', 'Bitte warte', 'Fast fertig'],
      "suggestions": [
        "Ist der Klimawandel real?",
        "Ist Angela Merkel ein Reptil?"
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