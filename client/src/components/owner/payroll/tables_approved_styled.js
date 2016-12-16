import React from 'react';
import ApprovedTables from './tables_approved';
import { Link } from 'react-router';
import filter_types from '../filter_types';

const ApprovedTableStyled = (props) => {
    return (
        <div className='ui segments'>
            <div className='ui center aligned green inverted segment'>
                <h1> APPROVED PAYROLL PERIODS </h1>
            </div>
            <div className='ui segment'>
                <ApprovedTables {...props} />
            </div>
        </div>
    )
}

export default ApprovedTableStyled;