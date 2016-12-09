import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signoutUser } from  '../../../actions/index';

class Signout extends Component {

    componentWillMount() {
        this.props.signoutUser();
    }

    render() {
        return (
            <div className='ui container'>
                <div className='ui segment'>
                    <h3> You have been signed out. </h3>
                </div>
            </div>
        )
    }
}

export default connect(null, { signoutUser })(Signout);
