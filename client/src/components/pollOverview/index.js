// npm packages
import React from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {ListGroupItem, Col} from 'react-bootstrap';

import './pollOverview.scss';

const pollOverview = (id, question, numVotes, date) => (
  <LinkContainer to={`/poll/${id}`} key={id}>
    <ListGroupItem className="row">
      <Col xs={12} sm={6} className="pollOver_question">{question}</Col>
      <Col xs={2} sm={2}>{numVotes}</Col>
      <Col xs={10} sm={4}>{date}</Col>
    </ListGroupItem>
  </LinkContainer>
);


export default pollOverview;
