import { combineReducers } from 'redux';
import HoursReducer from './reducer_hours';
import EmployeesReducer from './reducer_employees';
import IdChangeReducer from './reducer_id_input';
import CommentInputReducer from './reducer_comment_input';
import TimestampReducer from './reducer_timestamp';
import TablesReducer from './reducer_tables';
import DatesReducer from './reducer_date_set';
import AuthReducer from './reducer_auth';
import OwnerReducer from './reducer_auth_owner';
import { reducer as formReducer } from 'redux-form';
import EmployeeReducer from './reducer_employee';



const rootReducer = combineReducers({
  hours: HoursReducer,
  employees: EmployeesReducer,
  employee: EmployeeReducer,
  form: formReducer,
  IdInput: IdChangeReducer,
  timestamp: TimestampReducer,
  tables: TablesReducer,
  dates: DatesReducer,
  auth: AuthReducer,
  owner: OwnerReducer,
  comment: CommentInputReducer
});

export default rootReducer;
