import axios from 'axios';

// export actions
export const REGISTER = 'RESGISTER';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

// Register action creator (get dispatched to make state changes)
export const register = (registerData) => {
    return {
        type: REGISTER,
    }
}

// Login action creator
export const login = (loginData) => {
    return {
        type: LOGIN,
    }
}

// logout action creator
export const logout = () => {
    return {
        type:LOGOUT,
    }
}
