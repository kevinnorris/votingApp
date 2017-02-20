// npm packages
import React from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {ListGroupItem, Col} from 'react-bootstrap';

import './pollOverview.scss';

const pollOverview = (id, question, numVotes, author, date, title, sortByVotes, toggleSort) => {
  if (title) {
    return (
      <ListGroupItem key={id} className="row title" active >
        <Col xs={8} sm={4} className="pollOver_titleElement">{question}</Col>
        <Col xs={4} sm={2} className={sortByVotes ? 'pollOver_titleElement pollOver_sortToggle pollOver_heighlight' : 'pollOver_titleElement pollOver_sortToggle'}>
          <span onClick={sortByVotes ? '' : toggleSort}>
            {numVotes}
          </span>
        </Col>
        <Col xs={8} sm={4} className={sortByVotes ? 'pollOver_titleElement pollOver_sortToggle' : 'pollOver_titleElement pollOver_sortToggle pollOver_heighlight'}>
          <span onClick={sortByVotes ? toggleSort : ''}>
            {date}
          </span>
        </Col>
        <Col xs={4} sm={2} className="pollOver_titleElement">{author}</Col>
      </ListGroupItem>
    );
  }
  return (
    <LinkContainer to={`/poll/${id}`} key={id}>
      <ListGroupItem className="row">
        <Col xs={8} sm={4}>{question}</Col>
        <Col xs={4} sm={2}>{numVotes}</Col>
        <Col xs={8} sm={4}>{date}</Col>
        <Col xs={4} sm={2}>{author}</Col>
      </ListGroupItem>
    </LinkContainer>
  );
};

export default pollOverview;
