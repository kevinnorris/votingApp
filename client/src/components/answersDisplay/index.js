import React from 'react';
import {ListGroup, ListGroupItem, Button} from 'react-bootstrap';

import './answersDisplay.scss';

let k = 1;
const nextKey = () => {
  k += 1;
  return k;
};

const answerDisplay = (answer, setAnswer, activeAnswer) => (
  <ListGroupItem
    key={nextKey()}
    onClick={() => setAnswer(answer)}
    className={activeAnswer === answer ? 'answerDis_active' : ''}
  >
    {answer}
  </ListGroupItem>
);


class AnswersDisplay extends React.Component {
  constructor() {
    super();
    this.state = {activeAnswer: ''};
    this.setActiveAnswer = this.setActiveAnswer.bind(this);
    this.handelVote = this.handelVote.bind(this);
  }

  setActiveAnswer(answer) {
    if (this.state.activeAnswer === answer) {
      this.setState({activeAnswer: ''});
    } else {
      this.setState({activeAnswer: answer});
    }
  }

  handelVote() {
    if (this.state.activeAnswer !== '') {
      this.props.vote(this.state.activeAnswer);
    }
  }

  render() {
    return (
      <div className="text-center">
        <ListGroup>
          {this.props.answers.map(a => answerDisplay(a, this.setActiveAnswer, this.state.activeAnswer))}
        </ListGroup>
        <Button bsStyle="success" className="answerDis_voteBtn" onClick={this.handelVote}>Vote</Button>
      </div>
    );
  }
}

AnswersDisplay.propTypes = {
  answers: React.PropTypes.array.isRequired,
  vote: React.PropTypes.func.isRequired,
};

export default AnswersDisplay;
