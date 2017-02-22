import React from 'react';
import {connect} from 'react-redux';

import Header from '../../components/header';

import './myPolls.scss';

const MyPolls = () => (
  <div>
    <Header />
    <div className="container text-center">
      <h1>My Polls!</h1>
    </div>
  </div>
);

export default MyPolls;
