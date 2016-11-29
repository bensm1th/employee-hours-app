import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { postEmployee } from '../actions/index';
import { Link } from 'react-router';

class EmployeeNew extends Component {

    handleFormSubmit(formProps) {
        this.props.postEmployee(formProps);
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <div className="ui container">
                <form className="ui form" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                    <Field name='firstName' type='text' component={renderField} label="First Name"/>
                    <Field name='lastName' type='text' component={renderField} label="Last Name"/>
                    <Field name="employeeNumber" component={renderField} label="Employee Number" type="text"/>
                    <Field name="address" component={renderField} label="Address" type="text"/>
                    <Field name="phone" component={renderField} label="Phone" type="text"/>
                    <Field name="DOB" component={renderField} label="Date of Birth" type="text"/>
                    <Field name="sickDaysLeft" component={renderField}  label="Sick Days Left" type="text"/>
                    <Field name="vacationDaysLeft" component={renderField}  label="Vacation Days Left" type="text"/>
                    <Field name="salary" component={renderField} label="Salary" type='text' />
                    <Field name="hourlyPay" component={renderField} label="Hourly Pay" type='text' />

                    <button action='submit' className='ui green button'>Add Employee</button>
                    <Link to='/employee'>
                        <button className='ui red button'>Cancel</button>
                    </Link>
                </form>
            </div>  
        )
    }
}

const form = reduxForm({
    form: 'employee_new'
});

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

export default connect(null, { postEmployee })(form(EmployeeNew));