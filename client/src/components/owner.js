import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { fetchOwnerMessage } from '../actions/index';
import { Link } from 'react-router';

class Owner extends Component {
    componentWillMount() {
        this.props.fetchOwnerMessage();
    }
    render() {
        return (
            <div className='ui container'>
                <div className='ui center aligned segment'> <h1> {this.props.message} </h1> </div>
                <div className='ui segment'>
                    <h3><Link to='/signup'>Create Manager Account</Link></h3>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {message: state.owner.message}
}

export default connect(mapStateToProps, { fetchOwnerMessage })(Owner);