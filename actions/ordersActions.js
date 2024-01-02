import axios from 'axios';
import { GET_ERRORS,
    GET_ORDERS_COUNT,
    GET_ORDERS,
    ORDERS_LOADING, 
    SET_TYPE,
    AFTER_ACCEPT_ORDER,
    DELETE_ORDER, 
    SET_ROUTE, 
    NEW_ORDER_COUNT,
    NEW_ORDER, UPDATE_ORDER, GET_ORDER_UPDATE, AFTER_UPDATE_PRICE} from './types'

// Get all wait orders of current user
export const getOrdersCount = () => async dispatch => {
    await dispatch({
        type: ORDERS_LOADING,
    })
    try {
        const res = await axios.get('http://14.241.39.50:5000/api/orders/home');
        dispatch({
            type: GET_ORDERS_COUNT,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GET_ORDERS_COUNT,
            payload: {
                on_wait: 0,
                on_ship: 0
            }
        })
    }
}

// GET đơn hàng
export const getOrders = (type) => async dispatch => {
    await dispatch({
        type: ORDERS_LOADING
    })
    try {
        const res = await axios.get(`http://14.241.39.50:5000/api/orders/${type}`);
        dispatch({
            type: GET_ORDERS,
            payload: res.data
        })
    } catch (err) {
        console.log(err);
        dispatch({
            type: GET_ORDERS,
            payload: {}
        })
    }
}

export const setType = (type) => dispatch => {
    dispatch({
        type: SET_TYPE,
        payload: type,
    })
}

export const afterAcceptOrder = (id) => dispatch => {
    dispatch({
        type: AFTER_ACCEPT_ORDER,
        payload: id
    })
}

export const deleteOrder = (id) => async dispatch => {
    console.log("Deleting: ", id);
    dispatch({
        type: DELETE_ORDER,
        payload: id
    })
}

export const newOrder = (id) => async dispatch => {
    try {
        const res = await axios.get(`http://14.241.39.50:5000/api/orders/${id}`);
        await dispatch({
            type: NEW_ORDER,
            payload: res.data,
        })
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
        })
    }
}

export const setRoute = (route) => async dispatch => {
    console.log("Setting: ", route);
    await dispatch({
        type: SET_ROUTE,
        payload: route
    })
}

export const newOrderCount = (change) => dispatch => {
    dispatch({
        type: NEW_ORDER_COUNT,
        payload: change
    })
}

export const updateOrder = (id) => async dispatch => {
    try {
        const res = await axios.put(`http://14.241.39.50:5000/api/orders/${id}/update`);
        if (res.status === 200) {
            dispatch({
                type: UPDATE_ORDER,
                payload: id
            })
        }
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}


export const getOrderUpdate = (id) => async dispatch => {
    try {
        console.log(id);
        const res = await axios.get(`http://14.241.39.50:5000/api/orders/${id}`);
        await dispatch({
            type: GET_ORDER_UPDATE,
            payload: res.data,
        })
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
        })
    }
}

export const middlewares = (datas) => {
    var res = [];
    datas.forEach(data => {
        res.push(middleware(data));
    });
    return res;
}

export const middleware = (data) => {
    let r = data;
    const loaiDonHang = parseInt(data.loaiDonHang);
    if (loaiDonHang===0) {
        r.loaiDonHang='Giao hàng';
    } else if (loaiDonHang === 1) {
        r.loaiDonHang='Chở khách';
    }
    if (data.nhanviens[0].shipper_donhang.trangThai) {
        const trangThai = parseInt(data.nhanviens[0].shipper_donhang.trangThai);
        switch (trangThai) {
            case 0:
                r.trangThai='Chờ xác nhận';
                break;
            case 1:
                r.trangThai='Tìm shipper';
                break;
            case 2:
                if (loaiDonHang === 0) {
                    r.trangThai='Đang lấy hàng';
                } else if (loaiDonHang === 1) {
                    r.trangThai='Đang đón khách';
                }
                break;
            case 3:
                if (loaiDonHang === 0) {
                    r.trangThai='Đang giao';
                } else if (loaiDonHang === 1) {
                    r.trangThai='Đang chở khách';
                }
                break;
            case 4:
                r.trangThai='Đã hoàn tất';
                break;
            case 5:
                r.trangThai='Đã bị hủy';
                break;
            default:
                r.trangThai=r.trangThai;
        }
    }
    return r;
}

export const afterUpdatePrice = (id, price, product) => async dispatch => {
    await dispatch({
        type: AFTER_UPDATE_PRICE,
        payload: {id, price, product}
    })
}