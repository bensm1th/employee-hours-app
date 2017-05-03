import React, { Component } from 'react';
import { connect } from 'react-redux';
import InputSelect from './table_input_select';
import CellUpdate from './table_cell_update';
import { updateHours, deleteHours } from '../../actions/index.js'

class TableCell extends Component {

    constructor(props) {
        super(props);

        this.state = {
            hours: 'hours',
            mins: 'mins',
            type: 'type'
        }

        this.logValue = this.logValue.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    logValue(value, kind) {
        const newState = {};
        newState[kind] = value
        this.setState(newState);
    }

    handleFormSubmit() {
        this.props.updateHours(this.props.employeeId, this.props.date, this.props.id, this.state);
    }
    
    render() {
        console.log('=============== this.props.cell ===================')
        console.log(this.props.cell);
        if (!this.props.editable) {
            return (
                <td 
                    onDoubleClick={this.props.cellClick}
                >
                    {this.props.cell}
                    {this.props.vacation ? (
                        <CellUpdate {...this.props} {...this.state} type='vacation' />
                        ) : ''}

                    {this.props.sick ? (
                        <CellUpdate {...this.props} {...this.state}  type='sick' />
                        ) : ''}

                    {this.props.absent ? (
                        <CellUpdate {...this.props} {...this.state}  type='absent' />
                        ) : ''}
                </td>
            )
        } 
        if(this.props.editable) {
            return (
                <td>
                    <form onSubmit={e=> {
                        e.preventDefault();
                        this.handleFormSubmit();
                    }}>
                    <InputSelect
                        id='hours' 
                        choices={10} 
                        category='hours'
                        logValue={this.logValue}
                    />:
                    <InputSelect 
                        id='mins' 
                        choices={60} 
                        category='mins' 
                        logValue={this.logValue}
                    />
                    <InputSelect 
                        id='type' 
                        choices={4} 
                        category='type' 
                        options={['Vacation', 'Sick', 'Absent']} 
                        logValue={this.logValue}
                    />
                    <button 
                        type='submit'
                        className="mini ui primary basic button"
                    >Save</button>
                    <button
                        onClick={this.props.cellClick} 
                        type="button" 
                        className="mini ui negative basic button"
                    >Cancel</button>
                    </form>
                </td>
            );
        }
    }       
}
const mapStateToProps = (state) => {
    return {
        state: state
    }
}
export default connect(mapStateToProps, { updateHours, deleteHours })(TableCell);
