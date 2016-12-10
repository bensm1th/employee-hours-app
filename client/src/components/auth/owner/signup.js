import React, {Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { signupOwner } from '../../../actions/index';
import AlertMessage from '../../alert_message';


class SignupOwner extends Component {

    constructor(props) {
        super(props);
        //this.handleMessageClose = this.handleMessageClose.bind(this);
    }

    handleFormSubmit(formProps) {
        this.props.signupOwner(formProps);
    }

    /*
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
    */
    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="ui container">
                <div className='ui segment'>
                    <h1> OWNER SIGNUP </h1>
                </div>
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className="ui form">
                    <Field name='email' type='text' component={renderField} label="Email"/>
                    <Field name='password' type='password' component={renderField} label="Password"/>
                    <Field name='passwordConfirm' type='password' component={renderField} label="Confirm Password" />
                    <Field name='secret' type='password' component={renderField} label="Enter Secret" />
                    <button action='submit' className='ui green button'>Sign up!</button>
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
    if (!values.passwordConfirm) {
        errors.passwordConfirm = 'Please enter a confirmation password';
    }
    if (!strongRegex.test(values.password)) {
        errors.password = 'Password must be eight characters or longer and contain at least one of each of the following: lowercase letter, uppercase letter, number, special character';
    }
    if (values.password !== values.passwordConfirm) {
        errors.passwordConfirm = "Passwords don't match";
    }
    if (!values.secret) {
        errors.secret = 'Please enter the secret';
    }
    return errors;
}

SignupOwner = reduxForm({
    form: 'owner_new', 
    validate
})(SignupOwner);

const mapStateToProps = (state) => (
    {errorMessage: state.auth.error}
)

export default connect(mapStateToProps, { signupOwner })(SignupOwner);