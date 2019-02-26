import axios from 'axios';

import { REGISTER, LOGIN, LOGOUT } from '../actions/user';

// the user reducer for handling the user state
const userReducer = async (state=null, action) => {
    switch(action.type) {
        case REGISTER:
            state = action.payload;
            break;
        case LOGIN:
            state = action.payload;
            break;
        case LOGOUT:
            state = null;
            break;
        default:
            return state;
    }
    return state;
}

export default userReducer;
