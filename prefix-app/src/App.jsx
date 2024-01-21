import React, { useState } from 'react';

const LongestCommonPrefixFinder = () => {
  const [input, setInput] = useState('');
  const [stringArray, setStringArray] = useState([]);
  const [result, setResult] = useState('');

  const handleInputChange = (event) => {
    setInput(event.target.value);
  }

  const handleAddString = () => {
    setStringArray(prevArray => [...prevArray, input]);
    setInput('');
  }

  const findLongestCommonPrefix = () => {
    if (stringArray.length === 0) {
      setResult("Array is empty");
      return;
    }

    let prefix = stringArray[0];

    for (let i = 1; i < stringArray.length; i++) {
      let j = 0;
      while (j < prefix.length && j < stringArray[i].length && prefix[j] === stringArray[i][j]) {
        j++;
      }

      prefix = prefix.substring(0, j);

      if (prefix === "") {
        break;
      }
    }

    setResult(prefix);
  }

  return (
    <div>
      <label>Enter string:</label>
      <input type="text" value={input} onChange={handleInputChange} />
      <button onClick={handleAddString}>Add to Array</button>
      <button onClick={findLongestCommonPrefix}>Find Longest Common Prefix</button>
      <p>String Array: {JSON.stringify(stringArray)}</p>
      <p>Result: {result}</p>
    </div>
  );
}

export default LongestCommonPrefixFinder;
