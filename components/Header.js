import React, { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import NotiPopup from './NotiPopup';
import styles from '../asset/css/Header';
import { connect } from 'react-redux';
import { logout, getUserInfo } from '../actions/authActions';

const getLastTwoWords = (inputString) => {
    if (inputString === null || inputString.length===0){
        return;
    }
    const lastSpaceIndex = inputString.lastIndexOf(' ');
    if (lastSpaceIndex === -1) {
        return inputString;
    }
    const secondsIndex = inputString.substring(0, lastSpaceIndex).lastIndexOf(' ');
    return inputString.substring(secondsIndex + 1);
}

const Header = ({logout, getUserInfo, auth, count}) => {
    const [hour, setHour] = useState('--');
    const [min, setMin] = useState('--');
    const [sec, setSec] = useState('--');

    useEffect(()=>{
        const interval = setInterval(()=>{
            const current = Date.now();
            if ((current/1000)>=auth.user.exp) {
                //logout(); // 2 tiếng tự logout
            }
            const totalSeconds = auth.user.exp - Math.floor(current/1000);
            const remainingSeconds = totalSeconds % 3600;
            setHour(Math.floor(totalSeconds / 3600));
            setMin(Math.floor(remainingSeconds / 60));
            setSec(remainingSeconds % 60);       
        }, 1000)
        getUserInfo();
        return () => clearInterval(interval);
    }, [])

    const [isPopup, setPopup] = useState(false);

    const togglePopup = () => {
        setPopup(!isPopup);
    };

    return (
        <View style={styles.header}>
            <View style={styles.userinfo}>
                <Image style={styles.avatar}
                    source={{uri: auth.user.avatar?auth.user.avatar:'http://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png'}}
                />
                <Text style={styles.greeting}>Xin chào, {getLastTwoWords(auth.user.ten)}</Text>
            </View>
            <View>
                <Text style={styles.time}>{hour<10?"0"+hour:hour}:{min<10?"0"+min:min}:{sec<10?"0"+sec:sec}</Text>
            </View>
            <TouchableOpacity style={styles.notificationButton} onPress={togglePopup}>
                <Icon name="bell" style={styles.icons}/>
                {count > 0 && (
                    <Text style={styles.notify_number}>{count}</Text>
                )}
            </TouchableOpacity>
            <NotiPopup visible={isPopup} onClose={togglePopup} />
        </View>
    )
}

const mapStateToProps = (state)=> ({
    auth: state.auth,
    count: state.noti.count
})



export default connect(mapStateToProps, {logout, getUserInfo})(Header)