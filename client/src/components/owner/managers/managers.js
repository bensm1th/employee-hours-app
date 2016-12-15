import React from 'react';
import ManagerTableStyled from './manager_table_styled';
import ManagerActive from './manager_active';
import { Link } from 'react-router';
import ManagerEdit from './manager_edit';
import filter_types from '../filter_types';
import Signup from '../../auth/signup/signup';

const Managers = (props) => {
    const filterView = () => {
        switch(props.manager_filter) {
            case filter_types.table:
                return <ManagerTableStyled {...props}/>
            case filter_types.show:
                return <ManagerActive {...props}/>
            case filter_types.new:
                return <Signup {...props}/>
            case filter_types.edit_delete:
                return <ManagerEdit {...props}/>
        }
    }
    return (
        <div className = 'ui container'>
            {filterView()}
        </div>
    )
} 

export default Managers;