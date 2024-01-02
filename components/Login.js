import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { View, TextInput, Text, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import styles from '../asset/css/Login';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authActions';
import isEmpty from '../validation/is-empty';
import messaging from '@react-native-firebase/messaging';
import socketModule from '../utils/socket';

const checkToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
        return fcmToken;
    } else {
        return null;
    }
}

function Login({loginUser, errors}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [saveLogin, setSaveLogin] = useState(false);
    const [usernameChecker, setUchecker] = useState(null);
    const [passwordChecker, setPchecker] = useState(null);

    const getSavedUsername = async() => {
        const savedUsername = await AsyncStorage.getItem('username');
        return savedUsername;
    }

    useEffect(() => {
        getSavedUsername().then((u) => {
            if (u) {
                setUsername(u);
            }
        });
    }, []);

    const onSubmit = async () => {
        const empty_u = isEmpty(username);
        const empty_p = isEmpty(password);
        setUchecker(empty_u);
        setPchecker(empty_p);
        if (!empty_u && !empty_p) {
            console.log("Logging in");
            loginUser({
                username: username,
                password: password,
                fcm_token: await checkToken(),
            }, saveLogin)
        }
    }
    
    return (
        <View style={styles.container}>
            <KeyboardAvoidingView>
                <View style={styles.logo_space}>
                    <Image style={styles.logo} source={require('../asset/img/logo.png')}/>
                </View>
                <View style={styles.form_space}>
                    {usernameChecker?<Text style={styles.warning}>Tên đăng nhập không được để trống!</Text>:<></>}
                    {passwordChecker?<Text style={styles.warning}>Mật khẩu không được để trống!</Text>:<></>}
                    {!isEmpty(errors)?(<Text style={styles.warning}>{errors.login}</Text>):<></>}
                    <View style={styles.input_container}>
                        <Icon name="user" style={styles.icons}/>
                        <TextInput
                            style={styles.field}
                            placeholder="Username"
                            value={username}
                            onChangeText={text=>{setUsername(text); setUchecker(false); setPchecker(false)}}
                            placeholderTextColor='grey'
                            autoCapitalize='none'
                        />
                    </View>
                    <View style={styles.input_container}>
                        <Icon name="lock" style={styles.icons}/>
                        <TextInput style={styles.field}
                            placeholder="Password"
                            value={password}
                            name='password'
                            onChangeText={text=>{setPassword(text); setUchecker(false); setPchecker(false)}}
                            secureTextEntry={!showPassword}
                            placeholderTextColor='grey'
                            autoCapitalize='none'
                        />
                        <TouchableOpacity style={styles.hide_btn}
                        onPress={()=> {setShowPassword(!showPassword)}}>
                            <Icon name={showPassword?'eye':'eye-slash'} style={styles.icons}/>
                        </TouchableOpacity>
                    </View>
        
                    <View style={styles.forgot_save}>
                        <View style={styles.save}>
                            <BouncyCheckbox size={20} onPress={() => {setSaveLogin(!saveLogin)}}
                                iconStyle={{marginRight: -10,
                                            borderColor: '#ffc600'}} 
                                fillColor="#ffc600"
                            />
                            <Text style={styles.save_text}>Lưu đăng nhập</Text>
                        </View>
                        <TouchableOpacity>
                            <Text style={styles.forget_text}>Quên mật khẩu?</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.btn} title="Login" onPress={onSubmit}>
                        <Text style={styles.btn_text}>Đăng Nhập</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
};

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    errors: state.errors
})

export default connect(mapStateToProps, {loginUser})(Login);