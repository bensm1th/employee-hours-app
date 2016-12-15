import React, {Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchManager, updateManager, destroyManager, clearManager } from '../../../actions/index';
import AlertMessage from '../../alert_message';
import { Link } from 'react-router';
import filter_types from '../filter_types';
const moment = require('moment-timezone');

class ManagerEdit extends Component {
    
    constructor(props) {
         super(props);
     }

     componentWillMount() {
         this.handleInitialize();
     }

    handleInitialize() {
        const payAmount = this.props.active_manager.hourlyPay.applies ? this.props.active_manager.hourlyPay.rate : this.props.active_manager.salary.monthlyRate;
        const payType = this.props.active_manager.hourlyPay.applies ? 'hourly' : 'salary';
        const DOB = moment(this.props.active_manager.DOB).format('LL');

        const initData = {
            'firstName': this.props.active_manager.firstName,
            'lastName': this.props.active_manager.lastName,
            'employeeNumber': this.props.active_manager.employeeNumber,
            'address': this.props.active_manager.address,
            'phone': this.props.active_manager.phone,
            'DOB': DOB,
            'sickDaysLeft': this.props.active_manager.sickDaysLeft,
            'vacationDaysLeft': this.props.active_manager.vacationDaysLeft,
            [payType]: payAmount,
            'currentlyWorking': this.props.active_manager.currentlyWorking,
        }
        this.props.initialize(initData);
    }

    handleFormSubmit(formProps) {
        console.log('submitted');
        const id = this.props.active_manager._id;
        this.props.updateManager(formProps, id);
    }

    render() {
        const { handleSubmit } = this.props;
        const payAmount = this.props.active_manager.hourlyPay.applies ? this.props.active_manager.hourlyPay.rate : this.props.active_manager.salary.monthlyRate;
        const DOB = moment(this.props.active_manager.DOB).format('LL');
        const payType = this.props.active_manager.hourlyPay.applies ? 'hourly' : 'salary';
        const payLabel = this.props.active_manager.hourlyPay.applies ? 'Hourly' : 'Salary';
        return (
            <div className='ui segments'>
                <div className='ui center aligned green inverted segment'>
                    <h1> EDIT MANAGER:  {`${this.props.active_manager.firstName} ${this.props.active_manager.lastName}`} </h1>
                </div>
                <div className='ui segment'>
                    <form className="ui form" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                        <Field name='firstName' type='text' component={renderField} label="First Name"/>
                        <Field name='lastName' type='text' component={renderField} label="Last Name"/>
                        <Field name="employeeNumber" component={renderField} label="Employee Number" type="text"/>
                        <Field name="address" component={renderField} label="Address" type="text"/>
                        <Field name="phone" component={renderField} label="Phone" type="text"/>
                        <Field name="DOB" component={renderField} label="Date of Birth" type="text"/>
                        <Field name="sickDaysLeft" component={renderField}  label="Sick Days Left" type="text"/>
                        <Field name="vacationDaysLeft" component={renderField}  label="Vacation Days Left" type="text"/>
                        <Field name={payType} component={renderField} label={payLabel} />
                        <button action='submit' className='ui green button'>Save Changes</button>
                        <button 
                            className='ui orange button'
                            onClick={()=>this.props.changeManagerFilter(filter_types.show)}
                            type='button'
                        >Cancel</button>
                        <button 
                            onClick={()=>this.props.deleteManager(this.props.active_manager._id)} 
                            className="ui red button"
                            type='button'
                        >Delete Employee</button>
                    </form>
                </div>
            </div>
        )
    }
}

const renderField = field => (
    <div>
        <label>{field.label}</label>
        <input {...field.input}/>
        {field.touched && field.error && <div className="error">{field.error}</div>}
    </div>
);

const validate = (formProps) => {
    const errors = {};

    if (!formProps.firstName) {
        errors.firstName = 'Please enter a first name';
    }
    if (!formProps.lastName) {
        errors.lastName = 'Please enter a last name';
    }
    if (!formProps.employeeNumber) {
        errors.employeeNumber = 'Please enter an employee number';
    }
    if (!formProps.address) {
        errors.address = 'Please enter an address';
    }
    if (!formProps.phone) {
        errors.phone = 'Please enter a phone number';
    }
    if (!formProps.DOB) {
        errors.DOB = 'Please enter a date of birth';
    }
    if (!formProps.sickDaysLeft) {
        errors.sickDaysLeft = 'Please enter the number of sick days left';
    }
    if (!formProps.vacationDaysLeft) {
        errors.vacationDaysLeft = 'Please enter the number of vacation days left';
    }
    return errors;
}

const form = reduxForm({
    form: 'manager_edit'
}, validate);

export default form(ManagerEdit);
