import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER, GET_USER_INFO, SET_NOTIFICATION } from './types'
import jwt_decode from 'jwt-decode'
import AsyncStorage from '@react-native-async-storage/async-storage';
import socketModule from '../utils/socket';

import setAuthToken from '../utils/setAuthToken';

// // Auto Login
export const autoLogin = (fcm_token) => async dispatch => {
    try {
        const token = await AsyncStorage.getItem('jwtToken');
        if (token) {
            setAuthToken(token);
            const res = await axios.put('http://14.241.39.50:5000/api/staffs/autologin', {fcm_token});
            if (res.status===200) {
                const decoded = jwt_decode(token);
                await dispatch(setCurrentUser(decoded));
            } else {
                logout();
                dispatch({  
                    type: GET_ERRORS,
                    payload: res.data
                })
            }
        }
    }
    catch (err) {
        console.log("Err", err.response.data)
        logout();
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}

// Login - get user token
export const loginUser = (userData, saveLogin) => async dispatch => {
    try {
        console.log(userData);
        const res = await axios.post('http://14.241.39.50:5000/api/staffs/login', userData);
        const token = res.data.token;
        if (saveLogin) {
            await AsyncStorage.setItem('jwtToken', token);
            await AsyncStorage.setItem('username', userData.username);
        } else {
            await AsyncStorage.removeItem('jwtToken');
            await AsyncStorage.removeItem('username');
        }
        // Set token to Auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // Set current user
        dispatch(setCurrentUser(decoded));
    } catch(err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
};

// Set logged in user
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

// Get all wait orders of current user
export const setNotification = (fcm_token) => async dispatch => {
    try {
        const res = await axios.put('http://14.241.39.50:5000/api/staffs/fcm', {fcm_token});
        console.log("SET NOTi");
        if (res.status === 200) {
            await dispatch({
                type: SET_NOTIFICATION,
                payload: (fcm_token !== null)
            })
        }
    } catch (err) {
        console.log(err);
        await dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}

export const getUserInfo = () => async dispatch => {
    try {
        const res = await axios.get('http://14.241.39.50:5000/api/staffs/current');
        dispatch({
            type: GET_USER_INFO,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response
        })
    }
}


// Logout
export const logout = () => async dispatch => {
    try {
        await AsyncStorage.removeItem('jwtToken');
        setAuthToken(false);
        await dispatch(setCurrentUser({}));
        socketModule.removeSocket();
    } catch (err) {
        console.log(err.response.data);
    }
}

export const authNote = (noti) => dispatch => {
    dispatch({
        type: GET_ERRORS,
        payload: {login: noti}
    })
}

export const updateInfo = (newInfo) => async dispatch => {
    try {
        console.log(newInfo);
        const formData = new FormData();
        Object.keys(newInfo).forEach(k=>{
            if(k==='avatar' && newInfo.avatar) {
                formData.append(k, newInfo.avatar);
            } else {
                formData.append(k, newInfo[k]);
            }
        })
        console.log(formData);
        const res = await axios.put('http://14.241.39.50:5000/api/staffs/update', formData, 
        { headers: {'Content-Type': 'multipart/form-data'} });
        if (res.status===200) {
            dispatch({
                type: GET_USER_INFO,
                payload: res.data
            })
            return true;
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}