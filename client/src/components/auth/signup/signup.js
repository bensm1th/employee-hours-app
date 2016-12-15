import React, {Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { signupUser, clearAuthErrorMessage } from '../../../actions/index';
import AlertMessage from '../../alert_message';
import filter_types from '../../owner/filter_types';


class Signup extends Component {

    constructor(props) {
        super(props);
        this.handleMessageClose = this.handleMessageClose.bind(this);
    }

    handleFormSubmit(formProps) {
        this.props.signupUser(formProps);
    }

    handleMessageClose(e, type) {
        this.props.clearAuthErrorMessage();
    }
    
    renderAlert() {
        if (this.props.errorMessage) {
            const status = false;
            return (
                <AlertMessage
                    success={status}
                    errorMessage={this.props.errorMessage}
                    handleMessageClose={this.handleMessageClose}
                    successMessage={''}
                />
            );
        }
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="ui container">
                <div className='ui center aligned green inverted segment'>
                    <h1> ADD MANAGER ACCOUNT </h1>
                </div>
                    <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className="ui form">
                        <div className='ui segment'>
                            <div className='ui secondary segment'>
                                <h3> PERSONAL INFO</h3>
                            </div>
                            <Field name='firstName' type='text' component={renderField} label="First Name"/>
                            <Field name='lastName' type='text' component={renderField} label="Last Name"/>
                            <Field name="employeeNumber" component={renderField} label="Employee Number" type="text"/>
                            <Field name="address" component={renderField} label="Address" type="text"/>
                            <Field name="phone" component={renderField} label="Phone" type="text"/>
                            <Field name="DOB" component={renderField} label="Date of Birth" type="text"/>
                            <Field name="sickDaysLeft" component={renderField}  label="Sick Days Left" type="text"/>
                            <Field name="vacationDaysLeft" component={renderField}  label="Vacation Days Left" type="text"/>
                            <Field name="pay" component={renderField} label="Pay" type='text' />
                            <Field name='payType' component={renderRadio} label='Hourly' type='radio' value='hourlyPay'/>
                            <Field name='payType' component={renderRadio} label='Salary' type='radio' value='salary'/>
                        </div>
                        <div className='ui segment'>
                            <div className='ui secondary segment'>
                                <h3> ACCOUNT INFO</h3>
                            </div>
                            <Field name='email' type='text' component={renderField} label="Email"/>
                            <Field name='password' type='password' component={renderField} label="Password"/>
                            <Field name='passwordConfirm' type='password' component={renderField} label="Confirm Password" />
                            <Field name='secret' type='password' component={renderField} label="Enter Secret" />
                            {this.renderAlert()}
                        </div>
                        <button action='submit' className='ui green button'>Create Manager Account</button>
                        <button 
                            type='button' 
                            className='ui blue button'
                            onClick={()=>this.props.changeManagerFilter(filter_types.table)}
                        >Back</button>
                    </form>
            </div>
        )
    }
}


const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
        <label>{label}</label>
        <input type={type} {...input}/>
        {touched && error && <div className="error">{error}</div>}
    </div>
);

const renderRadio = ({ input, label, type, meta: { touched, error, warning } }) => {
    return (
    <div>
        <label><input {...input} type={type} />{label}</label>
        {touched && error && <div className="error">{error}</div>}
    </div>)
}

const validate = (values) => {
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    const errors = {};
    if (!values.email) {
        errors.email = 'Please enter an email';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    if (!values.password) {
        errors.password = 'Please enter a password';
    }
    if (!strongRegex.test(values.password)) {
        errors.password = 'Password must be eight characters or longer and contain at least one of each of the following: lowercase letter, uppercase letter, number, special character';
    }

    if (!values.passwordConfirm) {
        errors.passwordConfirm = 'Please enter a confirmation password';
    }
    if (values.password !== values.passwordConfirm) {
        errors.passwordConfirm = "Passwords don't match";
    }
    if (!values.secret) {
        errors.secret = 'Please enter the secret';
    }
    return errors;
}

const form = reduxForm({
    form: 'user_new', 
    validate
});



export default form(Signup);