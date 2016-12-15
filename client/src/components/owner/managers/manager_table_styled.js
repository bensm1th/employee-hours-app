import React from 'react';
import ManagerTable from './manager_table';
import { Link } from 'react-router';
import filter_types from '../filter_types';

const ManagerTableStyled = (props) => {
    return (
        <div className='ui segments'>
            <div className='ui center aligned green inverted segment'>
                <h1> MANAGERS </h1>
            </div>
            <div className='ui segment'>
                <ManagerTable {...props} />
                <button 
                    type='button' 
                    className='ui green button'
                    onClick={()=>props.changeManagerFilter(filter_types.new)}
                >Add Manager Account</button>
            </div>
        </div>
    )
}

export default ManagerTableStyled;
