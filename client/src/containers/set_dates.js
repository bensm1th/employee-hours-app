import React from 'react';
import { getHours } from '../actions';
import { connect } from 'react-redux';
import DisplayDates from '../components/display_dates';

let SetDates = ({
  onTestClick,
  hours
}) => {
  console.log(hours);
  return (
    <div>
        <DisplayDates onClick={onTestClick} />
    </div>
  );
}

//it just takes 'dispatch' as an arugment
const mapDispatchToProps = (
  dispatch
) => {
  return {
    onTestClick: () => {
      dispatch(getHours())
    }
  }
}

const mapStateToProps = (
  state
) => {
  return {
    hours: state.hours
  }
}

SetDates = connect(mapStateToProps, mapDispatchToProps)(SetDates);
export default SetDates;