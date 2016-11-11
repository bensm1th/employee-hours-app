import { combineReducers } from 'redux';
import HoursReducer from './reducer_hours';

const rootReducer = combineReducers({
  hours: HoursReducer,
});

export default rootReducer;
