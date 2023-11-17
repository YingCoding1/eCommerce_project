import {actionType} from "../Helper";

const initialState = {
    shippingAddress: null,
    billingAddress: null,
    ordersDatabase: []
}

export const paymentReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionType.ADD_SHIPPING_INFORMATION:
            // console.log('shipping', action?.payload)
            return {...state, shippingAddress: action?.payload}

        case actionType.ADD_BILLING_INFORMATION:
            // console.log('billing', action?.payload)
            return {...state, billingAddress: action?.payload}

        case actionType.FETCH_ORDER_FROM_DATABASE:
            console.log('orders from database', action?.payload)
            return {...state, ordersDatabase: action?.payload}

        default:
            return state
    }
}