import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import orderReducer from "./orderReducer";
import notiReducer from "./notiReducer";
import globalReducer from "./globalReducer";

export default combineReducers({
    global: globalReducer,
    auth: authReducer,
    orders: orderReducer,
    noti: notiReducer,
    errors: errorReducer,
});