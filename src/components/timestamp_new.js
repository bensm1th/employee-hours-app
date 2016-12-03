import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postTimestamp, onIdChange, clearLogState } from '../actions/index';
import AlertMessage from './alert_message';
import { Link } from 'react-router';


class TimestampNew extends Component {

    constructor(props) {
        super(props);
        this.handleMessageClose = this.handleMessageClose.bind(this);
    }

    componentWillMount() {
        localStorage.clear();
    }

    handleClockSubmit(e, type) {
        e.preventDefault();
        const formProps = {
            employeeNumber: this.props.IdInput[0],
            time: Date.now(),
            clock: type
        }
        this.props.postTimestamp(formProps). 
            then(setTimeout(()=> this.props.clearLogState(), 2000)). 
                then(this.props.onIdChange(""));
    }

    handleInputChange(e) {
        this.props.onIdChange(e.target.value)
    }

    handleMessageClose() {
        this.props.clearLogState();
    }

    render() {
        const { handleSubmit, errorMessage, successMessage, success, show } = this.props;

        return (
            <div className="ui container">
                <div className='ui center aligned segment'>
                <h1>EMPLOYEE CLOCK-IN/OUT</h1>
                </div>
                <div className='ui center aligned segment'>
                    <form className="ui form" id="clock">
                        <div className="ui input">
                            <input value={this.props.IdInput} onChange={e=>this.handleInputChange(e)} type="text" name='employeeNumber' placeholder="ID#"/>
                        </div>
                        <button className="ui blue button" value="in" onClick={e=>this.handleClockSubmit(e, 'in')}>Clock-In</button>
                        <button className="ui green button" value="out" onClick={e=>this.handleClockSubmit(e, 'out')}>Clock-Out</button>
                    </form>
                    { show ? (
                        <AlertMessage
                            handleMessageClose={this.handleMessageClose}
                            errorMessage={errorMessage}
                            successMessage={successMessage}
                            success={success}
                        />
                    ): (
                        <div> Please clock in/out </div>
                    )}
                    <Link to='/'>
                        <button className='ui orange button'>Back</button>
                    </Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        IdInput: state.IdInput,
        timestamp: state.timestamp,
        errorMessage: state.timestamp.logState.error.message,
        success: state.timestamp.logState.success.state,
        successMessage: state.timestamp.logState.success.message, 
        show: state.timestamp.logState.show
        
    }
}

export default connect(mapStateToProps, { postTimestamp, onIdChange, clearLogState })(TimestampNew);