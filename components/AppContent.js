import React, { useEffect, useState } from 'react';
import { AppState } from 'react-native';

import { connect } from 'react-redux';
import { autoLogin } from '../actions/authActions';

import Navbar from './Navbar';
import Header from './Header';
import Login from './Login';

import messaging from '@react-native-firebase/messaging';
import { NavigationContainer } from '@react-navigation/native';
import { getUserInfo, logout } from '../actions/authActions';
import { getOrdersCount, deleteOrder, newOrderCount, newOrder, getOrderUpdate } from '../actions/ordersActions';
import { addNotification } from '../actions/notiAction';
import NetInfo from '@react-native-community/netinfo';
import Sound from 'react-native-sound';
import { loadNotifications } from '../actions/notiAction';
import { setError } from '../actions/errorActions';

import new_order from '../asset/sounds/new-order.mp3';
// import cancel_order from '../asset/sounds/cancel-order.mp3';
import sound from '../asset/sounds/sound.mp3';

import socketModule from '../utils/socket';
import AsyncStorage from '@react-native-async-storage/async-storage';

const convertNotification = noti => ({ ...noti.notification, timestamp: noti.sentTime })

const playSound = (path) => {
    const sound = new Sound(path, (error)=> {
        if (error)
            console.log('Error loading sound: ',error);
        else
            sound.play((success)=>{
                success?console.log("Played"):console.log("Failed");
                sound.release();
            })
    })
}

const AppContent = ({autoLogin, loadNotifications, logout, authNote, auth,  type, getUserInfo, deleteOrder, newOrderCount, newOrder, route, getOrderUpdate, addNotification, setError }) => {
    const [info, showNotification] = useState("");
    const socket = socketModule.getSocket();

    const handleAppState = async (state) => {
        if (state === 'active' && auth.isAuthenticated) {
            socket.sendBuffer = [];
            socket?.emit('online');
        }
        if (state==='background') {
            socket?.emit("offline");
        }
    }

    useEffect(()=>{
        const subscription = AppState.addEventListener('change', handleAppState);
        if (auth.isAuthenticated && socket)
            socket.emit('join', 'shipper_online');
        return () => subscription.remove();
    }, [socket, auth.isAuthenticated])

    useEffect(()=> {
        if (auth.isAuthenticated){
            socketModule.initSocket('http://14.241.39.50:5000');
            console.log("Running");
            setError({});
        }
    }, [auth.isAuthenticated]);

    const [asyncnoties, setNoties] = useState([]);

    useEffect(()=>{
        const updates = async () => {
            loadNotifications;
            setNoties(await AsyncStorage.getItem('notifications'));
        }
        updates();
    }, [asyncnoties]);

    useEffect(() => {
        socket?.emit('setID', auth?.user?.id);
    }, [socket]);

    useEffect(()=>{
        console.log("Listening");
        socket?.on('pushNotification', (data) => {
            addNotification(data);
            switch (data.action) {
                case 'update_staff':
                    playSound(sound);
                    getUserInfo();
                    break;
                case 'new_order':
                    console.log("Route: ", route);
                    playSound(new_order);
                    if (route === 'home')
                        newOrderCount(1);
                    else if (route === 'delivery' && type==='onwait')
                        newOrder(data.id);
                    break;
                case 'delete_order':
                    playSound(sound);
                    if (route==='home')
                        newOrderCount(-1);
                    else if (route === 'delivery' && type === 'onwait')
                        deleteOrder(data.id);
                    break;
                case 'accept_order':
                    playSound(sound);
                    if (route==='delivery')
                        getOrderUpdate(data.id);
                    break;
                case 'update_order':
                    playSound(sound);
                    if (route==='delivery' && type === 'onwait') {
                        getOrderUpdate(data.id);
                    }
                    break;
                case 'update_account':
                case 'delete_account':
                case 'block_account':
                case 'delete_staff':
                    playSound(sound);
                    logout();
                    authNote(data.title);
                    break;
            }
            console.log(data);
            socket.emit('response', {msg: 'Received pushNotification', id: auth.user.id});
        });
        return (()=> { console.log("Closed"); socket?.off('pushNotification')});
    }, [route, socket, type]);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            if (!state.isConnected) {
                showNotification("NETWORKERROR");
            }
        });
        return () => unsubscribe();;
    }, []);


    useEffect(()=> { 
        const getToken = async () => {
            const fcm_token = await messaging().getToken();
            autoLogin(fcm_token);
        }
        getToken();
        loadNotifications();
    }, []);

    messaging().setBackgroundMessageHandler(async remoteMessage => {
        addNotification(convertNotification(remoteMessage));
        if (remoteMessage.notification.title==='Tài khoản thay đổi' ||
            remoteMessage.notification.title==='Tài khoản đã bị khóa!' ||
            remoteMessage.notification.title==='Nhân viên đã bị xóa' ||
            remoteMessage.notification.title==='Tài khoản đã bị xóa')
        {
            logout();
            setError({login: remoteMessage.notification.title});
        }
    });

    return(
    <>
        {auth.isAuthenticated?
        <>
            <Header username="Bửu"/>
            <NavigationContainer>
                <Navbar/>
            </NavigationContainer>
        </>:
        <Login/>}
    </>)
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    type: state.orders.type,
    route: state.orders.route,
    notifications: state.noti.notifications,
})

export default connect(mapStateToProps, {autoLogin, loadNotifications, logout, deleteOrder, getOrdersCount, getUserInfo, getUserInfo, newOrderCount, newOrder, getOrderUpdate, addNotification, setError})(AppContent);