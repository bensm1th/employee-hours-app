import React, {Component, PropTypes} from 'react';
import { Header, Table, Rating } from 'semantic-ui-react';
import { v4 } from 'node-uuid';
import filter_types from '../filter_types';
import { browserHistory } from 'react-router';

class ApprovedTables extends Component {
    constructor(props) {
        super(props);
    }

    static contextTypes = {
        router: PropTypes.object,
    };
    
    renderRows() {
        return this.props.tables_approved.map(table=> {
            return (
                <Table.Row 
                    onClick={()=>this.context.router.push(`/hourstable/${table._id}`)}
                    key={v4()}
                >
                    <Table.Cell>{`${table.dates[0]}-${table.dates[table.dates.length-1]}`}</Table.Cell>
                    <Table.Cell>{`${table.createdBy.firstName} ${table.createdBy.lastName}`}</Table.Cell>
                    <Table.Cell>{`${table.approved.manager.firstName} ${table.approved.manager.lastName}`}</Table.Cell>
                </Table.Row>
            )
        });
    }
    render() {
        return (
            <Table celled selectable padded>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Dates</Table.HeaderCell>
                        <Table.HeaderCell>Created By</Table.HeaderCell>
                        <Table.HeaderCell>Approved By</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.renderRows()}
                </Table.Body>
            </Table>
        )
    }
}

export default ApprovedTables;