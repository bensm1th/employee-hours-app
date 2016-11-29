import React, { Component, PropTypes } from 'react';
import  TableHeader  from './table_header';
import { connect } from 'react-redux';
import TableRow from './table_row';
import TableCell from './table_cell';
import { bindActionCreators } from 'redux';
import { fetchTableData, cellClick, cellBlur, saveTable } from '../actions/index';
import { v4 } from 'node-uuid';
import { Link } from 'react-router';


const renderHeaders = (datesArr) => {
    return datesArr.map(day=> {
        return <TableHeader date={day} key={v4()} />
    })
}

class HoursTable extends Component {

    constructor(props) {
        super(props);
        this.renderEmployees = this.renderEmployees.bind(this);
    }

    static contextTypes = {
        router: PropTypes.object
    }

    componentWillMount() {
        this.props.fetchTableData(this.props.params.id);
    }


    renderEmployees(data) {
        return data.map(employee=> {
            const cells = employee.hours.tableArr.map((cell, index) => {
                //sickTime, vacationTime, absentTime, holiday
                const key = v4();
                let display;
                if (index === 0) {
                    display = cell.name;
                }
                if (index !== 0 && index !== employee.hours.tableArr.length -1) {
                    display = cell.workedTime;
                }         
                if (index === employee.hours.tableArr.length -1) {
                    display = cell.totalHours;
                } 
                return  <TableCell 
                            cellClick={()=> this.props.cellClick(cell.employeeId, cell.date, cell.id)}
                            cellBlur={()=> this.props.cellBlur(cell.employeeId, cell.date, cell.id)}
                            date={cell.date}
                            index={index}
                            key={key}
                            employeeId={cell.employeeId} 
                            cell={display}
                            id={cell.id}
                            editable={cell.editable}
                            sick={cell.sickTime}
                            vacation={cell.vacationTime}
                            absent={cell.absentTime}
                            holiday={cell.holiday}
                        />
            });
            return (<TableRow key={v4()}>{cells}</TableRow>);
        });
    }

    render() {
    const { hours, hours: { status } } = this.props;
    const employeeData = status === 200 ? this.renderEmployees(hours.data.data) : <tr><td><div> employee name! </div></td></tr>;
    const headers = status === 200 ? renderHeaders(hours.data.dates): <th>Date</th>;
    
        return (
            <div className="ui container">
                <table className="ui celled table">
                    <thead>
                        <tr>
                        <th>Employee Name</th>
                        {headers}
                        <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employeeData}
                    </tbody>
                </table>
                <button 
                    className="ui green button"
                    onClick={()=> this.props.saveTable(hours)}
                >Save</button>
                <Link to={`/hours` }>
                    <button className='ui red button'>Cancel</button>
                </Link>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        hours: state.hours,
    }
}

export default connect(mapStateToProps, { fetchTableData, cellClick, cellBlur, saveTable })(HoursTable);

