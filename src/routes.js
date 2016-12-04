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
import Signout from './components/auth/signout/signout';
import Signin from './components/auth/signin/signin';
import Signup from './components/auth/signup/signup';
import Feature from './components/feature';
import RequireAuth from './components/auth/require_auth';
import NoAuth from './components/no_auth';

export default (
    <Route path='/' component={App} >
        <IndexRoute component={IndexView} />
        <Route path='restricted' component={NoAuth} />
        <Route path='feature' component={RequireAuth(Feature)} />
        <Route path='signin' component={Signin} />
        <Route path='signup' component={Signup} />
        <Route path='signout' component={Signout} />
        <Route path='hours' component={RequireAuth(DisplayDates)} />
        <Route path='hours/index' component={RequireAuth(HoursIndex)} />
        <Route path='hourstable/:id' component={RequireAuth(HoursTable)} />
        <Route path='employee' component={RequireAuth(EmployeeIndex)} />
        <Route path='employee/new' component={RequireAuth(EmployeeNew)} />
        <Route path='employee/:employee_id' component={RequireAuth(EmployeeShow)} />
        <Route path='employee/:employee_id/edit' component={RequireAuth(EmployeeEdit)}/>
        <Route path='timestamp' component={TimestampNew} />
    </Route>
)