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
                            <a href="https://facebook.github.io/react/" className="item">React.js</a>
                            <a href="https://nodejs.org/en/" className="item">Node.js</a>
                            <a href="https://www.mongodb.com/" className="item">MongoDB</a>
                            <a href="http://expressjs.com/" className="item">Express</a>
                        </div>
                        </div>
                        <div className="seven wide column">
                        <h4 className="ui inverted header">TLC Info-Tracking</h4>
                        <p>The current version track employee information.  The next version will also track student information.</p>
                        </div>
                    </div>    
                </div>
            </div>
        )
    }
}

export default Footer;