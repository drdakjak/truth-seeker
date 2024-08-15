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
    <div className="App">
      <Search />
    </div>
  );
}

export default App;