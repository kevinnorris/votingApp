// npm packages
import React from 'react';
import {ListGroupItem, Col} from 'react-bootstrap';

import './pollOverview.scss';

const pollOverview = (key, question, numVotes, author, date, title) => (
  <ListGroupItem key={key} className={title ? 'row title' : 'row'} active={title}>
    <Col xs={8} sm={4}>{question}</Col>
    <Col xs={4} sm={2}>{numVotes}</Col>
    <Col xs={8} sm={4}>{date}</Col>
    <Col xs={4} sm={2}>{author}</Col>
  </ListGroupItem>
);

export default pollOverview;
