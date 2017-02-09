// npm packages
import React from 'react';

import Nav from '../components/Nav';

// style
require('./app.scss');


export default ({children}) => (
  <div className="container">
    <Nav />
    {children}
  </div>
);
