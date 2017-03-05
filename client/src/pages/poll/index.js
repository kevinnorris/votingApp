import React from 'react';
import {connect} from 'react-redux';
import {Button, Modal, FormControl} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {Doughnut} from 'react-chartjs-2';

import {getPoll, vote, deletePoll, addAnswer} from '../../store/actions';
import AnswersDisplay from '../../components/answersDisplay';
import Header from '../../components/header';
import {kellyColors} from '../../util';

import './poll.scss';

const mapDispatchToProps = dispatch => ({
  getPoll: payload => dispatch(getPoll(payload)),
  vote: payload => dispatch(vote(payload)),
  deletePoll: payload => dispatch(deletePoll(payload)),
  addAnswer: payload => dispatch(addAnswer(payload)),
});

const mapStateToProps = state => ({
  polls: state.polls.polls,
  activePoll: state.polls.activePoll,
  answers: state.polls.activePoll.answers,
  userId: state.auth.user ? state.auth.user._id : '',
  token: state.auth.token,
  data: state.polls.activePoll.data,
});

class Poll extends React.Component {
  static propTypes = {
    polls: React.PropTypes.array,
    activePoll: React.PropTypes.object,
    answers: React.PropTypes.array,
    userId: React.PropTypes.string,
    token: React.PropTypes.string,
    data: React.PropTypes.array,
    getPoll: React.PropTypes.func.isRequired,
    vote: React.PropTypes.func.isRequired,
    deletePoll: React.PropTypes.func.isRequired,
    addAnswer: React.PropTypes.func.isRequired,
  }

  state = {
    showModal: false,
    newAnswer: '',
    warningMessage: '',
  }

  componentWillMount() {
    this.props.getPoll({pollId: this.props.params.pollId, userId: this.props.userId});
  }

  handelVote = (answer) => {
    this.props.vote({answer, pollId: this.props.params.pollId, userId: this.props.userId});
  }

  handelDelete = () => {
    this.props.deletePoll({pollId: this.props.params.pollId, token: this.props.token});
  }

  close = () => {
    this.setState({showModal: false, warningMessage: ''});
  }

  open = () => {
    this.setState({showModal: true});
  }

  handelInputChange = (e) => {
    this.setState({newAnswer: e.target.value});
  }

  handelSubmit = () => {
    if (this.state.newAnswer !== '') {
      this.props.addAnswer({
        pollId: this.props.params.pollId,
        answer: this.state.newAnswer,
        token: this.props.token,
        userId: this.props.userId,
      });
      this.close();
    } else {
      this.setState({warningMessage: 'Fill in the answer input to submit an answer'});
    }
  }

  render() {
    const data = {
      labels: this.props.answers,
      datasets: [{
        data: this.props.data,
        backgroundColor: kellyColors,
        hoverBackgroundColor: kellyColors,
      }],
    };
    let display;
    if (this.props.activePoll.hasVoted === null) {
      display = '';
    } else if (this.props.activePoll.hasVoted === false) {
      display = <AnswersDisplay answers={this.props.activePoll.answers} vote={this.handelVote} />;
    } else {
      display = <Doughnut data={data} />;
    }
    return (
      <div>
        <Header />
        <div className="container">
          <h1 className="poll_center">{this.props.activePoll.question}</h1>
          <p className="poll_center">By {this.props.activePoll.authorName}</p>
          {display}
          {this.props.token ?
            <Modal show={this.state.showModal} onHide={this.close} className="text-center">
              <Modal.Header closeButton>
                <Modal.Title>Add Answer</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form>
                  <p className="poll_warningMessage">{this.state.warningMessage}</p>
                  <FormControl
                    name="newAnswer"
                    type="text"
                    placeholder="Your new answer"
                    value={this.state.newAnswer}
                    onChange={this.handelInputChange}
                  />
                </form>
                <Button bsStyle="success" className="poll_submitBtn" onClick={this.handelSubmit}>
                  Submit
                </Button>
              </Modal.Body>
            </Modal> :
            ''
          }
          {this.props.token ?
            <Button bsStyle="warning" onClick={this.open}>Add answer</Button> :
            ''
          }
          {this.props.activePoll.authorId === this.props.userId ?
            <div>
              <br />
              <LinkContainer to="/myPolls">
                <Button bsStyle="danger" onClick={this.handelDelete}>Delete Poll</Button>
              </LinkContainer>
            </div> :
            ''
          }
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Poll);
