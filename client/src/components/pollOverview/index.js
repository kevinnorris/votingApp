// npm packages
import React from 'react';

import './pollOverview.scss';

const pollOverview = (key, question, numVotes, author, date) => (
  <div key={key}>
    <ul>
      <li>Question: {question}</li>
      <li>Votes: {numVotes}</li>
      <li>Author: {author}</li>
      <li>Date Created: {date}</li>
    </ul>
  </div>
);

export default pollOverview;
