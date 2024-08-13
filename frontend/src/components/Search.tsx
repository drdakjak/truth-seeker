import React, { useState } from 'react';
import { generateClient } from 'aws-amplify/api';;
import { post, get } from 'aws-amplify/api';;

const client = generateClient();

const Search: React.FC = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSearch = async () => {
    try {
      const lambdaPayload = {
        body: JSON.stringify({ prompt: input })
      };
      console.log("Health Check");
      
      const body = await get({
        apiName: "TruthSeekerRestApi", 
        path: "health",
        // options: {
        //   headers: {'Content-Type': 'application/json'},
        // }
      }).response;
      console.log("Health Check");

      console.log(body);

      // const body = await post({
      //   apiName: "TruthSeekerRestApi", 
      //   path: "generate_response/TODO/",
      //   options: {
      //     headers: {'Content-Type': 'application/json'},
      //   }
      // }).response;

      // const res = await fetch('https://api.example.com/lambda', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(lambdaPayload)
      // });
      console.log(body);
      const data = await body.json();
      setResponse(data);
    } catch (error) {
      console.error('Error calling Lambda function:', error);
    }
  };

  return (
    <div className="Search">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your text"
      />
      <button onClick={handleSearch}>Submit</button>
      <div className="Response">
        {response}
      </div>
    </div>
  );
};

export default Search;