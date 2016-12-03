import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signoutUser } from  '../../../actions/index';

class Signout extends Component {

    componentWillMount() {
        this.props.signoutUser();
    }

    render() {
        return (
            <div> so sorry to see you go </div>
        )
    }
}

export default connect(null, { signoutUser })(Signout);
