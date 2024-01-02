import axios from 'axios';
import { SET_NOTIFICATIONS, GET_NOTIFICATION, READ_NOTIFICATION } from './types'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadNotifications = () => async dispatch => {
    try {
        var notes = await AsyncStorage.getItem('notifications');
        if (notes !== null) {
            notes = JSON.parse(notes);
            console.log(notes.length);
            notes = notes?.filter(item=>(item!== null && !item.read));
            if (notes.length >0) {
                await dispatch({
                    type: SET_NOTIFICATIONS,
                    payload: notes,
                })
            }
            await AsyncStorage.setItem('notifications', JSON.stringify(notes));
        }
    } catch (err) {
        console.log(err);
    }
}

export const addNotification = (note) => async dispatch => {
    dispatch({
        type: GET_NOTIFICATION,
        payload: note
    })
    var old = await AsyncStorage.getItem('notifications');
    if (old===null) {
        old = [];
    } else {
        old = JSON.parse(old);
    }
    await AsyncStorage.setItem('notifications', JSON.stringify([{...note, read: false}, ...old]));
}

export const readNotification = (id) => async dispatch => {
    await dispatch({
        type: READ_NOTIFICATION,
        payload: id
    })
    var old = await AsyncStorage.getItem('notifications');
    if (old===null) {
        old = [];
    } else {
        old = JSON.parse(old);
    }
    await AsyncStorage.setItem('notifications', JSON.stringify(old.map((item, index)=>{
        if (index === id) {
            return {...item,read: !item.read}
        } else {
            return item;
        }
    })));
}