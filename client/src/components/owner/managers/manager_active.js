import React from 'react';
const moment = require('moment-timezone');
import { Link } from 'react-router';
import filter_types from '../filter_types';

const ManagerActive = (props) => {
    const payType = props.active_manager.hourlyPay.applies ? 'Hourly Pay' : 'Salary';
    const pay = props.active_manager.hourlyPay.applies ? props.active_manager.hourlyPay.rate : props.active_manager.salary.monthlyRate;
    const DOB = moment(props.active_manager.DOB).format('LL');
    return (
        <div className='ui container'>
            <div className='ui segments'>
                <div className='ui center aligned green inverted segment'>
                    <h1> MANAGER INFO: {props.active_manager.firstName + " " + props.active_manager.lastName} </h1>
                </div>
                <div className='ui segment'>
                    <ul className='ui list'>
                        <li className='item'> First name: {props.active_manager.firstName}</li>
                        <li className='item'> Last name: {props.active_manager.lastName} </li>
                        <li className='item'> Employee number: {props.active_manager.employeeNumber}</li>
                        <li className='item'> Address: {props.active_manager.address}</li>
                        <li className='item'> Phone: {props.active_manager.phone}</li>
                        <li className='item'> DOB: {DOB}</li>
                        <li className='item'> Sick Days Left: {props.active_manager.sickDaysLeft}</li>
                        <li className='item'> Vacaction Days Left: {props.active_manager.vacationDaysLeft}</li>
                        <li className='item'> {payType}: {pay}</li>
                    </ul>
                    <button 
                        className='ui orange button'
                        onClick={()=>props.changeManagerFilter(filter_types.edit_delete, {manager: props.active_manager})}
                    >Edit</button>
                    <button 
                        className='ui blue button'
                        onClick={()=>props.changeManagerFilter(filter_types.table, '')}
                    >Back</button>
                </div>
            </div>
        </div>
    )
}

export default ManagerActive;