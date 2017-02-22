import React from 'react';
import {connect} from 'react-redux';

import Header from '../../components/header';

import './newPoll.scss';

const NewPoll = () => (
  <div>
    <Header />
    <div className="container text-center">
      <h1>New Poll!</h1>
    </div>
  </div>
);

export default NewPoll;
