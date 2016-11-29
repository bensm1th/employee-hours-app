import React, { Component } from 'react';
import { Link } from 'react-router';

class IndexView extends Component {

    render() {
        return (
            <div className="ui container">
                this is the mother of all routes!!!!!!
                <ul>
                    <li> <Link to='/employee' >employees</Link> </li>
                    <li> <Link to='/hours/index'> tables </Link> </li>
                    <li> <Link to='/timestamp'> sign-in </Link> </li>
                </ul>
            </div>
        )
    }
}

export default IndexView;