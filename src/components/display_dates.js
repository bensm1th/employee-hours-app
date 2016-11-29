import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { postHours } from '../actions';
import { Link } from 'react-router';

class DisplayDates extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    onFormSubmit(beginning, end) {
        this.props.postHours(beginning, end)
            .then(()=> {
                this.context.router.push('/hourstable/' + this.props.state.hours.data._id);
            });

    }     
    render() {
        let beginning;
        let end;
        const resStatus = this.props.state.hours.status === 200 ? true : false ;
    return (
        <div>
            <div>
                <div className="ui container">
                    <h1 id="periodHeader">Set Pay Period</h1>
                </div>
                
                <div className="ui container" id="formWrapper">
                    <form id="setPeriod" className="ui" onSubmit={e=> {
                        e.preventDefault();
                        this.onFormSubmit(beginning.value, end.value);
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
                                <input value="10/3/2016" type="text" ref={domNode => {
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
                                    <button className="ui green button">Submit</button>
                            </div>
                            <div className="four wide column">
                                <Link to='/hours/index'>
                                    <button className='ui blue button'>
                                        Back
                                    </button> 
                                </Link>
                            </div>
                            <div className="four wide column"></div>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        state: state
    }
}

export default connect(mapStateToProps, { postHours })(DisplayDates);