import React, { Component, PropTypes } from 'react';
import  TableHeader  from './table_header';
import { connect } from 'react-redux';
import TableRow from './table_row';
import TableCell from './table_cell';
import { 
    fetchTableData, 
    cellClick, 
    cellBlur, 
    saveTable, 
    deleteTable, 
    fetchEmployees, 
    addComment, 
    onTextInput, 
    addCommentEmployee, 
    commentClear,
    approvePayroll,
    clearPayrollMessage,
    finalizePayroll,
    autoSaveTable
    } from '../../actions/index';
import { v4 } from 'node-uuid';
import { Link } from 'react-router';
import InputSelect from './table_input_select';
import AlertMessage from '../alert_message';
const moment = require('moment-timezone');

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
        this.handleMessageClose = this.handleMessageClose.bind(this);
    }

    static contextTypes = {
        router: PropTypes.object
    }

    componentWillMount() {
        this.props.fetchTableData(this.props.params.id);
        this.props.fetchEmployees();
        this.props.clearPayrollMessage();
    }

    componentWillUnmount() {
        this.props.saveTable(this.props.hours);
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
                if (index !== 0 && index !== employee.hours.tableArr.length -1 && !this.props.finalized) {
                    handleCellClick = ()=> this.props.cellClick(cell.employeeId, cell.date, cell.id);
                    handleCellBlur = ()=> this.props.cellBlur(cell.employeeId, cell.date, cell.id);
                    display = cell.workedTime;
                }   
                if (this.props.finalized && index !== 0) {
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
        let employees, category, toggleInput;
        if (!this.props.finalized) {
            employees = this.props.employees.map(employee=> {
                return `${employee.lastName}, ${employee.firstName}`;
            }); 
            category = 'Employee'
            toggleInput = 'ui right labeled fluid input';
        }
        else {
            employees = '';
            category = 'Not Available';
            toggleInput = 'ui right labeled disabled fluid input';
        }
        return (
            <div>
                <form onSubmit={(e)=> {
                    e.preventDefault();
                    this.handleCommentSubmit();
                }}>
                    <div className={toggleInput}>
                        <InputSelect
                            id='category' 
                            options={employees}
                            logValue={this.setValues}
                            type={'comment'}
                            unit={'employee'}
                            category={category}
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
        const commentClass = !this.props.finalized ? 'misc' : '';
        if (this.props.comments.length) {
            commentArr = this.props.comments.map(comment=> {
                if (comment.id){
                return (
                    <tr id={commentClass} key={comment.id}>
                        <td className='collapsing'> {comment.employee}</td>
                        <td> {comment.comment} 
                        {!this.props.finalized ? 
                            (<i 
                                id="commentRemove" 
                                className="large remove icon"
                                onClick={()=>this.handleCommentRemove(comment.id)}
                            ></i>) : 
                            ('')
                        }
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
                <tr key={v4()}>
                    <td className='collapsing'> {`${employee.firstName}  ${employee.lastName}`} </td>
                    <td> {`${employee.salary.monthlyRate}`}</td>
                </tr>)
            }
        });
        return salariedEmployees;
    }

    renderAlert() {
        if (this.props.payrollMessage.show) {
            const success = this.props.payrollMessage.success;
            return (
                <AlertMessage
                    success={success}
                    errorMessage={this.props.payrollMessage.message}
                    handleMessageClose={this.handleMessageClose}
                    successMessage={this.props.payrollMessage.message}
                />
            );
        }
    }

    handleMessageClose() {
        this.props.clearPayrollMessage();
    }

    renderButtons(hours, managerId) {
        if (this.props.finalized) {
            return (
                <button 
                    disabled
                    className="ui right labeled icon button"
                >
                    <i className="check circle outline large icon"></i>
                        Payroll is Finalized
                </button>
            )
        } 
        if (this.props.approved && !this.props.finalized) {
            return (
                <div>
                    <button 
                        className="ui green button"
                        onClick={()=> this.props.saveTable(hours)}
                    >Save Updates</button>
                    <button
                        className='ui red button'
                        onClick={()=>this.handleDelete()}
                    >Delete</button>
                    <button 
                        className="ui right labeled icon button"
                        onClick={()=>this.props.finalizePayroll(hours, managerId)}
                    >
                        <i className="check circle outline large icon"></i>
                        Finalize Payroll
                    </button>
                </div>
            )
        } 
        if (!this.props.approved) {
            return (
                <div>
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
                    <button 
                        className="ui right labeled icon button"
                        onClick={()=>this.props.approvePayroll(hours, managerId)}
                    >
                        <i className="check circle outline large icon"></i>
                        Approve Payroll
                    </button>
                </div>
            )
        }
    }

    handleFinalizedTable(reducedTable) {
        console.log(reducedTable);
    }

    render() {
        if (this.props.finalized) this.handleFinalizedTable(processTable(this.props.hours.data.data));
        const { managerId, hours, hours: { status } } = this.props;
        const employeeData = status === 200 ? this.renderEmployees(hours.data.data) : <tr><td><div> employee name! </div></td></tr>;
        const headers = status === 200 ? renderHeaders(hours.data.dates): <th>Date</th>;
        const dates = status === 200 ?  this.props.hours.data.dates: '';
        const start = status === 200 ? dates[0]: '';
        const end = status === 200 ? dates[dates.length - 1]: '';
        return (
            <div 
                className="ui container"
            >
                <div className='ui segments'>
                    <div className='ui center aligned green inverted segment'>
                        <h1>
                        HOURLY TIMES FOR : {start}-{end} 
                        </h1>
                        -- created by : {`${this.props.createdBy.firstName} ${this.props.createdBy.lastName}`}
                        <br />
                        {this.props.approved ? `--approved by ${this.props.approvedBy.firstName} ${this.props.approvedBy.lastName}`: ''}
                        <br />
                        {this.props.finalized ? `--finalzed by ${this.props.finalizedBy.firstName} ${this.props.finalizedBy.lastName}`: ''}
                    </div>
                    <div className='ui segment'>
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
                    </div>
                    <div className='ui center aligned secondary segment'>
                        <p> Double-click on any cell to add vacation, sick, or absent time </p>
                    </div>
                </div>
                <div className='ui two column grid'>
                    <div className='column'>
                        <div className='ui segments'>
                            <div className='ui center aligned green inverted horizontal segment'>
                                <h1> SALARIED EMPLOYEES </h1>
                            </div>
                            <div className='ui horizontal segment'>
                                <table className="ui celled table">
                                    <thead className='full-width'>
                                        <tr>
                                        <th>Employee Name</th>
                                        <th>Salary</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderSalariedEmployees()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {this.renderAlert()}
                            {this.renderButtons(hours, managerId)}
                    </div>
                        <div className='column'>
                            <div className='ui segments'>
                                <div className='ui center aligned green inverted horizontal segment'>
                                    <h1> ADD MISCELLANEOUS ITEMS </h1>
                                </div>
                                <div className='ui horizontal segment'>
                                    {this.renderComments(hours, managerId)}
                                </div>
                            </div>
                    </div>
                </div>
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
        salariedEmployees: state.hours.data.salariedEmployees, 
        createdBy: state.hours.data.createdBy,
        tableId: state.hours.data._id,
        managerId: state.auth.id,
        payrollMessage: state.hours.payrollMessage,
        approved: state.hours.data.approved.status,
        finalized: state.hours.data.finalized.status,
        approvedBy: state.hours.data.approved.manager,
        finalizedBy: state.hours.data.finalized.manager
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
    commentClear,
    approvePayroll,
    clearPayrollMessage,
    finalizePayroll,
    autoSaveTable
})(HoursTable);
//processTable takes the table data and reduces it to objects containing an employee number, and the total amounts of time for each category;
function processTable(table) {
    return table
        .map(employee=> {
            return employee.hours.tableArr
        .filter(cell=> {
            return cell.date;
        })
    }).map(employee=> {
        return employee.map(cell=> {
            const props = filterTimeTypes(cell);
            return {...cell, absentTime: props.absentTime, sickTime: props.sickTime, vacationTime: props.vacationTime, workedTime: props.workedTime };
        })
        .reduce((redx, curr)=> {
            redx.absentTime += curr.absentTime;
            redx.sickTime += curr.sickTime;
            redx.vacationTime += curr.vacationTime;
            redx.workedTime += curr.workedTime;
            redx.employeeId = curr.employeeId;
            return redx;
        }, { absentTime: 0, sickTime: 0, vacationTime: 0, workedTime: 0 })
    })

    function convertTime(tableCell, type) {
        const hours = (tableCell[type]).match(/^\d+/g);
        const minutes = (tableCell[type]).match(/\d+$/g)/60;
        const totalTime = +hours + +minutes;
        return totalTime;
    }
    function filterTimeTypes(cell) {
        const absentTime = typeof cell.absentTime === 'string' ? convertTime(cell, 'absentTime') : 0;
        const sickTime = typeof cell.sickTime === 'string' ? convertTime(cell, 'sickTime') : 0;
        const vacationTime = typeof cell.vacationTime === 'string' ? convertTime(cell, 'vacationTime') : 0;
        const workedTime = typeof cell.workedTime === 'string' ? convertTime(cell, 'workedTime') : 0;
        return { absentTime, sickTime, vacationTime, workedTime }
    }
}


