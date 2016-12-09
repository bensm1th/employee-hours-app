import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class OwnerIndex extends Component {

    renderOwnerOptions() {
        if (this.props.authenticated) {
            return (
                <div>
                    <h3>Sign-out <Link to='/singout/owner'> here</Link>.</h3>
                    <h3> Access owner <Link to='/owner'> management tools </Link> </h3>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="ui container">
                <div className='ui center aligned segment'>
                    <h1> ADMIN OPTIONS </h1>
                </div>
                <div className='ui segment'>
                    <h3>Sign-up <Link to='/signup/owner'> here</Link>.</h3>
                    <h3>Sign-in <Link to='/signin/owner'> here</Link>.</h3>
                    {this.renderOwnerOptions()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => (
    {
        authenticated: state.owner.authenticated
    }
)

export default connect(mapStateToProps)(OwnerIndex);