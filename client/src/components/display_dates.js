import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { postHours, setHoursValues, clearDates } from '../actions/index';
import { Link } from 'react-router';
import InputSelect from './table/table_input_select';

class DisplayDates extends Component {
    constructor(props) {
        super(props);
        this.setValues = this.setValues.bind(this);
    }
    static contextTypes = {
        router: PropTypes.object
    }

    componentDidMount() {
        this.props.clearDates();
    }

    onFormSubmit(dates) {
        const beginning = `${dates.beginning.months}/${dates.beginning.days}/${dates.beginning.years}`;
        const end = `${dates.end.months}/${dates.end.days}/${dates.end.years}`;
        this.props.postHours(beginning, end)
            .then(()=> {
                this.context.router.push('/hourstable/' + this.props.state.hours.data._id);
            });
    }     

    setValues(value, kind, type, unit) {
        this.props.setHoursValues({value, type, unit})
    }

    render() {
        const resStatus = this.props.state.hours.status === 200 ? true : false ;
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return (
        <div>
            <div className='ui container'>
                <div className='ui center aligned segment'>
                    <h1>SET PAY PERIOD</h1>
                </div>
                
                    <form id="setPeriod" className="ui" onSubmit={e=> {
                        e.preventDefault();
                        this.onFormSubmit(this.props.dates);
                    }}>
                    <div className="ui segments">
                    <div className='ui raised segments'>
                        <div className='ui center aligned segment'>
                            <h1>FROM</h1>
                            <label >Month</label>
                            <InputSelect
                                id='months' 
                                options={months}
                                logValue={this.setValues}
                                type={'beginning'}
                                unit={'months'}
                            />
                            <label>Day</label>
                            <InputSelect
                                id='days' 
                                choices={30}
                                start={1}
                                logValue={this.setValues}
                                unit={'days'}
                                type={'beginning'}
                            />
                            <label>Year</label>
                            <InputSelect
                                id='years'
                                choices={10}
                                start={2016}
                                logValue={this.setValues}
                                unit={'years'}
                                type={'beginning'}
                            />
                        </div>
                        <div className='ui center aligned segment'>
                            <h1>TO</h1>
                            <label>Month</label>
                            <InputSelect
                                id='months' 
                                options={months}
                                logValue={this.setValues}
                                unit={'months'}
                                type={'end'}
                            />
                            <label>Day</label>
                            <InputSelect
                                id='days' 
                                choices={30}
                                start={1}
                                logValue={this.setValues}
                                unit={'days'}
                                type={'end'}
                            />
                            <label>Year</label>
                            <InputSelect
                                id='years'
                                choices={10}
                                start={2016}
                                logValue={this.setValues}
                                unit={'years'}
                                type={'end'}
                            />
                        </div>
                        <div className='ui center aligned segment'>
                            <button className="ui green button">Submit</button>
                            <Link to='/hours/index'>
                                <button className='ui orange button'>
                                    Back
                                </button> 
                            </Link>
                        </div>
                    </div>
                    </div>
                    </form>
            </div>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        state: state,
        dates: state.dates
    }
}

export default connect(mapStateToProps, { postHours, setHoursValues, clearDates })(DisplayDates);