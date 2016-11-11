import React from 'react';
import  TableHeader  from './table_header';
import TableRow from './table_row';

const renderHeaders = (datesArr) => {
    return datesArr.map(day=> {
        let totalTime = 0;
        return <TableHeader date={day} key={day} />
    })
}

const renderEmployeeNames = (data) => {
    return data.map(employee=> {
        const name = employee.employee.firstName;
        return (<TableRow><td><div> {name} </div></td></TableRow>);
    })

}

const HoursTable = ({hours, status}) => {
    if (status) {
        console.log(hours.data.data);
    }
    const employeeData = status ? renderEmployeeNames(hours.data.data) : <tr><td><div> employee name! </div></td></tr>;
    const headers = status ? renderHeaders(hours.data.dates): <th>Date</th>;
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
        </div>
    )
}
export default HoursTable;

