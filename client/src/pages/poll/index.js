import React from 'react';

import './poll.scss';

export default class poll extends React.Component {
  render() {
    return (
      <div>
        <h1>Poll Page!</h1>
        <h3>Page Id: {this.props.params.pollId}</h3>
      </div>
    );
  }
}
