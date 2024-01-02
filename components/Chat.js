import React from 'react';
import {View, Text} from 'react-native';
import styles from '../asset/css/Chat';

const Chat = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.notification}>Chức năng đang được cập nhật, vui lòng quay lại sau!</Text>
        </View>
    )
}


export default Chat;