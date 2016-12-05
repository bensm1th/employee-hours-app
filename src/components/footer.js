import React, { Component } from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

class Footer extends Component {
    render() {
        return (
            <div id="footer" className="ui inverted vertical footer segment">
                <div className="ui center aligned container">
                <div className="ui stackable inverted divided grid">
                    <div className="three wide column">
                    <h4 className="ui inverted header">Group 1</h4>
                    <div className="ui inverted link list">
                        <a href="#" className="item">Link One</a>
                        <a href="#" className="item">Link Two</a>
                        <a href="#" className="item">Link Three</a>
                        <a href="#" className="item">Link Four</a>
                    </div>
                    </div>
                    <div className="three wide column">
                    <h4 className="ui inverted header">Group 2</h4>
                    <div className="ui inverted link list">
                        <a href="#" className="item">Link One</a>
                        <a href="#" className="item">Link Two</a>
                        <a href="#" className="item">Link Three</a>
                        <a href="#" className="item">Link Four</a>
                    </div>
                    </div>
                    <div className="three wide column">
                    <h4 className="ui inverted header">Group 3</h4>
                    <div className="ui inverted link list">
                        <a href="#" className="item">Link One</a>
                        <a href="#" className="item">Link Two</a>
                        <a href="#" className="item">Link Three</a>
                        <a href="#" className="item">Link Four</a>
                    </div>
                    </div>
                    <div className="seven wide column">
                    <h4 className="ui inverted header">Footer Header</h4>
                    <p>Extra space for a call to action inside the footer that could help re-engage users.</p>
                    </div>
                </div>
                <div className="ui inverted section divider"></div>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMZKsbpyve4NHcHgZPcPbTWlWA9-VNkmPm18G8crsQkwjVevfhyw" className="ui centered mini image"/>
                <div className="ui horizontal inverted small divided link list">
                    <a className="item" href="#">Site Map</a>
                    <a className="item" href="#">Contact Us</a>
                    <a className="item" href="#">Terms and Conditions</a>
                    <a className="item" href="#">Privacy Policy</a>
                </div>
                </div>
            </div>
        )
    }
}

export default Footer;