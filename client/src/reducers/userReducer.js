import axios from 'axios';

import { REGISTER, LOGIN, LOGOUT } from '../actions/user';

// the user reducer for handling state
const userReducer = async (state=null, action) => {
    switch(action.type) {
        case REGISTER:
            try {
                const response = await axios.post('/auth/signup',action.formData);
                console.log(response.body);
                localStorage.setItem('xenoInfo', response.body);
                return state = response.body;
            }catch(error) {
                console.error(error);
            }
        case LOGIN:
            try {
                const response = await axios.put('/auth/signin', action.formData);
                console.log()
                localStorage.setItem('xenoInfo', response.body);
                return state = response.body;
            }catch(error) {
                console.error(error);
            }
        case LOGOUT:
            localStorage.setItem('xenoInfo', null)
            return state = null;
        default:
            return state;
    }
}

export default userReducer;
