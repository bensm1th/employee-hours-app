import React from 'react'
import { Header, Table, Rating } from 'semantic-ui-react';
import { v4 } from 'node-uuid';
import filter_types from '../filter_types';


const ManagerTable = (props) => {
    const renderRows = () => {
        return props.managers.map(manager=> {
            return (
                <Table.Row key={v4()}>
                    <Table.Cell>{`${manager.firstName} ${manager.lastName}`}</Table.Cell>
                    <Table.Cell>{manager.role}</Table.Cell>
                    <Table.Cell>
                        <span
                            onClick={()=>props.changeManagerFilter(filter_types.show, {manager})}
                            id='employeeInfo'
                        >
                            <i className="info circle icon"></i>
                            More Info
                        </span>
                        <span 
                            onClick={()=>props.changeManagerFilter(filter_types.edit_delete, {manager})}
                            id='employeeEdit' 
                        >
                            <i className="edit icon"></i>
                            Edit
                        </span>
                    </Table.Cell>
                </Table.Row>
            )
        });
    }
    return (
        <Table celled padded>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Role</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {renderRows()}
            </Table.Body>
        </Table>
    )
}

export default ManagerTable;