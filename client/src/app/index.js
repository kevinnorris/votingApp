// npm packages
import React from 'react';

// style
require('./app.scss');

export default ({children}) => (
  <div className="container">
    {children}
  </div>
);
