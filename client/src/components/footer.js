import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <div id="footer" className="ui inverted vertical footer segment">
                <div className="ui center aligned container">
                    <div className="ui stackable inverted divided grid">
                        <div className="three wide column">
                        <h4 className="ui inverted header">By: Benjamin Smith</h4>
                        <div className="ui inverted link list">
                            <div className='item'>Email: whs.bsmith@gmail.com</div>
                            <a href="http://www.bensmith.tech" className="item">Portfolio</a>
                            <a href="https://github.com/bensm1th" className="item">Github</a>
                            <a href="https://www.linkedin.com/in/benjamin-smith-a8386a57?trk=hp-identity-name" className="item">LinkedIn</a>
                        </div>
                        </div>
                        <div className="three wide column">
                        <h4 className="ui inverted header">For: TLC Learning Center</h4>
                        <div className="ui inverted link list">
                            <a href="http://tlclearningcenter.org/" className="item">Main Website</a>
                        </div>
                        </div>
                        <div className="three wide column">
                        <h4 className="ui inverted header">Technologies Used</h4>
                        <div className="ui inverted link list">
                            <a href="https://facebook.github.io/react/" className="item">
                                <img id="logo" src="https://facebook.github.io/react/favicon.ico"/>
                                React.js
                            </a>
                            <a href='http://redux.js.org/' className='item'>
                                <img id="logo" src="http://redux.js.org/gitbook/images/favicon.ico"/>
                                Redux
                            </a>
                            <a href="https://nodejs.org/en/" className="item">
                                <img id="logo" src="https://nodejs.org/static/favicon.png"/>
                                Node.js
                            </a>
                            <a href="https://www.mongodb.com/" className="item">
                                <img id="logo" src="https://www.mongodb.com/assets/images/global/favicon.ico"/>
                                MongoDB
                            </a>
                            <a href="http://expressjs.com/" className="item">
                                <img id="logo" src="http://expressjs.com/images/favicon.png"/>
                                Express
                            </a>
                        </div>
                        </div>
                        <div className="seven wide column">
                        <h4 className="ui inverted header">TLC Info-Tracking</h4>
                        <p>The current version tracks employee information.  The next version will also track student information.</p>
                        </div>
                    </div>    
                </div>
            </div>
        )
    }
}

export default Footer;