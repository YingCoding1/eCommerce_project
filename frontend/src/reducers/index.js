import {combineReducers} from "redux";
import {productReducer} from "./productReducer";
import {checkoutReducer} from "./checkoutReducer";
import {loginReducer} from "./loginReducer";
import {paymentReducer} from "./paymentReducer";

export default combineReducers(
    {
        productReducer,
        checkoutReducer,
        loginReducer,
        paymentReducer
    }
)
