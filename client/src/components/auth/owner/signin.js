import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { signinOwner } from '../../../actions/index';
import AlertMessage from '../../alert_message';

class SigninOwner extends Component {

    constructor(props) {
        super(props);
        //this.handleMessageClose = this.handleMessageClose.bind(this);
    }

    /*
    componentWillMount() {
        this.props.clearAuthErrorMessage();
    }
    */
    
    handleFormSubmit({email, password }) {
        this.props.signinOwner( { email, password });
    }
    /*
    renderAlert() {
        if (this.props.errorMessage) {
            const noSuccess = false;
            return (
                <AlertMessage
                    success={noSuccess}
                    errorMessage={this.props.errorMessage}
                    handleMessageClose={this.handleMessageClose}
                    successMessage={''}
                />
            );
        }
    }
    */
    /*
    handleMessageClose(e, type) {
        this.props.clearAuthErrorMessage();
    }
    */
    render() {
        console.log('you hit the owner signin route')
        const { handleSubmit } = this.props;
        return (
            <div className="ui container">
                <div className='ui segment'>
                    <h1> OWNER SIGN-IN </h1>
                </div>
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className="ui form">
                    <Field name='email' type='text' component={renderField} label="Email"/>
                    <Field name='password' type='password' component={renderField} label="Password"/>
                    <button action='submit' className='ui green button'>Sign-in</button>
                </form>
            </div>
        )
    }
}

const form = reduxForm({
    form: 'owner_signin'
});

const renderField = field => (
    <div>
        <label>{field.label}</label>
        <input type={field.type} {...field.input}/>
        {field.touched && field.error && <div className="error">{field.error}</div>}
    </div>
);

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.error
    }
}

export default connect(mapStateToProps, { signinOwner })(form(SigninOwner));