import React, { useState } from 'react';
import { validate } from './yipValidator';
import './App.css';
import { generateYIP } from './yipGenerator';

function App() {
  const [text, setText] = useState('');
  const [validationResult, setValidationResult] = useState(null);
  const [yipNumberAssigned, setYipNumberAssigned] = useState(false);
  const [yipNumber, setYipNumber] = useState('');
  const [yipAuthor, setYipAuthor] = useState('');
  const [yipDateCreated, setYipDateCreated] = useState('');
  const [yipStatus, setYipStatus] = useState('WIP');
  const [yipTitle, setYipTitle] = useState('');
  const [snapshotUrl, setSnapshotUrl] = useState('');
  const [snapshotSpace, setSnapshotSpace] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [snapshot, setSnapshot] = useState('');
  const [yesVotes, setYesVotes] = useState('');
  const [noVotes, setNoVotes] = useState('');
  const [generatedYIP, setGeneratedYIP] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const handleGenerate = (event) => {
    event.preventDefault();
    const yipContent = generateYIP({
      yipNumberAssigned,
      yipNumber,
      yipAuthor,
      yipDateCreated,
      yipStatus,
      yipTitle,
      snapshotUrl,
      snapshotSpace,
      startDate,
      endDate,
      snapshot,
      yesVotes,
      noVotes,
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

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedYIP).then(
      () => {
        // alert("Generated YIP copied to clipboard!");
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`App${darkMode ? ' dark-mode' : ''}`}>
      <a href="https://github.com/MarcoWorms/yip-toolkit" target="_blank">
        <img decoding="async" loading="lazy" width="149" height="149"
         src="https://github.blog/wp-content/uploads/2008/12/forkme_right_darkblue_121621.png?resize=149%2C149"
         alt="Fork me on GitHub" style={{
          position: 'absolute',
          top: 0,
          right: 0,

          }} /> 
      </a>
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
          Author:
          <input
            type="text"
            value={yipAuthor}
            onChange={(e) => setYipAuthor(e.target.value)}
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
          YIP Title:
          <input
            type="text"
            value={yipTitle}
            onChange={(e) => setYipTitle(e.target.value)}
          />
        </label>
        <label>
          YIP Date Created:
          <input
            type="date"
            value={yipDateCreated}
            onChange={(e) =>
              setYipDateCreated(e.target.value)
            }
          />
        </label>
        {yipNumberAssigned && (
          <>
            <label>
              Snapshot URL:
              <input
                type="text"
                value={snapshotUrl}
                onChange={(e) => setSnapshotUrl(e.target.value)}
              />
            </label>
            <label>
              Snapshot Space (default: veYFI.eth):
              <input
                type="text"
                value={snapshotSpace}
                onChange={(e) => setSnapshotSpace(e.target.value)}
              />
            </label>
            <label>
              Start Date:
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </label>
            <label>
              End Date:
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </label>
            <label>
              Snapshot:
              <input
                type="text"
                value={snapshot}
                onChange={(e) => setSnapshot(e.target.value)}
              />
            </label>
            <label>
              Yes Votes:
              <input
                type="text"
                value={yesVotes}
                onChange={(e) => setYesVotes(e.target.value)}
              />
            </label>
            <label>
              No Votes:
              <input
                type="text"
                value={noVotes}
                onChange={(e) => setNoVotes(e.target.value)}
              />
            </label>
          </>
        )}
        <button type="submit">Generate YIP</button>
      </form>
      {generatedYIP && (
        <>
          <textarea value={generatedYIP} readOnly rows="20" cols="50" />
          <button type="button" onClick={handleCopy} disabled={!generatedYIP}>
            Copy Generated YIP
          </button>
        </>
      )}
      {/* <div className="dark-mode-toggle">
        <label>
          Dark Mode:
          <input
            type="checkbox"
            checked={darkMode}
            onChange={toggleDarkMode}
          />
        </label>
      </div> */}
    </div>
  );
}

export default App;