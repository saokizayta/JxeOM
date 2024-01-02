import React from 'react';
import {View, Text, TouchableOpacity, Switch} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../asset/css/Setting';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setNotification } from '../actions/authActions';
import { logout } from '../actions/authActions';
import messaging from '@react-native-firebase/messaging';
import { WebView } from 'react-native-webview'


const Setting = ({ logout, isNoti, setNotification}) => {
    const toggleNoti = async () => {
        var fcm_token;
        if (isNoti) {
            fcm_token = null;
        } else {
            fcm_token = await messaging().getToken();
        }
        setNotification(fcm_token);
    }

    return (
        <View style={styles.container}>
            <View style={styles.setting_part}>
                <View style={styles.part_container}>
                    <Text style={styles.part_title}>Thông báo</Text>
                    <Switch trackColor={{false: '#c2c2c2', true: '#4db850'}}
                    thumbColor={isNoti?"green":"grey"}
                    onValueChange={toggleNoti}
                    value={isNoti}
                    style = {{transform: [{scaleX: 1.2}, {scaleY: 1.2}]}}
                    />
                </View>

               
      <WebView
        source={{ uri: 'https://goixecauke.com/show_number.php' }}
        style={{ flex: 1, paddingBottom: 10 }}
      />
               <TouchableOpacity style={styles.logout} onPress={logout}>
                    <Icon name='sign-out' style={styles.icons}/>
                    <Text style={styles.logout_text}>Đăng xuất</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.contact}>
                <Text style={styles.contact_big_title}>Thông tin liên hệ</Text>
                <View style={styles.contact_container}>
                    <View style={styles.part_contact}>
                        <Text style={styles.contact_title}>Điện thoại</Text>
                        <Text style={styles.contact_content}>0966 455 247</Text>
                    </View>
                    <View style={styles.part_contact}>
                        <Text style={styles.contact_title}>Email</Text>
                        <Text style={styles.contact_content}>lienhe@goixecauke.com</Text>
                    </View>
                    <View style={styles.part_contact}>
                        <Text style={styles.contact_title}>Website</Text>
                        <Text style={styles.contact_content}>www.goixecauke.com</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const CreateBill = () => {
    
  };

Setting.propTypes = {
    logout: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    isNoti: state.auth.user.fcm_token
})

export default connect(mapStateToProps, {logout, setNotification})(Setting);