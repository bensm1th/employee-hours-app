import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchEmployees } from '../actions/index';
import { Link } from 'react-router';
import TableHeader  from './table_header';
import TableRow from './table_row';
import { v4 } from 'node-uuid';

//put the cells as children of the TableRow, but I need a new cell
//cells start and end with <td>

const decideCellWidth = (header) => {
    switch(header) {
        case 'Currently Working':
            return 'one wide';
        case "Name":
            return 'six wide';
        case "Employee Number":
            return 'two wide';
        case 'Alerts':
            return 'seven wide';
        default:
            return '';
    }
}

const renderHeaders = (input) => {
    return input.map(header=> {
        const classType = decideCellWidth(header);
        return <TableHeader classType={classType} date={header} key={v4()} />
    });
}

class EmployeeIndex extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    componentWillMount() {
        this.props.fetchEmployees();
    }

    showEmployee(e, employee) {
        e.preventDefault();
        this.context.router.push('/employee/' + employee._id);
    }

    editEmployee(e, employee) {
        e.preventDefault();
        this.context.router.push(`/employee/${employee._id}/edit`);
    }

    renderEmployees() {
        return this.props.employees.map(employee => {
            const name = employee.firstName + " " + employee.lastName; 
            return (
                    <TableRow key={v4()}>
                        <td>{employee.currentlyWorking ? (<i className="green circle icon"></i>): (<i className="red circle thin icon"></i>)}</td>
                        <td>
                            <span id='employeeName'>{name}</span>
                            <Link to={`/employee/${employee._id}/edit`}>
                                <span id='employeeEdit' >
                                    <i className="edit icon"></i>
                                    Edit
                                </span>
                            </Link>
                            <Link to={`/employee/${employee._id}`}>
                            <span id='employeeInfo'>
                                <i className="info circle icon"></i>
                                More Info
                            </span>
                            </Link>
                        </td>
                        <td>{employee.employeeNumber}</td>
                        <td>random alert</td>
                    </TableRow>
                )
        });
    }

    render() {  
        const headers = ["Currently Working", "Name", "Employee Number", "Alerts"];
        const employeeData = this.props.employees.length ? this.renderEmployees() : <tr><td><div> employee name! </div></td></tr>;
        return (
            <div className="ui container">
                <div className='ui segment'>
                    <h1> CURRENT EMPLOYEES </h1>
                </div>
                <table className="ui celled table">
                    <thead>
                        <tr>
                            {renderHeaders(headers)}
                        </tr>
                    </thead>
                    <tbody>
                        {employeeData}
                    </tbody>
                </table>
                <Link to='/employee/new'>
                    <button className="ui green button">Add New</button>
                </Link>
                <Link to='/'>
                    <button className='ui orange button'>Back</button>
                </Link>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        employees: state.employees
    }
}

export default connect(mapStateToProps, { fetchEmployees })(EmployeeIndex);