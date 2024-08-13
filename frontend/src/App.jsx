import { Amplify } from "aws-amplify";
import React from 'react';
import Search from '../../frontend/src/components/Search';
import './App.css';

console.log(import.meta.env.VITE_API_ENDPOINT)
console.log(import.meta.env.VITE_API_REGION)

Amplify.configure({
  API: {
    REST: {
      TruthSeekerRestApi:{
        endpoint: import.meta.env.VITE_API_ENDPOINT,
        // region: import.meta.env.VITE_API_REGION,
        region: 'us-west-2',
      }
  }
}
});

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>| Search and Display Markdown |</h1>
      </header>
      <Search />
    </div>
  );
}

export default App;
