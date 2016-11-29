import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchEmployee } from '../actions/index';
import { Link } from 'react-router';

class EmployeeShow extends Component {

    constructor(props) {
        super(props);
    }

    static contextTypes = {
        router: PropTypes.object
    }

    componentWillMount() {
        this.props.fetchEmployee(this.props.params.employee_id);
    }


    showEdit() {
        this.context.router.push('/employee/' + this.props.employee._id + '/edit' );
    }

    render() {
        const currentlyWorking = this.props.employee.currentlyWorking ? "yes" : "no";
        return (
            <div className='ui container'>
                <h1> Employee Data: {this.props.employee.firstName + " " + this.props.employee.lastName} </h1>
                <ul className='ui list'>
                    <li className='item'> First name: {this.props.employee.firstName}</li>
                    <li className='item'> Last name: {this.props.employee.lastName} </li>
                    <li className='item'> Employee number: {this.props.employee.employeeNumber}</li>
                    <li className='item'> Address: {this.props.employee.address}</li>
                    <li className='item'> Phone: {this.props.employee.phone}</li>
                    <li className='item'> DOB: {this.props.employee.DOB}</li>
                    <li className='item'> Sick Days Left: {this.props.employee.sickDaysLeft}</li>
                    <li className='item'> Vacaction Days Left: {this.props.employee.vacationDaysLeft}</li>
                    <li className='item'> Hourly Pay: {this.props.employee.hourlyPay.rate}</li>
                    <li className='item'> Salary: {this.props.employee.salary.rate}</li>
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
        )
    }
}

const mapStateToProps = (state) => {
    return {
        employee: state.employee
    }
}

export default connect(mapStateToProps, { fetchEmployee })(EmployeeShow);


