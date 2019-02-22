import { combineReducers } from 'redux';
import userReducer from './userReducer';

// Used for combining state to reducers
export default combineReducers({
    user: userReducer, 
})
