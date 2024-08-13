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
      
      const get_body = await get({
        apiName: "TruthSeekerRestApi", 
        path: "health",
      }).response;
      console.log("Health Check");

      console.log(get_body);
      console.log("Generate Response");

      const response = await get({
        apiName: "TruthSeekerRestApi", 
        path: "generate_response/TODO",
        // options: {
        //   headers: {'Content-Type': 'application/json'},
        // }
      }).response;
      console.log("Generate Response");

      console.log(response.body);
      const data = await response.body.json();
      console.log(data)
      setResponse(response.body);
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