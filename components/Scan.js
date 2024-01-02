import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../asset/css/Scan';

const Scan = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.notification}>Chức năng đang được cập nhật, vui lòng quay lại sau!</Text>
        </View>
    )
}

export default Scan;