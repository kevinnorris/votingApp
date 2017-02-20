// npm packages
import React from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {ListGroupItem, Col} from 'react-bootstrap';

import './pollOverview.scss';

const pollOverview = (id, question, numVotes, author, date) => (
  <LinkContainer to={`/poll/${id}`} key={id}>
    <ListGroupItem className="row">
      <Col xs={8} sm={4}>{question}</Col>
      <Col xs={4} sm={2}>{numVotes}</Col>
      <Col xs={8} sm={4}>{date}</Col>
      <Col xs={4} sm={2}>{author}</Col>
    </ListGroupItem>
  </LinkContainer>
);


export default pollOverview;
