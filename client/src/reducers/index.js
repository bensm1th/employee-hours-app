import { combineReducers } from 'redux';
import HoursReducer from './reducer_hours';
import EmployeesReducer from './reducer_employees';
import EmployeeReducer from './reducer_employee';
import IdChangeReducer from './reducer_id_input';
import TimestampReducer from './reducer_timestamp';
import TablesReducer from './reducer_tables';
import DatesReducer from './reducer_date_set';
import AuthReducer from './reducer_auth';
import { reducer as formReducer } from 'redux-form';


const rootReducer = combineReducers({
  hours: HoursReducer,
  employees: EmployeesReducer,
  employee: EmployeeReducer,
  form: formReducer,
  IdInput: IdChangeReducer,
  timestamp: TimestampReducer,
  tables: TablesReducer,
  dates: DatesReducer,
  auth: AuthReducer
});

export default rootReducer;