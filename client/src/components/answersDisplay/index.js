import React from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';

let k = 1;
const nextKey = () => {
  k += 1;
  return k;
};

const answerDisplay = (answer, vote) => (
  <ListGroupItem key={nextKey()} onClick={() => vote(answer)}>{answer}</ListGroupItem>
);

const answersDisplay = ({answers, vote}) => (
  <ListGroup>
    {answers.map(a => answerDisplay(a, vote))}
  </ListGroup>
);

export default answersDisplay;
