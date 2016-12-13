import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchEmployee, updateEmployee, deleteEmployee, clearEmployee } from '../actions/index';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
const moment = require('moment-timezone');

class EmployeeEdit extends Component {
    constructor(props) {
        super(props);
    }

    static contextTypes = {
        router: PropTypes.object
    }
    
    componentWillMount() {
        this.props.fetchEmployee(this.props.params.employee_id) 
            .then(result=>this.handleInitialize());
    }
    
    handleInitialize() {
        const payAmount = this.props.employee.hourlyPay.applies ? this.props.employee.hourlyPay.rate : this.props.employee.salary.monthlyRate;
        const payType = this.props.employee.hourlyPay.applies ? 'hourly' : 'salary';
        const DOB = moment(this.props.employee.DOB).format('LL');

        const initData = {
            'firstName': this.props.employee.firstName,
            'lastName': this.props.employee.lastName,
            'employeeNumber': this.props.employee.employeeNumber,
            'address': this.props.employee.address,
            'phone': this.props.employee.phone,
            'DOB': DOB,
            'sickDaysLeft': this.props.employee.sickDaysLeft,
            'vacationDaysLeft': this.props.employee.vacationDaysLeft,
            [payType]: payAmount,
            'currentlyWorking': this.props.employee.currentlyWorking,
        }
        this.props.initialize(initData);
    }

    componentWillUnmount() {
        this.props.clearEmployee();
    }

    handleFormSubmit(formProps) {
        this.props.updateEmployee(this.props.employee._id, formProps). 
            then(this.context.router.push('/employee/' + this.props.employee._id));
    }

    handleDelete() {
        this.props.deleteEmployee(this.props.employee._id).
            then(this.context.router.push('/employee'));
    }

    render() {
        const { handleSubmit } = this.props;
        const payType = this.props.employee.hourlyPay.applies ? 'hourly' : 'salary';
        const payLabel = this.props.employee.hourlyPay.applies ? 'Hourly' : 'Salary';
        if (!this.props.employee) {
            return (<div>...loading</div>)
        }
        return (
            <div className="ui container">
                <div className='ui segment'>
                    <h1>EDIT EMPLOYEE INFO </h1>
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
                        <Link to={`/employee/${this.props.employee._id}` }>
                            <button className='ui orange button'>Cancel</button>
                        </Link>
                        <Link to={`/employee`}>
                            <button onClick={()=>this.handleDelete()} className="ui red button">Delete Employee</button>
                        </Link>
                    </form>
                </div>
            </div>  
        )
    }

}

const mapStateToProps = (state) => {
    if (!state.employee) {
        return {}
    }
    return {
        employee: state.employee
    }
}

const form = reduxForm({
    form: 'employee_edit'
}, validate);

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

//EmployeeEdit = reduxForm({form: 'employee_edit'}, validate)(EmployeeEdit);

export default connect(mapStateToProps, { fetchEmployee, updateEmployee, deleteEmployee, clearEmployee })(form(EmployeeEdit));


