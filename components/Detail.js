import React, { useEffect, useState } from 'react';
import {View, Text, TouchableOpacity, Alert, Image, StyleSheet, TextInput, Keyboard} from 'react-native';
import detail_styles from '../asset/css/Detail';
import { connect } from 'react-redux';
import { afterAcceptOrder, afterUpdatePrice } from '../actions/ordersActions';
import axios from 'axios';
import isEmpty from '../validation/is-empty';
import call from 'react-native-phone-call'

const states = ['','','Đã có shipper', 'Đã đến điểm 1', 'Đã đến điểm 2', 'Hoàn thành'];


const Detail = ({order, id, showDetail, afterAcceptOrder, type, afterUpdatePrice, show}) => {
    const [currentPrice, setPrice] = useState(JSON.stringify(order?.giaHangHoa?order?.giaHangHoa:0));
    const [color, setColor] = useState({});
    const [keyboard, setKeyboard] = useState(false);
    const [product, setProduct] = useState(order?.hangHoa);

    useEffect(()=> {
        if (isEmpty(order)) {
            showDetail(false);
        }
    }, [order])

    useEffect(()=>{
        setPrice(order?.giaHangHoa?order?.giaHangHoa:0);
        setProduct(order?.hangHoa)
    }, [show]);

    const findColor = (loai) => {
        if (loai===1) {
            return { bg: 'rgba(255,198,0,0.3)', color: '#ffc600'}
        } else {
            return { bg: '#9ffab2', color: '#12a431'}
        }
    }

    useEffect(()=>{
        setColor(findColor(order.loaiDonHang));
        const show_listener = Keyboard.addListener('keyboardDidShow', ()=>{setKeyboard(true)});
        const hide_listener = Keyboard.addListener('keyboardDidHide', ()=>{setKeyboard(false)});

        return ()=>{show_listener.remove(); hide_listener.remove()}
    }, [])

    const handleCall = async (phoneNumber) => {
        const args = {
            number: phoneNumber,
            prompt: true,
        }
        call(args).catch(console.error);
    };

    const computePrice = () => {
        if (!order || order === null) {
            return;
        }
        let v1 = order.giaHangHoa?parseInt(order.giaHangHoa):0;
        let v2 = order.giaVanChuyen?parseInt(order.giaVanChuyen):0;
        return v1+v2;
    }

    const accept = async (id) => {
        Alert.alert(
            'Xác nhận',
            'Bạn có chắc muốn nhận đơn này?',
            [
                {
                    text: "Quay lại",
                    style: 'cancel',
                },
                {
                    text: 'Xác nhận',
                    onPress: async () => {
                        try {
                                const res = await axios.put(`http://14.241.39.50:5000/api/orders/${id}/accept`);
                                if (res.status === 200) {
                                    afterAcceptOrder(id);
                                    showDetail(false);
                                }
                            } catch (err) {
                                console.log(err);
                                console.log(err.response);
                            }
                    }
                }
            ],
            { cancelable: false}
        )
    }

    const priceHandler = async (kind) => {
        Alert.alert(
            'Xác nhận',
            'Chắc chắn thay đổi này chứ?',
            [
                {
                    text: "Quay lại",
                    style: 'cancel',
                },
                {
                    text: 'Xác nhận',
                    onPress: async () => {
                        try {
                            const res = await axios.put(`http://14.241.39.50:5000/api/orders/${id}/price`, {
                                giaHangHoa: currentPrice,
                                hangHoa: product
                            });
                            if (res.status === 200) {
                                await afterUpdatePrice(id, currentPrice, product);
                            }
                        } catch (err) {
                            console.log(err);
                            console.log(err.response);
                        }
                    }
                }
            ],
            { cancelable: false}
        )
    }

    const typeMapper = (loaiDichVu) => {
        return (loaiDichVu?'Đón khách':'Chở hàng');
    }

    return (
        <View style = {detail_styles.container}>
            <View style={detail_styles.box}>
                <View style={{...detail_styles.header, backgroundColor: color.bg}}>
                    <View style={detail_styles.info_box}>
                        <Text style={detail_styles.title}>ID: </Text>
                        <Text style={detail_styles.content}>{order?.id}</Text>
                    </View>
                    <View style={detail_styles.info_box}>
                        <Text style={detail_styles.title}>Loại dịch vụ: </Text>
                        <Text style={detail_styles.content}>{typeMapper(order?.loaiDonHang)}</Text>
                    </View>
                </View>
                <View style={detail_styles.body}>
                    {!keyboard && <>
                        <View style={detail_styles.info_box}>
                            <Text style={detail_styles.title}>{typeMapper(order?.loaiDonHang)==='Đón khách'?'SĐT khách: ':'SĐT cửa hàng: '}</Text>
                            {type==='onship'?
                            <TouchableOpacity style={detail_styles.phone} onPress={()=>handleCall(`${order.sdt_1}`)}>
                                <Text style={{...detail_styles.content, maxWidth: '100%'}}>{(order?.sdt_1?order?.sdt_1:"---")}</Text>
                            </TouchableOpacity>:
                            <Text style={detail_styles.content}>{(order?.sdt_1?order?.sdt_1:"---")}</Text>}
                        </View>

                        <View style={detail_styles.info_box}>
                            <Text style={detail_styles.title}>{typeMapper(order?.loaiDonHang)==='Đón khách'?'Điểm đón: ':'Đ/C cửa hàng: '}</Text>
                            <Text style={detail_styles.content}>{(order?.diaChi_1?order?.diaChi_1:"---")}</Text>
                        </View>

                        <View style={detail_styles.spacer}/>

                        {typeMapper(order?.loaiDonHang)==="Đón khách"?<></>:
                            <View style={detail_styles.info_box}>
                                <Text style={detail_styles.title}>SĐT khách: </Text>
                                {type==='onship'?
                                    <TouchableOpacity style={detail_styles.phone} onPress={()=>handleCall(`${order.sdt_2}`)}>
                                        <Text style={{...detail_styles.content, maxWidth: '100%'}}>{(order?.sdt_2?order?.sdt_2:"---")}</Text>
                                    </TouchableOpacity>:
                                    <Text style={detail_styles.content}>{(order?.sdt_2?order?.sdt_2:"---")}</Text>}
                            </View>
                        }
                        
                        <View style={detail_styles.info_box}>
                            <Text style={detail_styles.title}>{typeMapper(order?.loaiDonHang)==='Chở khách'?'Điểm đến: ':'Đ/C giao: '}</Text>
                            <Text style={detail_styles.content}>{(order?.diaChi_2?order?.diaChi_2:"---")}</Text>
                        </View>
                    </>}
                    {
                        typeMapper(order?.loaiDonHang) !== 'Đón khách' && 
                        <View style={detail_styles.info_box}>
                            <Text style={detail_styles.title}>Hàng hóa: </Text>
                            <TextInput style={detail_styles.content} value={product}
                            onChangeText={(text)=>setProduct(text)}
                            onSubmitEditing={()=>priceHandler('product')}
                            />
                        </View>
                    }
                </View>
                <View style={{...detail_styles.footer, backgroundColor: color.bg}}>
                    <View style={detail_styles.row}>
                        <View style={detail_styles.info_box}>
                            <Text style={detail_styles.title}>Giá hàng hóa: </Text>
                            {
                                type==='onship' && typeMapper(order.loaiDonHang)!=='Đón khách'?<>
                                    <TextInput style={{...detail_styles.content, maxWidth: '95%'}} value={`${currentPrice}`}
                                    onSubmitEditing={()=>priceHandler('price')}
                                    onChangeText={text=>{setPrice(text)}}/>
                                    <Text style={detail_styles.content}>k</Text>
                                </>:
                                <Text style={detail_styles.content}>{order?.giaHangHoa?order.giaHangHoa:"---"}k</Text>
                            }
                        </View>
                        <View style={detail_styles.info_box}>
                            <Text style={detail_styles.title}>Giá vận chuyển: </Text>
                            <Text style={detail_styles.content}>{order?.giaVanChuyen?`${order.giaVanChuyen}k`:"---"}</Text>
                        </View>
                    </View>
                    <View style={{...detail_styles.line, backgroundColor: color.color}}/>
                    <View style={detail_styles.row}>
                        <View style={detail_styles.info_box}>
                            <Text style={detail_styles.title}>Khoảng cách: </Text>
                            <Text style={{...detail_styles.distance, backgroundColor: color.color}}>{order?.quangDuong?order?.quangDuong:"---"}</Text>
                        </View>
                        <View style={detail_styles.info_box}>
                            <Text style={detail_styles.title}>Giá ước tính: </Text>
                            <Text style={{...detail_styles.price, backgroundColor: color.color}}>{computePrice()}k</Text>
                        </View>
                    </View>
                    <View style={{...detail_styles.row, justifyContent: 'center'}}>
                        <View style={detail_styles.info_box}>
                            <Text style={detail_styles.title}>Shipper: </Text>
                            <Text style={{...detail_styles.distance, backgroundColor: color.color}}>{order?.soLuongHienTai}/{order?.soLuongShipper}</Text>
                        </View>
                        {
                            type!=='onwait' && <View style={detail_styles.info_box}>
                            <Text style={detail_styles.title}>Trạng thái: </Text>
                            <Text style={{...detail_styles.distance, backgroundColor: color.color}}>{order?.trangThai?states[parseInt(order?.trangThai)]:"---"}</Text>
                        </View>
                        }
                    </View>
                </View>
            </View>
            <View style={detail_styles.button_box}>
                {
                    !keyboard && <TouchableOpacity style={detail_styles.return} onPress={()=> {showDetail(false)}}>
                        <Text style={detail_styles.button_text}>Quay lại</Text>
                    </TouchableOpacity>
                }
                
                {type==='onwait'?<TouchableOpacity style={detail_styles.accept} onPress={()=>{
                    accept(id)
                }}>
                    <Text style={detail_styles.button_text}>Nhận đơn</Text>
                </TouchableOpacity>:<></>}
            </View>
        </View>
    )
}

const mapStateToProps = (state) => ({
    type: state.orders.type,
})

export default connect(mapStateToProps,{ afterAcceptOrder, afterUpdatePrice })(Detail);