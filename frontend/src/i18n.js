import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "appTitle": "Truth Seeker",
      "appSubtitle": "Your Way Out of the Rabbit Hole.",

      "appSubsubtitle": "Truth Seeker scans the whole internet to offer you the facts without motives.",
      "responseTitle": "The truth is perhaps hidden somewhere here: ", //"Response",
      "searchButton": "Feed", //"Search",
      "placeholder": "Feed the Rabbit with a Question", //"Enter your question",
      "references": "References",
      "textSequence": ['Loading', 'Please wait', 'Almost there'],
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
      "responseTitle": "Pravda se skrývá možná někde tady: ", // "Odpověď", 
      "searchButton": "Nakrm", //"Hledej",
      "placeholder": "Nakrm králíka otázkou", //"Zadejte svou otázku",
      "textSequence": ['Čteme internety', 'Chroupáme výsledky', 'Skoro hotovo'],
      "references": "Zroje",
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
      "appSubsubtitle": "Truth Seeker durchsucht das gesamte Internet, um dir die Fakten ohne Hintergedanken anzubieten.",
      "responseTitle": "Die Wahrheit verbirgt sich vielleicht irgendwo hier:", //"Antwort",
      "searchButton": "Füttere", // "Suche",
      "placeholder": "Füttere den Hasen mit einer Frage", //"Geben Sie Ihre Frage ein",
      "references": "Referenzen",
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