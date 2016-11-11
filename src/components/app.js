import React, { Component } from 'react';
import SetDates from '../containers/set_dates';
import DisplayDates from '../components/display_dates';

export default class App extends Component {
  render() {
    return (
      <div>
        <DisplayDates />
      </div>
    );
  }
}
