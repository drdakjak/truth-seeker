import React, { useState } from 'react';
import { generateClient } from 'aws-amplify/api';;
import { post } from 'aws-amplify/api';;

const client = generateClient();

const Search: React.FC = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSearch = async () => {
    try {
      const lambdaPayload = {
        body: JSON.stringify({ prompt: input })
      };

      const res = await post({
        apiName: "TruthSeekerRestApi", 
        path: "generate_response/TODO"
      });

      // const res = await fetch('https://api.example.com/lambda', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(lambdaPayload)
      // });
      console.log(res);
      const data = await res.json();
      setResponse(data.body);
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