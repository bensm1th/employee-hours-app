import React from 'react';
import Header from './header';
import Footer from './footer';

const App = ({children, location}) => {
    return (
      <div>
          <div className="main">
            <Header path={location}/>
            {children}
          </div>
          <Footer />
      </div>
    );
}

export default App;
