import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postTimestamp, onIdChange, clearLogState } from '../actions/index';
import ClockMessage from './clock_message';

class TimestampNew extends Component {

    constructor(props) {
        super(props);
        this.handleMessageClose = this.handleMessageClose.bind(this);
    }

    componentWillMount() {
        localStorage.clear();
        this.props.clearLogState();
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
        const { handleSubmit } = this.props;
    
        return (
            <div className="ui container">
                <h1>Employees: Please clock in/out</h1>
                <form className="ui form" id="clock">
                    <div className="ui input">
                        <input value={this.props.IdInput} onChange={e=>this.handleInputChange(e)} type="text" name='employeeNumber' placeholder="ID#"/>
                    </div>
                    <button className="ui blue button" value="in" onClick={e=>this.handleClockSubmit(e, 'in')}>Clock-In</button>
                    <button className="ui green button" value="out" onClick={e=>this.handleClockSubmit(e, 'out')}>Clock-Out</button>
                </form>
                { this.props.timestamp.logState ? (
                    <ClockMessage
                        handleMessageClose={this.handleMessageClose}
                        error={this.props.timestamp.logState.error}
                        success={this.props.timestamp.logState.success}
                     />
                ): (
                    <div> Please log in/out </div>
                )}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        IdInput: state.IdInput,
        timestamp: state.timestamp
    }
}

export default connect(mapStateToProps, { postTimestamp, onIdChange, clearLogState })(TimestampNew);