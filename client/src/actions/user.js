import axios from 'axios';

// export actions
export const REGISTER = 'RESGISTER';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

// Register the user
export const registerUser = (formData) => {
    return async (dispatch) => {
        try {
            const res = await axios.post('/auth/signup', formData);
            localStorage.setItem('xenoUser', JSON.stringify(res.data));
            return dispatch(register(res.data)); 
        } catch(err) {
            console.error(err);
        }
    }
}

// Log the user in
export const loginUser = (formData) => {
    return async (dispatch) => {
        try {
            const res = await axios.post('/auth/login', formData);
            if (!res.data.err) {
                localStorage.setItem('xenoUser', JSON.stringify(res.data));
                return dispatch(register(res.data));
            }

        } catch(err) {
            console.error(err);
        }
    }
}

// Log the user out
export const logoutUser = () => {
    return (dispatch) => {
        localStorage.removeItem('xenoUser');
        return dispatch(logout())
    }
}

// Register action creator (get dispatched to make state changes)
export const register = (userData) => {
    return {
        type: REGISTER,
        payload: userData,
    }
}

// Login action creator
export const login = (userData) => {
    return {
        type: LOGIN,
        payload: userData, 
    }
}

// logout action creator
export const logout = () => {
    return {
        type:LOGOUT,
    }
}
