import React, { Component } from 'react';
import Header from './header';

const App = ({children, location}) => {
    return (
      <div>
        <Header path={location}/>
        {children}
      </div>
    );
}

export default App;
