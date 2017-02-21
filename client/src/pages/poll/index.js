import React from 'react';
import {connect} from 'react-redux';

import {setActivePoll, getPoll, vote} from '../../store/actions';
import AnswersDisplay from '../../components/answersDisplay';

import './poll.scss';

const mapDispatchToProps = dispatch => ({
  setPoll: payload => dispatch(setActivePoll(payload)),
  getPoll: payload => dispatch(getPoll(payload)),
  vote: payload => dispatch(vote(payload)),
});

const mapStateToProps = state => ({
  polls: state.polls.polls,
  activePoll: state.polls.activePoll,
  answers: state.polls.activePoll.answers,
  userId: state.auth.user ? state.auth.user._id : '',
});

class Poll extends React.Component {
  static propTypes = {
    polls: React.PropTypes.array,
    activePoll: React.PropTypes.object,
    userId: React.PropTypes.string.isRequired,
    setPoll: React.PropTypes.func.isRequired,
    getPoll: React.PropTypes.func.isRequired,
    vote: React.PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.getPoll({pollId: this.props.params.pollId, userId: this.props.userId});
  }

  handelVote = (answer) => {
    this.props.vote({answer, pollId: this.props.params.pollId, userId: this.props.userId});
  }

  render() {
    // parse this.props.activePoll.votes into data usable by d3 chart
    return (
      <div>
        <h1 className="poll_center">{this.props.activePoll.question}</h1>
        <p className="poll_center">By {this.props.activePoll.author}</p>
        {this.props.activePoll.hasVoted ?
          'Show D3 chart' :
          <AnswersDisplay answers={this.props.activePoll.answers} vote={this.handelVote} />
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Poll);
