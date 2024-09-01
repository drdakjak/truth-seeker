import React from 'react';


const validateInput = (input: string) => {
  const maxLength = 200;
  const disallowedChars = /[<>]/;

  if (input.length > maxLength) {
    return "inputTooLong";
  }

  if (disallowedChars.test(input)) {
    return "disallowedChars";
  }
  return ''
};

export default validateInput;