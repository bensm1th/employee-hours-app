import React from 'react';
import { Route, IndexRoute } from 'react-router';
import DisplayDates from './components/display_dates';
import HoursTable from './components/table';
import App from './components/app';

export default (
    <Route path='/' component={App} >
        <IndexRoute component={DisplayDates} />
        <Route path='hourstable/:id' component={HoursTable} />
    </Route>
)