import React, { Component } from 'react';
import { Link } from 'react-router';
import { v4 } from 'node-uuid';
import { connect } from 'react-redux';

class IndexView extends Component {

    renderOwnerWelcome() {
        if (this.props.owner.authenticated) {
            return <div><h3>Access Special <Link to='/owner'>Owner</Link> Page</h3></div>
        }
    }

    renderWelcome() {
        if (this.props.auth) {
            return (
            <div>
                <h3>You are signed-in and have access to the following information management tools:</h3>
                <ul className='ui list'>
                    <li key={v4()} className='item'> Create and view table to track <Link to='/hours/index'>employee hours</Link>.</li>
                    <li key={v4()} className='item'> View, add, and update <Link to='/employee'>employee information</Link></li>
                </ul>
            </div>
            )
            
        }
        return <h3>Please <Link to='/signin'>sign-in</Link> to access information management tools.</h3>
    }
    render() {
        console.log('this.props')
        console.log(this.props);
        return (
            <div className="ui container">
                <div className='ui center aligned segment'>
                    <h1> Welcome to TLC Info-Tracking Demo!</h1>
                </div>
                <div className='ui segment'>
                    {this.renderWelcome()}
                    <h3>Employees can clock-in/out <Link to='/timestamp'> here</Link>.</h3>
                    {this.renderOwnerWelcome()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => (
    {
        auth: state.auth.authenticated,
        owner: state.owner
    }
)

export default connect(mapStateToProps)(IndexView);