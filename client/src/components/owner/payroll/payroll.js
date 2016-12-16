import React from 'react';
import ApprovedTableStyled from './tables_approved_styled';
import FinalizedTables from './tables_finalized_styled';

const Payroll = (props) => {
    console.log('============== props in payroll --------------------')
    console.log(props);
    return (
        <div className='ui container'>
            <ApprovedTableStyled {...props}/>
            <FinalizedTables {...props}/>
        </div>
    )
} 

export default Payroll;