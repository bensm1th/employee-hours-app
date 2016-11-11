import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getHours } from '../actions';
import HoursTable from './table';

class DisplayDates extends Component {
    render() {
        let beginning;
        let end;
        const receivedTableData = this.props.state.hours.status === 200;
        const hours = receivedTableData ? this.props.state.hours : null;
    return (
        <div>
            <div>
                <div className="ui container">
                    <h1 id="periodHeader">Set Pay Period</h1>
                </div>
                
                <div className="ui container" id="formWrapper">
                    <form id="setPeriod" className="ui" onSubmit={e=> {
                        e.preventDefault();
                        this.props.getHoursData(beginning.value, end.value);
                    }}>
                        <div className="ui grid">
                            <div className="four wide column"></div>
                            <div className="four wide column">
                                <h1>FROM</h1>
                            </div>
                            <div className="four wide column">
                                <h1>TO</h1>
                            </div>
                            <div className="four wide column"></div>
                        </div>
                        <div className="ui grid">
                            <div className="four wide column"></div>
                            <div className="four wide column">
                                <input type="text" ref={domNode => {
                                    beginning = domNode;
                                }}/>
                            </div>
                            <div className="four wide column">
                                <input type="text" ref={domNode => {
                                    end = domNode;
                                }}  />
                            </div>
                            <div className="four wide column"></div>
                        </div>
                        <div className="ui grid">
                            <div className="four wide column"></div>
                            <div className="four wide column">
                                <button>Submit</button>
                            </div>
                            <div className="four wide column"></div>
                            <div className="four wide column"></div>
                        </div>
                    </form>
                </div>
            </div>
        <HoursTable hours={hours} status={receivedTableData}/>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        state: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getHoursData: (date1, date2) => {
            dispatch(getHours(date1, date2))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayDates);