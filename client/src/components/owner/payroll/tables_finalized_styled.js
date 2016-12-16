import React from 'react';
import FinalizedTables from './tables_finalized';
import { Link } from 'react-router';
import filter_types from '../filter_types';

const FinalizedTableStyled = (props) => {
    return (
        <div className='ui segments'>
            <div className='ui center aligned green inverted segment'>
                <h1> Finalized PAYROLL PERIODS </h1>
            </div>
            <div className='ui segment'>
                <FinalizedTables {...props} />
            </div>
        </div>
    )
}

export default FinalizedTableStyled;