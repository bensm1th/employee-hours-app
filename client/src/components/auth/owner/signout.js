import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signoutOwner } from  '../../../actions/index';

class Signout extends Component {

    componentWillMount() {
        this.props.signoutOwner();
    }

    render() {
        return (
            <div className='ui container'>
                <div className='ui segment'>
                    <div> Do you want to completely signout? </div>
                </div>
            </div>
        )
    }
}

export default connect(null, { signoutOwner })(Signout);