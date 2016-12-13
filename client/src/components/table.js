import React, { Component, PropTypes } from 'react';
import  TableHeader  from './table_header';
import { connect } from 'react-redux';
import TableRow from './table_row';
import TableCell from './table_cell';
import { fetchTableData, cellClick, cellBlur, saveTable, deleteTable, fetchEmployees, addComment, onTextInput, addCommentEmployee, commentClear } from '../actions/index';
import { v4 } from 'node-uuid';
import { Link } from 'react-router';
import InputSelect from './table_input_select';


const renderHeaders = (datesArr) => {
    return datesArr.map(day=> {
        return <TableHeader date={day} key={v4()} />
    })
}

class HoursTable extends Component {

    constructor(props) {
        super(props);
        this.renderEmployees = this.renderEmployees.bind(this);
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
        this.setValues = this.setValues.bind(this);
        this.handleCommentRemove = this.handleCommentRemove.bind(this); 
    }

    static contextTypes = {
        router: PropTypes.object
    }

    componentWillMount() {
        this.props.fetchTableData(this.props.params.id);
        this.props.fetchEmployees();
    }


    renderEmployees(data) {
        return data.map(employee=> {
            const cells = employee.hours.tableArr.map((cell, index) => {
                //sickTime, vacationTime, absentTime, holiday
                const key = v4();
                let display;
                let handleCellClick;
                let handleCellBlur;
                if (index === 0) {
                    display = cell.name;
                }
                if (index !== 0 && index !== employee.hours.tableArr.length -1) {
                    handleCellClick = ()=> this.props.cellClick(cell.employeeId, cell.date, cell.id);
                    handleCellBlur = ()=> this.props.cellBlur(cell.employeeId, cell.date, cell.id);
                    display = cell.workedTime;
                }         
                if (index === employee.hours.tableArr.length -1) {
                    display = cell.totalHours;
                } 
                return  <TableCell 
                            cellClick={handleCellClick}
                            cellBlur={handleCellBlur}
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

    handleDelete() {
        this.props.deleteTable(this.props.hours.data._id). 
            then(this.context.router.push('/hours/index'));
    }

    renderComments() {
        //this will probably need to loop over an array, and create one set of key/value pairs for each object in the array
        // AND, it will need to have a form with that select things an input
        const employees = this.props.employees.map(employee=> {
            return `${employee.lastName}, ${employee.firstName}`;
        });
        return (
            <div>
                <form  onSubmit={(e)=> {
                    e.preventDefault();
                    this.handleCommentSubmit();
                }}>
                    <div className='ui right labeled fluid input'>
                        <InputSelect
                            id='category' 
                            options={employees}
                            logValue={this.setValues}
                            type={'comment'}
                            unit={'employee'}
                            category={'Employee'}
                        />
                        <input
                            type='text'
                            onChange={(e)=>this.props.onTextInput(e.target.value)}
                            value={this.props.comment}
                        />
                        <div 
                            className="ui tag label"
                            onClick={this.handleCommentSubmit}
                        >Add Comment</div>
                    </div>
                </form>
                {this.props.comments.length ? (
                    <table className="ui basic table">
                        <thead>
                            <tr>
                            <th>Employee</th>
                            <th>Comment</th>
                            </tr>
                        </thead>
                        <tbody>
                    {this.renderSubmittedComments()}
                        </tbody>
                    </table>
                ): ('')}
            </div>
        );
    }
    renderSubmittedComments() {
        let commentArr;
        if (this.props.comments) {
        commentArr = this.props.comments.map(comment=> {
            if (comment.id){
            return (
                <tr id='misc' key={comment.id}>
                    <td className='collapsing'> {comment.employee}</td>
                    <td> {comment.comment} 
                        <i 
                            id="commentRemove" 
                            className="large remove icon"
                            onClick={()=>this.handleCommentRemove(comment.id)}
                        ></i>
                    </td>
                </tr>
            )}
        })}
        return commentArr;
    }
    
    handleCommentRemove(id) {
        this.props.commentClear(id);
    }

    handleCommentSubmit() {
        this.props.addComment(this.props.comment, this.props.employee)
    }

    setValues(value, kind, type, unit) {
        this.props.addCommentEmployee(value);
    }

    renderSalariedEmployees() {
        const salariedEmployees = this.props.salariedEmployees.map(employee=> {
            if (employee._id) {
                return (
                <tr>
                    <td className='collapsing'> {`${employee.firstName}  ${employee.lastName}`} </td>
                    <td> {`${employee.salary.monthlyRate}`}</td>
                </tr>)
            }
        });
        return salariedEmployees;
    }

    render() {
        const { hours, hours: { status } } = this.props;
        const employeeData = status === 200 ? this.renderEmployees(hours.data.data) : <tr><td><div> employee name! </div></td></tr>;
        const headers = status === 200 ? renderHeaders(hours.data.dates): <th>Date</th>;
        const dates = status === 200 ?  this.props.hours.data.dates: '';
        const start = status === 200 ? dates[0]: '';
        const end = status === 200 ? dates[dates.length - 1]: '';
        return (
            <div className="ui container">
                <div className='ui center aligned segment'>
                    <h1>
                    HOURLY EMPLOYEES INFO FOR DATES: {start}-{end}
                    </h1>
                </div>
                <table className="ui celled table">
                    <thead className='full-width'>
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
                <div className='ui center aligned segment'>
                    <p> Double-click on any cell to add vacation, sick, absent, or holiday time </p>
                </div>
                <div className='ui center aligned segment'>
                    <h1> SALARIED EMPLOYEES </h1>
                </div>
                <table className="ui celled table">
                    <thead className='full-width'>
                        <tr>
                        <th colSpan={3}>Employee Name</th>
                        <th>Salary</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderSalariedEmployees()}
                    </tbody>
                </table>
                <div className='ui center aligned segment'>
                    <h1> ADD MISCELLANEOUS ITEMS </h1>
                </div>
                <div className='ui segment'>
                    {this.renderComments()}
                </div>
                <button 
                    className="ui green button"
                    onClick={()=> this.props.saveTable(hours)}
                >Save Updates</button>
                <Link to={`/hours/index`}>
                    <button className='ui orange button'>Back</button>
                </Link>
                <button
                    className='ui red button'
                    onClick={()=>this.handleDelete()}
                >Delete</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        hours: state.hours,
        employees: state.employees,
        comment: state.comment.comment,
        employee: state.comment.employee,
        state: state,
        comments: state.hours.data.comments,
        salariedEmployees: state.hours.data.salariedEmployees
    }
}

export default connect(mapStateToProps, { 
    fetchTableData, 
    cellClick, 
    cellBlur, 
    saveTable, 
    deleteTable, 
    fetchEmployees, 
    addComment, 
    onTextInput,
    addCommentEmployee,
    commentClear
})(HoursTable);

