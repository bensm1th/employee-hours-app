import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchEmployees } from '../actions/index';
import { Link } from 'react-router';
import TableHeader  from './table_header';
import TableRow from './table_row';
import { v4 } from 'node-uuid';

//put the cells as children of the TableRow, but I need a new cell
//cells start and end with <td>

const renderHeaders = (input) => {
    return input.map(header=> {
        return <TableHeader date={header} key={v4()} />
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

    renderEmployees() {
        return this.props.employees.map(employee => {
            const name = employee.firstName + " " + employee.lastName;
            const currentlyWorking = employee.currentlyWorking ? "yes" : "no";
            return (
                    <TableRow key={v4()}>
                        <td>{currentlyWorking}</td>
                        <td>{name}</td>
                        <td onClick={(e)=> this.showEmployee(e, employee)}>more info</td>
                        <td>edit</td>   
                    </TableRow>
                )
        });
    }

    render() {  
        const headers = ["Working", "Name", "Info", "Edit"];
        const employeeData = this.props.employees.length ? this.renderEmployees() : <tr><td><div> employee name! </div></td></tr>;
        return (
            <div className="ui container">
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
                <Link to='/'>
                    <button className='ui blue button'>Back</button>
                </Link>
                <Link to='/employee/new'>
                    <button className="ui green button">Add New</button>
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