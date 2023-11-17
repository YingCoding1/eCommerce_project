import {actionType, getPaymentToken, getToken, myKey, PaymentURL} from "../Helper";
import axios from "axios";
import {store} from "../store";

// add order
const addOrder = order => ({
    type: actionType.ADD_ORDER,
    payload: order
})

// remove order
const removeOrder = order => ({
    type: actionType.REMOVE_ORDER,
    payload: order
})

// update order quantity
const updateOrderQuantity = order => ({
    type: actionType.UPDATE_ORDER_QUANTITY,
    payload: order
})

const updateOrder = combineOrders => ({
    type: actionType.UPDATE_ORDER,
    payload: combineOrders
})

// update totalPrice
const updatePrice = price => ({
    type: actionType.UPDATE_PRICE,
    payload: price
})

// update quantity
const updateQuantity = quantity => ({
    type: actionType.UPDATE_QUANTITY,
    payload: quantity
})

// show add bag
const updateShowBag = isShow => ({
    type: actionType.SHOW_ADD_BAG,
    payload: isShow
})

// show update item
const showUpdatedItem = isShow => ({
    type: actionType.SHOW_UPDATE_ITEM,
    payload: isShow
})

const updateItemList = itemList => ({
    type: actionType.UPDATE_ITEM_LIST,
    payload: itemList
})

const updateOrderItems = orderItems => ({
    type: actionType.UPDATE_ORDER_ITEMS,
    payload: orderItems
})

const addSingleOrder = singleOrder => ({
    type: actionType.ADD_SINGLE_ORDER,
    payload: singleOrder
})

const emptyShoppingCart = () => ({
    type: actionType.EMPTY_SHOPPING_CART
})

const PaymentSuccess = () => async dispatch => {

    const state = {...store.getState()}
    const {checkoutReducer: {orderList}} = state
    console.log(orderList)
    const orderItems = orderList.map(order => ({
        quantity: order.quantity,
        productId: order.productId,
        colorId: order.colorId,
        size: order.size
    }))

    let data = {
        "taxRate": 1.13,
        "isActive": true,
        "isDelete": false,
        "orderItems": orderItems
    }

    const jsonData = JSON.stringify(data)

    let token = getPaymentToken()
    console.log('tokenPayment', token)

    try {
        let res = await axios({
                method: 'post',
                url: `${PaymentURL}?mykey=${myKey}`,
                headers: {
                    'authorization': `bear ${token}`,
                    'Content-Type': 'application/json'
                },
                // params: {
                //     mykey: myKey
                // },
                data: jsonData
            }
        )
        dispatch({
            type: actionType.PAYMENT_SUCCESS,
            payload: res.status
        })
        dispatch(emptyShoppingCart())
        console.log(res)
    } catch (error) {
        console.log('place order', error.response.data.message)
        console.log('place order', error.response.status)
        dispatch({
            type: actionType.PAYMENT_FAILURE,
            payload: error.response.status
        })
    }
}

export default {
    addOrder,
    removeOrder,
    updateOrder,
    updatePrice,
    updateQuantity,
    updateShowBag,
    PaymentSuccess,
    updateOrderQuantity,
    updateItemList,
    updateOrderItems,
    addSingleOrder,
    showUpdatedItem,
    emptyShoppingCart
}
