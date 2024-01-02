import { GET_ORDERS_COUNT, GET_ORDERS, ORDERS_LOADING, 
    SET_TYPE, SET_ROUTE,
    AFTER_ACCEPT_ORDER, 
    DELETE_ORDER, NEW_ORDER_COUNT, NEW_ORDER, UPDATE_ORDER, GET_ERRORS, GET_ORDER_UPDATE, AFTER_UPDATE_PRICE} from "../actions/types";

const initialState = {
    orders_count: null,
    orders: null,
    loading: true,
    route: '',
    type: null,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_ORDERS_COUNT:
            return {
                ...state,
                orders_count: action.payload,
                loading: false
            }
        case GET_ORDERS:
            console.log(action.payload);
            if (action.payload[0]?.nhanviens) {
                console.log("True")
                return {
                    ...state,
                    orders: action.payload.map(ord => ({...ord, trangThai: ord.nhanviens[0]?.shipper_donhang?.trangThai})),
                    loading: false
            } }
            else {
                console.log("False")
                return {
                    ...state,
                    orders: action.payload,
                    loading:false 
                }
            }
            
        case NEW_ORDER_COUNT: 
            return {
                ...state,
                orders_count: { ...state.orders_count, 
                    on_wait_count: state.orders_count.on_wait_count + action.payload }
            }
        case SET_ROUTE: 
            return {
                ...state,
                route: action.payload,
            }
        case NEW_ORDER:
            return {
                ...state,
                orders: [...state.orders, action.payload]
            }
        case ORDERS_LOADING:
            return {...state,
                loading: true
            }
        case SET_TYPE:
            return {
                ...state,
                type: action.payload,
            }
        case AFTER_ACCEPT_ORDER:
            console.log("Working");
            return {
                ...state,
                orders: state.orders.filter(order => order.id!==action.payload)
            }
        case DELETE_ORDER:
            return {
                ...state,
                orders: state.orders.filter(order=> JSON.stringify(order.id)!==JSON.stringify(action.payload))
            }
        case UPDATE_ORDER:
            console.log(action.payload);
            return {
                ...state,
                orders: state.orders.map(order=> {
                    if (order.id === action.payload) {
                        return {...order, trangThai: order.trangThai+1}
                    }
                    return order;
                }).filter(order => order.trangThai!==5)
            }
        case GET_ORDER_UPDATE:
            return {
                ...state,
                orders: state.orders.map(order => {
                    if (order.id === action.payload.id) {
                        return action.payload
                    }
                    return order;
                })
            }
        case AFTER_UPDATE_PRICE:
            console.log(action.payload.product);
            return {
                ...state,
                orders: state.orders.map(order=>{
                    if (order.id===action.payload.id) {
                        return {
                            ...order,
                            giaHangHoa: action.payload.price,
                            hangHoa: action.payload.product
                        }
                    }
                    return order
                })
            }
        default:
            return state;
    }
}