import React, { useState } from 'react';
import { validate } from './yipValidator';
import './App.css';
import { generateYIP } from './yipGenerator';

function App() {
  const [text, setText] = useState('');
  const [validationResult, setValidationResult] = useState(null);
  const [yipNumberAssigned, setYipNumberAssigned] = useState(false);
  const [yipNumber, setYipNumber] = useState('');
  const [yipType, setYipType] = useState('Strategy');
  const [yipCategory, setYipCategory] = useState('Core');
  const [yipAuthor, setYipAuthor] = useState('');
  const [yipAuthorGithubUsername, setYipAuthorGithubUsername] = useState('');
  const [yipDateCreated, setYipDateCreated] = useState('');
  const [yipStatus, setYipStatus] = useState('WIP');
  const [generatedYIP, setGeneratedYIP] = useState('');

  const handleGenerate = (event) => {
    event.preventDefault();
    const yipContent = generateYIP({
      yipNumberAssigned,
      yipNumber,
      yipType,
      yipCategory,
      yipAuthor,
      yipAuthorGithubUsername,
      yipDateCreated,
      yipStatus,
    });
    setGeneratedYIP(yipContent);
  };
  
  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleValidate = (event) => {
    event.preventDefault();
    setValidationResult(validate(text));
  };

  return (
    <div className="App">
      <h1>YIP Validator</h1>
      <form onSubmit={handleValidate}>
        <textarea
          value={text}
          onChange={handleChange}
          rows="10"
          cols="50"
          placeholder="Paste your YIP text here..."
        />
        <br />
        <button type="submit">Validate</button>
      </form>
      {validationResult && (
        <div className={validationResult.isValid ? 'valid' : 'invalid'}>
          {validationResult.isValid
            ? 'YIP is valid.'
            : validationResult.errors.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
        </div>
      )}
      <h1>YIP Generator</h1>
      <form onSubmit={handleGenerate}>
        <label>
          Is the number of the YIP assigned?
          <input
            type="checkbox"
            checked={yipNumberAssigned}
            onChange={(e) => setYipNumberAssigned(e.target.checked)}
          />
        </label>
        {yipNumberAssigned && (
          <label>
            YIP Number:
            <input
              type="text"
              value={yipNumber}
              onChange={(e) => setYipNumber(e.target.value)}
            />
          </label>
        )}
        <label>
          YIP Type:
          <select value={yipType} onChange={(e) => setYipType(e.target.value)}>
            <option value="Strategy">Strategy</option>
            <option value="Protocol">Protocol</option>
            <option value="Informational">Informational</option>
          </select>
        </label>
        {yipType === 'Strategy' && (
          <label>
            YIP Category:
            <select
              value={yipCategory}
              onChange={(e) => setYipCategory(e.target.value)}
            >
              <option value="Core">Core</option>
              <option value="Networking">Networking</option>
              <option value="Interface">Interface</option>
              <option value="ERC">ERC</option>
            </select>
          </label>
        )}
        <label>
          Author:
          <input
            type="text"
            value={yipAuthor}
            onChange={(e) => setYipAuthor(e.target.value)}
          />
        </label>
        <label>
          Author's GitHub Username:
          <input
            type="text"
            value={yipAuthorGithubUsername}
            onChange={(e) => setYipAuthorGithubUsername(e.target.value)}
          />
        </label>
        <label>
          YIP Status:
          <select
            value={yipStatus}
            onChange={(e) => setYipStatus(e.target.value)}
          >
            <option value="WIP">WIP</option>
            <option value="Withdrawn">Withdrawn</option>
            <option value="Implemented">Implemented</option>
            <option value="Proposed">Proposed</option>
            <option value="Approved">Approved</option>
            <option value="Deferred">Deferred</option>
            <option value="Rejected">Rejected</option>
            <option value="Moribund">Moribund</option>
            <option value="Voting">Voting</option>
          </select>
        </label>
        <label>
          YIP Date Created:
          <input
            type="date"
            value={yipDateCreated}
            onChange={(e) => setYipDateCreated(e.target.value)}
          />
        </label>
        <button type="submit">Generate YIP</button>
      </form>
      <h2>Generated YIP:</h2>
      <textarea value={generatedYIP} readOnly rows="20" cols="50" />
    </div>
  );
}

export default App;