// npm packages
import React from 'react';
import {ListGroup, ListGroupItem, Col} from 'react-bootstrap';

import pollOverview from '../pollOverview';
import './pollList.scss';

const pollList = ({sortByVotes, ascending, sortChange, polls}) => {
  const elemClass = 'pollList_titleElement';
  let numVoteClass = `${elemClass} pollList_sortToggle`;
  let dateClass = numVoteClass;
  if (sortByVotes) {
    numVoteClass += ascending ? ' pollList_heighlightAsc' : ' pollList_heighlightDesc';
  } else {
    dateClass += ascending ? ' pollList_heighlightAsc' : ' pollList_heighlightDesc';
  }

  return (
    <ListGroup id="pollList">
      <ListGroupItem key={'title'} className="row" active >
        <Col xs={12} sm={6} className={elemClass}>Question</Col>
        <Col xs={2} sm={2} className={numVoteClass}>
          <span onClick={() => sortChange(true)}>
            Votes
          </span>
        </Col>
        <Col xs={10} sm={4} className={dateClass}>
          <span onClick={() => sortChange(false)}>
            Date
          </span>
        </Col>
      </ListGroupItem>
      {polls.map(poll =>
        pollOverview(
          poll._id,
          poll.question,
          poll.voteCount,
          new Date(poll.date).toLocaleString(),
          false))
      }
    </ListGroup>
  );
};

export default pollList;
