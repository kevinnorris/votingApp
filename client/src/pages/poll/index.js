import React from 'react';
import {connect} from 'react-redux';

import {setActivePoll, getPoll} from '../../store/actions';

import './poll.scss';

const mapDispatchToProps = dispatch => ({
  setPoll: payload => dispatch(setActivePoll(payload)),
  getPoll: payload => dispatch(getPoll(payload)),
});

const mapStateToProps = state => ({
  polls: state.polls.polls,
  activePoll: state.ui.activePoll,
  userId: state.auth.user ? state.auth.user._id : '',
});

class Poll extends React.Component {
  static propTypes = {
    polls: React.PropTypes.array,
    activePoll: React.PropTypes.object,
    userId: React.PropTypes.string,
    setPoll: React.PropTypes.func.isRequired,
    getPoll: React.PropTypes.func.isRequired,
  }

  componentWillMount() {
    // Load the given poll as the active poll
    console.log('polls: ', this.props.polls);
    if (this.props.polls.length > 0) {
      console.log('poll exists');
      const poll = this.props.polls.find(p => p._id === this.props.params.pollId);
      this.props.setPoll({userId: this.props.userId, poll});
    } else {
      console.log('poll does not exist');
      this.props.getPoll({pollId: this.props.params.pollId, userId: this.props.userId});
    }
  }

  render() {
    return (
      <div>
        <h1>Poll Page!</h1>
        <h3>Page Id: {this.props.params.pollId}</h3>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Poll);
