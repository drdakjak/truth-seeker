import { Amplify } from "aws-amplify";
import React from 'react';
import Search from '../../frontend/src/components/Search';
import './App.css';
import './i18n'; // Import the i18n configuration

Amplify.configure({
  API: {
    REST: {
      TruthSeekerRestApi:{
        endpoint: import.meta.env.VITE_API_ENDPOINT,
        region: import.meta.env.VITE_REGION,
      }
    }
  }
});

function App() {
  return (
    <div className="App min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Truth Seeker</h1>
        <p className="text-xl text-gray-600">Ask me anything, and I'll find the truth for you</p>
      </header>
      <main className="w-full max-w-2xl">
        <Search />
      </main>
    </div>
  );
}

export default App;