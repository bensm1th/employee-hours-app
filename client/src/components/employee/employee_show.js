import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchEmployee, clearEmployee } from '../../actions/index';
import { Link } from 'react-router';
const moment = require('moment-timezone');


class EmployeeShow extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    componentWillMount() {
        this.props.fetchEmployee(this.props.params.employee_id);
    }

    componentWillUnmount() {
        this.props.clearEmployee();
    }


    showEdit() {
        this.context.router.push('/employee/' + this.props.employee._id + '/edit' );
    }

    render() {
        if (!this.props.employee) {
            return (<div>...loading</div>)
        }
        const currentlyWorking = this.props.employee.currentlyWorking ? "yes" : "no";
        const payType = this.props.employee.hourlyPay.applies ? 'Hourly Pay' : 'Salary';
        const pay = this.props.employee.hourlyPay.applies ? this.props.employee.hourlyPay.rate : this.props.employee.salary.monthlyRate;
        const DOB = moment(this.props.employee.DOB).format('LL');
        return (
            <div className='ui container'>
                <div className='ui segment'>
                    <h1> Employee Data: {this.props.employee.firstName + " " + this.props.employee.lastName} </h1>
                </div>
                <div className='ui segment'>
                    <ul className='ui list'>
                        <li className='item'> First name: {this.props.employee.firstName}</li>
                        <li className='item'> Last name: {this.props.employee.lastName} </li>
                        <li className='item'> Employee number: {this.props.employee.employeeNumber}</li>
                        <li className='item'> Address: {this.props.employee.address}</li>
                        <li className='item'> Phone: {this.props.employee.phone}</li>
                        <li className='item'> DOB: {DOB}</li>
                        <li className='item'> Sick Days Left: {this.props.employee.sickDaysLeft}</li>
                        <li className='item'> Vacaction Days Left: {this.props.employee.vacationDaysLeft}</li>
                        <li className='item'> {payType}: {pay}</li>
                        <li className='item'> Currently Working: {currentlyWorking}</li>
                    </ul>
                    <button 
                        className='ui orange button'
                        onClick={()=>this.showEdit()}
                    >Edit</button>
                    <Link to='/employee'>
                        <button className='ui blue button'>Back</button>
                    </Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    if (!state.employee.firstName) {
        return {}
    }
    return {
        employee: state.employee
    }
}

export default connect(mapStateToProps, { fetchEmployee, clearEmployee })(EmployeeShow);


