import React, { useEffect, useState } from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView, Platform, Keyboard, KeyboardAvoidingView} from 'react-native';
import styles from '../asset/css/Profile';
import { connect } from 'react-redux';
import { updateInfo } from '../actions/authActions';
import { TextInput } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import DatePicker from 'react-native-date-picker';
import { getUserInfo } from '../actions/authActions';
import isEmpty from '../validation/is-empty';

const mapLabel = (key) => {
    switch (key) {
        case 'trangThai':
            return 'Trạng thái'
        case 'diaChi':
            return 'Địa chỉ'
        case 'sdt':
            return "SĐT"
        case 'email':
            return 'Email'
        case 'vaiTro':
            return 'Vai trò'
        case 'gioiTinh':
            return 'Giới tính'
        case 'ngaySinh':
            return 'Ngày sinh'
        default:
            return key
    }
}

const notShow = ['ten', 'avatar', 'fcm_token', 'iat', 'exp', 'taiKhoan_id', 'noti', 'socket_id']
const notUpdate = ['id', 'vaiTro', 'trangThai', 'socket_id'];

const ProfilePart = ({k, isEdit, setCurrent, current}) => {
    if ( notShow.includes(k) ) {
        return;
    }

    if (!isEdit) {
        return (
            <View style={styles.info_container}>
                <Text style={styles.info_title}>{mapLabel(k)}</Text>
                <Text style={styles.info}>{current[k]}</Text>
            </View>
        )
    }

    if (notUpdate.includes(k)) {
        return;
    }

    switch (k) {
        case 'ngaySinh':
            return (
            <View style={{...styles.info_container, flexDirection: 'column'}}>
                <Text style={styles.info_title}>{mapLabel(k)}</Text>
                <DatePicker
                    textColor='black'
                    date={new Date(current[k])}
                    mode='date'
                    format='YYYY-MM-DD'
                    onDateChange={(date) => {setCurrent({...current, [k]: date.toISOString().split('T')[0]})}}
                    />
            </View>)
        default:
            return (
            <View style = {styles.info_container}>
                <Text style={styles.info_title}>{mapLabel(k)}</Text>
                <TextInput style={styles.update_info_box}
                value={current[k]}
                onChangeText={(text)=>setCurrent({...current, [k]: text})}/>
            </View>)
    }
}

const Profile = ({user, updateInfo, getUserInfo}) => {
    const [isEdit, setEdit] = useState(false);
    const [current, setCurrent] = useState({});
    const [keyboard, setKeyboard] = useState(false);

    useEffect(()=>{
        const show_listener = Keyboard.addListener('keyboardDidShow', ()=>{setKeyboard(true)});
        const hide_listener = Keyboard.addListener('keyboardDidHide', ()=>{setKeyboard(false)});

        return ()=>{show_listener.remove(); hide_listener.remove()}
    }, [])

    useEffect(()=>{ getUserInfo() }, []);

    useEffect(()=>{ setCurrent(user) }, [user]);

    const choosePhoto = () => {
        launchImageLibrary({noData: true}, (res)=>{
            if(res) {
                setCurrent({...current, avatar: {
                    name: res.assets[0].fileName,
                    type: res.assets[0].type,
                    uri: Platform.OS === 'ios' ? res.assets[0].uri.replace('file://', ''): res.assets[0].uri
                }});
            }
        })
    }

    const updateHandler = async () => {
        var newInfo = {}
        Object.keys(user).forEach(k=>{
            if (user[k]!==current[k] && k!=='iat' && k!=='exp' && current[k]!==null) {
                newInfo[k] = current[k];
            }
        })
        if (isEmpty(newInfo)) {
            setCurrent(user);
        } else {
            const res = await updateInfo(newInfo);
            if (!res) {
                setCurrent(user);
            }
        }
        setEdit(false);
    }

    return (
        <View style={styles.container}>
            {
                isEdit?
                <View style={styles.info_header}>
                    <TouchableOpacity onPress = {choosePhoto}>
                        <Image style={styles.avatar}
                            source={{uri: current.avatar?(current.avatar.uri?current.avatar.uri:current.avatar):'https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png'}}
                        />
                    </TouchableOpacity>
                    <TextInput style={styles.update_info_box}
                    value={current.ten}
                    onChangeText={(text) => setCurrent({...current, ten: text})}
                    />
                </View>:
                <View style={styles.info_header}>
                    <Image style={styles.avatar}
                        source={{uri: user.avatar?user.avatar:'https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png'}}
                    />
                    <Text style={styles.name}>{user.ten}</Text>
                </View>
            }
            <View style={{width: '100%', maxHeight: '74%'}}>
                <KeyboardAvoidingView>
                    <ScrollView style={{width: '100%', maxHeight: '100%'}}>
                        <View style={styles.body_container}>
                            {Object.keys(user).map((k)=><ProfilePart key={k} k={k} isEdit={isEdit} setCurrent={setCurrent} current={current}/>)}
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
            {keyboard?<></>:(isEdit?
            <View style={styles.footer}>
                <TouchableOpacity style={styles.back_btn} onPress={()=>{setEdit(false); setCurrent(user)}}>
                    <Text style={styles.btn_text}>Quay lại</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.update_btn} onPress={updateHandler}>
                    <Text style={styles.btn_text}>Cập nhật</Text>
                </TouchableOpacity>
            </View>
            :
            <View style = {styles.footer}>
                <TouchableOpacity style={styles.update_info} onPress={()=>{setEdit(true)}}>
                    <Text style={styles.update_info_text}>Cập nhật thông tin</Text>
                </TouchableOpacity>
            </View>
            )}
            
        </View>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
})

export default connect(mapStateToProps, {updateInfo, getUserInfo})(Profile);