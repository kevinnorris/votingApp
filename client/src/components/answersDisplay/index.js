import React from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';

let k = 1;
const nextKey = () => {
  k += 1;
  return k;
};

const answerDisplay = answer => (
  <ListGroupItem key={nextKey()}>{answer}</ListGroupItem>
);

const answersDisplay = ({answers}) => (
  <ListGroup>
    {answers.map(a => answerDisplay(a))}
  </ListGroup>
);

export default answersDisplay;
