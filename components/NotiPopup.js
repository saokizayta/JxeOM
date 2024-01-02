import React from 'react';
import {TouchableOpacity, Modal, View, Text, FlatList} from 'react-native';
import styles from '../asset/css/NotiPopup';
import { connect } from 'react-redux';
import { readNotification } from '../actions/notiAction';
import { format } from 'date-fns';
// import Icon from 'react-native-vector-icons/FontAwesome';


const timeToDate = time => format(time, 'HH:mm:ss dd/MM/yyyy');

const mapColor = (title) => {
    switch (title) {
        case 'Xóa đơn hàng':
            return '#ca2000'
        case 'Có đơn hàng mới':
            return '#0074e2'
        case 'Cập nhật đơn hàng':
            return '#de8300'
        default:
            return 'black'
    }
}
const OneNoti = ({item, index, readNotification}) => {
    return <TouchableOpacity style={{...styles.noti_container, borderColor: item.read?'#65c200':'#de8300'}} onPress = {()=>readNotification(index)}>
        <View style={styles.header}>
            <Text style = {{...styles.title, color: mapColor(item.title)}}>{item.title}</Text>
            <Text style={{...styles.state, color: item.read?'#65c200':'#de8300'}}>{item.read?"ĐÃ ĐỌC":"CHƯA ĐỌC"}</Text>
        </View>
        <Text style = {styles.content}>{item.body}</Text>
        <Text style = {styles.timestamp}>{timeToDate(item.timestamp)}</Text>
        {/* <View style = {styles.footer}>
            <TouchableOpacity style={styles.btn}>
                <Icon name='angle-down' style={styles.btn_text}/>
            </TouchableOpacity>
        </View> */}
    </TouchableOpacity>
}

const NotiPopup = ({visible, onClose, notifications, readNotification}) => {
    const closePopup = () => {
        onClose();
    }
    return (
        <Modal
            transparent
            animationType='fade'
            visible={visible}
            onRequestClose={onClose}
        >
            <TouchableOpacity style={styles.container} onPress={closePopup}>
                <TouchableOpacity style={styles.modalContainer} activeOpacity={1}>
                    <FlatList
                        readNotification = {(id)=>readNotification(id)}
                        data={notifications}
                        renderItem={({item, index})=><OneNoti item={item} index = {index} readNotification={readNotification}/>}
                        keyExtractor={(item, index) => index.toString()}>
                    </FlatList>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    )
}

const mapStateToProps = (state) => ({
    notifications: state.noti.notifications
})
export default connect(mapStateToProps, { readNotification }) (NotiPopup);