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
                <div className='ui segment'>
                    <h1>ADD A NEW EMPLOYEE</h1>
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
                        <Field name="salary" component={renderField} label="Salary" type='text' />
                        <Field name="hourlyPay" component={renderField} label="Hourly Pay" type='text' />

                        <button action='submit' className='ui green button'>Add Employee</button>
                        <Link to='/employee'>
                            <button className='ui red button'>Cancel</button>
                        </Link>
                    </form>
                </div>
            </div>  
        )
    }
}



const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
        <label>{label}</label>
        <input {...input} type={type}/>
        {touched && error && <div className="error">{error}</div>}
    </div>
);


const validate = (values) => {
    const errors = {};
    if (!values.firstName) {
        errors.firstName = 'Please enter a first name';
    }
    if (!values.lastName) {
        errors.lastName = 'Please enter a last name';
    }
    if (!values.employeeNumber) {
        errors.employeeNumber = 'Please enter an employee number';
    }
    if (!values.address) {
        errors.address = 'Please enter an address';
    }
    if (!values.phone) {
        errors.phone = 'Please enter a phone number';
    }
    if (!values.DOB) {
        errors.DOB = 'Please enter a date of birth';
    }
    if (!values.sickDaysLeft) {
        errors.sickDaysLeft = 'Please enter the number of sick days left';
    }
    if (!values.vacationDaysLeft) {
        errors.vacationDaysLeft = 'Please enter the number of vacation days left';
    }
    return errors;
}

EmployeeNew = reduxForm({
    form: 'employee_new',
    validate
})(EmployeeNew);

const mapStateToProps = (state) => (
    {
        state
    }
)

export default connect(mapStateToProps, { postEmployee })(EmployeeNew);