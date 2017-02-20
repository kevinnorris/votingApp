// npm packages
import React from 'react';
import {Grid, ListGroup, ListGroupItem, Col} from 'react-bootstrap';

import pollOverview from '../pollOverview';
import './pollList.scss';

const pollList = ({sortByVotes, ascending, toggleSort, polls}) => {
  const elemClass = 'pollList_titleElement';
  let numVoteClass = `${elemClass} pollList_sortToggle`;
  let dateClass = numVoteClass;
  if (sortByVotes) {
    numVoteClass += ascending ? ' pollList_heighlightAsc' : ' pollList_heighlightDesc';
  } else {
    dateClass += ascending ? ' pollList_heighlightAsc' : ' pollList_heighlightDesc';
  }

  return (
    <Grid>
      <ListGroup id="pollList">
        <ListGroupItem key={'title'} className="row" active >
          <Col xs={8} sm={4} className={elemClass}>Question</Col>
          <Col xs={4} sm={2} className={numVoteClass}>
            <span onClick={() => toggleSort('votes')}>
              Votes
            </span>
          </Col>
          <Col xs={8} sm={4} className={dateClass}>
            <span onClick={() => toggleSort('date')}>
              Date
            </span>
          </Col>
          <Col xs={4} sm={2} className="pollOver_titleElement">Author</Col>
        </ListGroupItem>
        {polls.map(poll =>
          pollOverview(
            poll._id,
            poll.question,
            poll.votes.length,
            poll.author,
            new Date(poll.date).toLocaleString(),
            false))
        }
      </ListGroup>
    </Grid>
  );
};

export default pollList;
