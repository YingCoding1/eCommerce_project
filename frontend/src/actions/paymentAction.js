import {actionType} from "../Helper";
import axios from "axios";



// add shipping information
const addShippingInformation = shippingInformation => ({
    type: actionType.ADD_SHIPPING_INFORMATION,
    payload: shippingInformation
})

// add billing information
const addBillingInformation = billingInformation => ({
    type: actionType.ADD_BILLING_INFORMATION,
    payload: billingInformation
})

// fetch orders from database
const fetchOrdersFromDatabase = (filterId, userId) => async dispatch => {
    try {
        let res = await axios({
            method: 'get',
            url: `/order`,
            params: {
                filterIndex: filterId,
                userIndex: userId
            }
        })
        const {data: {data}} = await res
        console.log(data)

        dispatch({
            type: actionType.FETCH_ORDER_FROM_DATABASE,
            payload: data
        })

    } catch (e) {
        console.log('error: ', e)
    }
}

export default {
    addShippingInformation,
    fetchOrdersFromDatabase,
    addBillingInformation
}