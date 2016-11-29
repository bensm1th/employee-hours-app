import React from 'react';
import { Route, IndexRoute } from 'react-router';
import DisplayDates from './components/display_dates';
import HoursTable from './components/table';
import EmployeeIndex from './components/employee_index';
import IndexView from './components/index_view';
import App from './components/app';
import EmployeeShow from './components/employee_show';
import EmployeeNew from './components/employee_new';
import EmployeeEdit from './components/employee_edit';
import TimestampNew from './components/timestamp_new';
import HoursIndex from './components/hours_index';

export default (
    <Route path='/' component={App} >
        <IndexRoute component={IndexView} />
        <Route path='hours/index' component={HoursIndex} />
        <Route path='hours' component={DisplayDates} />
        <Route path='hourstable/:id' component={HoursTable} />
        <Route path='employee' component={EmployeeIndex} />
        <Route path='employee/new' component={EmployeeNew} />
        <Route path='employee/:employee_id' component={EmployeeShow} />
        <Route path='employee/:employee_id/edit' component={EmployeeEdit}/>
        <Route path='timestamp' component={TimestampNew} />
    </Route>
)