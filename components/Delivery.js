import React, { useEffect, useState } from 'react';
import {TouchableOpacity, Image, Modal, View, Text, StyleSheet, FlatList, TextInput} from 'react-native';
import styles from '../asset/css/Delivery';
import popup_styles from '../asset/css/Popup';
import { getOrders, setRoute, deleteOrder, updateOrder } from '../actions/ordersActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useIsFocused } from '@react-navigation/native';
import isEmpty from '../validation/is-empty';
import axios from 'axios';
import messaging from '@react-native-firebase/messaging';
import Detail from './Detail';


const steps = ['Duyệt đơn', 'Nhận đơn', 'Đã đến điểm 1', 'Đã đến điểm 2', 'Hoàn thành đơn']

const findDetail = (orders, id) => {
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].id === id) {
            return i;
        }
    }
    return -1;
}

const computePrice = (order) => {
    if (!order || order === null) {
        return;
    }
    let v1 = order.giaHangHoa?parseInt(order.giaHangHoa):0;
    let v2 = order.giaVanChuyen?parseInt(order.giaVanChuyen):0;
    return v1+v2;
}

const typeMapper = (loaiDichVu) => {
    return (loaiDichVu?'Đón khách':'Chở hàng');
}

const OneDel = ({showPopup, setId, item, type, showDetail, updateOrder}) => {
    const fetchOrder = (type) => {
        if (type==='onship')
            return;
        showDetail(true);
        setId(item.id);
    }
    return (
        
        <TouchableOpacity style={{...styles[`noti_container${item.loaiDonHang}`], borderColor: `${item.loaiDonHang?'yellow':'green'}`}} onPress={()=>{fetchOrder(item.id, type)}}>
       
       <View style={styles.backgroundOverlay} />
       <Image source={require('../asset/images/icons8-drop-shipping-48.png')} style={styles.backgroundImage} />
          <View style={styles.info_box}>
                <View style = {styles.info_small_box}>
                    <Text style = {styles[`text_header${item.loaiDonHang}`]}>ID: </Text>
                    <Text style = {styles[`text_info${item.loaiDonHang}`]}>{item.id}</Text>
                </View>
                <View style= {styles.info_small_box}>
                    <Text style = {styles[`text_header${item.loaiDonHang}`]}>Loại dịch vụ: </Text>
                    <Text style = {styles[`text_info${item.loaiDonHang}`]}>{typeMapper(item?.loaiDonHang)}</Text>
                </View>
                <View style= {styles.info_small_box}>
                    <Text style = {styles[`text_header${item.loaiDonHang}`]}>Shipper: </Text>
                    <Text style = {styles[`text_info${item.loaiDonHang}`]}>{item?.soLuongHienTai}/{item?.soLuongShipper}</Text>
                </View>
            </View>
            <View style={styles.info_box}/>
            <View style={styles.info_box}>
                <Text style = {styles[`text_header${item.loaiDonHang}`]}>Địa chỉ 1: </Text>
                <Text style = {styles[`text_info${item.loaiDonHang}`]}>{item.diaChi_1?item.diaChi_1:"---"}</Text>
            </View>
            <View style={styles.info_box}>
                <Text style = {styles[`text_header${item.loaiDonHang}`]}>Địa chỉ 2: </Text>
                <Text style = {styles[`text_info${item.loaiDonHang}`]}>{item.diaChi_2?item.diaChi_2:"---"}</Text>
            </View>
            <View style={styles.info_box}>
                <View style = {styles.info_small_box}>
                    <Text style = {styles[`text_header${item.loaiDonHang}`]}>Khoảng cách (km): </Text>
                    <Text style = {styles[`text_info${item.loaiDonHang}`]}>{item.quangDuong?item.quangDuong:"---"}</Text>
                </View>
                <View style= {styles.info_small_box}>
                    <Text style = {styles[`text_header${item.loaiDonHang}`]}>Giá (VND): </Text>
                    <Text style = {styles[`text_info${item.loaiDonHang}`]}>{computePrice(item)}</Text>
                </View>
            </View>
  
            {type==='onship'?
                <View style={styles.button_box}>
                    <TouchableOpacity style={styles.next} onPress={()=> {updateOrder(item.id)}}>
                        <Text style={styles.button_text}>{steps[item.trangThai]}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.del} onPress={()=>{showPopup(true); setId(item.id)}}>
                        <Text style={styles.button_text}>Hủy đơn</Text>
                    </TouchableOpacity>
                </View>
           
                :<></>
            }
         
        </TouchableOpacity>
    )
}

const Delivery = ({ getOrders, deleteOrder, orders, type, navigation, setRoute, updateOrder}) => {
    const isFocused = useIsFocused();
    const [detail, showDetail] = useState(false);
    const [popup, showPopup] = useState(false);
    const [reason, setReason] = useState('');
    const [current_id, setId] = useState();

    const cancel = async () => {
        await axios.put(`http://14.241.39.50:5000/api/orders/${current_id}/cancel`, {reason: reason});
        deleteOrder(current_id);
        setReason('');
        showPopup(false);
    }

    useEffect(()=>{
        if (!orders.loading && orders.orders!==null && orders.orders.length === 0) {
            console.log("navigating");
            navigation.replace('Main');
        }
    }, [orders.orders])

    useEffect(()=>{
        setRoute('delivery');
        getOrders(type);
    }, []);

    
    return (
        <View style={styles.container}>
        {orders.loading?
            <Text style={styles.loading}>Đang tải dữ liệu</Text>
            :
            <FlatList
                data={orders.orders}
                renderItem={({item})=> (
                    <OneDel
                    item = {item}
                    type={type}
                    showPopup={showPopup}
                    popup={popup}
                    updateOrder={updateOrder}
                    showDetail={showDetail}
                    setId={setId}
                    navigation={navigation}/>
                )}
                keyExtractor={(item) => item.id.toString()}>
            </FlatList>
        }
        {popup?
        <View style = {popup_styles.overlay}>
            <View style={popup_styles.cancel_popup}>
                            <Text style={popup_styles.cancel_title}>Lý do hủy đơn</Text>
                            <TextInput style={popup_styles.cancel_reason}
                                        placeholder="Điền lý do ở đây"
                                        value={reason}
                                        onChangeText={text=>{setReason(text)}}
                                        placeholderTextColor='grey' ></TextInput>
                            <View style={popup_styles.button_box}>
                                <TouchableOpacity style={popup_styles.return} onPress={()=>{showPopup(false)}}>
                                    <Text style={popup_styles.button_text}>Quay lại</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={popup_styles.submit_reason} onPress={cancel}>
                                    <Text style={popup_styles.button_text}>Xác nhận</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
            </View>:<></>
        }
        {detail?<Detail show={detail} id={current_id} order={orders.orders[findDetail(orders.orders, current_id)]} showDetail={showDetail}/>:<></>}
        </View>
    )
}

Delivery.propTypes = {
    getOrders: PropTypes.func.isRequired,
    orders: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    orders: state.orders,
    type: state.orders.type
})

export default connect(mapStateToProps, {getOrders, deleteOrder, setRoute, updateOrder})(Delivery);