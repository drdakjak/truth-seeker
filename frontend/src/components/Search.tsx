import React, { useState } from 'react';
import { generateClient } from 'aws-amplify/api';;
import { post, get } from 'aws-amplify/api';;

const client = generateClient();

const Search: React.FC = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSearch = async () => {
    try {
      // const payload = JSON.stringify({ prompt: input })
      // console.log("Payload")
      // console.log(payload)
      const encodedUriInput = encodeURIComponent(input)
      console.log(encodedUriInput)


      console.log("Health Check");
      const health_check = await get({
        apiName: "TruthSeekerRestApi", 
        path: "health",
      }).response;
      console.log("Health Check finished");

      console.log(health_check);
      console.log("Generate Response");

      const response = await get({
        apiName: "TruthSeekerRestApi", 
        path: `generate_response/${encodedUriInput}`,
        options: {
          headers: {'Content-Type': 'application/json'}
        }
      }).response;
      console.log("Generate Response finished");

      console.log(response.body);
      const data = await response.body.json();
      console.log(data)
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