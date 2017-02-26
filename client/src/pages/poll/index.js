import React from 'react';
import {connect} from 'react-redux';
import {Button, Modal, FormControl} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

import {getPoll, vote, deletePoll, addAnswer, openModal, closeModal} from '../../store/actions';
import AnswersDisplay from '../../components/answersDisplay';
import Header from '../../components/header';

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
});

class Poll extends React.Component {
  static propTypes = {
    polls: React.PropTypes.array,
    activePoll: React.PropTypes.object,
    userId: React.PropTypes.string.isRequired,
    token: React.PropTypes.string,
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
      this.props.addAnswer({pollId: this.props.params.pollId, answer: this.state.newAnswer, token: this.props.token});
      this.close();
    } else {
      this.setState({warningMessage: 'Fill in the answer input to submit an answer'});
    }
  }

  render() {
    // parse this.props.activePoll.votes into data usable by d3 chart
    return (
      <div>
        <Header />
        <div className="container">
          <h1 className="poll_center">{this.props.activePoll.question}</h1>
          <p className="poll_center">By {this.props.activePoll.authorName}</p>
          {this.props.activePoll.hasVoted ?
            'Show D3 chart' :
            <AnswersDisplay answers={this.props.activePoll.answers} vote={this.handelVote} />
          }
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
          {!this.props.activePoll.hasVoted && this.props.token ?
            <Button bsStyle="warning" onClick={this.open}>Add answer</Button> :
            ''
          }
          {this.props.activePoll.authorId === this.props.userId ?
            <LinkContainer to="/myPolls">
              <Button bsStyle="danger" onClick={this.handelDelete}>Delete Poll</Button>
            </LinkContainer> :
            ''
          }
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Poll);
