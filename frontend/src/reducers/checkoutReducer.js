import {actionType} from "../Helper";
import {cardMediaClasses} from "@mui/material";

const initialState = {
    orderList: [],
    totalPrice: 0,
    totalQuantity: 0,
    showBag: false,
    showUpdatedItem: false,
    errorMessage: null,
    successMessage: null,
    itemList: [],
    orderItems: [],
    singleOrder: null
}

export const checkoutReducer = (state = initialState, action) => {
    switch (action.type) {
        // check if order has already existed
        // based on productId, color, and size
        // not add order, yes add order quantity
        case actionType.ADD_ORDER:
            let addedOrderList = [...state.orderList]
            // console.log('add order', action?.payload)
            // console.log('current order list', addedOrderList)
            const addedIndex = addedOrderList?.findIndex(order => (
                order?.productId === action?.payload?.productId &&
                order?.colorId === action?.payload?.colorId &&
                order?.size === action?.payload?.size
            ))
            // console.log('index', addedIndex)
            if (addedIndex === -1) {
                addedOrderList = addedOrderList.concat(action?.payload)
            } else {
                addedOrderList[addedIndex].quantity += action?.payload.quantity
                addedOrderList[addedIndex].totalPrice += action?.payload.totalPrice
            }
            return {...state, orderList: addedOrderList}


        // find order based on productId, color, and size
        // remove it from the order list
        case actionType.REMOVE_ORDER:
            let removedOrderList = [...state.orderList]
            // console.log('remove order', action?.payload)
            // console.log('current order list', removedOrderList)
            const removedIndex = removedOrderList?.findIndex(order => (
                order?.productId === action?.payload?.productId &&
                order?.colorId === action?.payload?.colorId &&
                order?.size === action?.payload?.size
            ))
            // console.log('index', removedIndex)
            removedOrderList.splice(removedIndex, 1)

            return {...state, orderList: removedOrderList}


        // find order based productId, color, and size
        // update the order quantity
        case actionType.UPDATE_ORDER:
            console.log('update order', action?.payload)
            let combinedOrderList = [...state.orderList]
            console.log('order list before', combinedOrderList)

            // filter out the previous order
            combinedOrderList = combinedOrderList.filter(order => (
                order?.productId !== action?.payload?.singleOrder.productId ||
                order?.colorId !== action?.payload?.singleOrder.colorId ||
                order?.size !== action?.payload?.singleOrder.size
            ))

            console.log('order list after', combinedOrderList)


            // check if any same elements
            const combinedIndex = combinedOrderList?.findIndex(order => (
                order?.productId === action?.payload?.order.productId &&
                order?.colorId === action?.payload?.order.colorId &&
                order?.size === action?.payload?.order.size
            ))

            console.log('combine Index', combinedIndex)

            let combinedOrderList2 = [...combinedOrderList]


            if (combinedIndex === -1) {
            combinedOrderList2 = combinedOrderList.concat(action?.payload.order)
            }
            else {
                combinedOrderList2 = combinedOrderList.map((element, index) => {
                        if (index === combinedIndex) {
                            return {
                                ...element,
                                quantity: element.quantity + action?.payload.order.quantity,
                                totalPrice: element.totalPrice + action?.payload.order.totalPrice
                            }
                        } else {
                            return element
                        }
                    }
                )
            }

            console.log('combineOrderList finally', combinedOrderList2)

            return {...state, orderList: combinedOrderList2}

        case actionType.UPDATE_ORDER_QUANTITY:
            // console.log('order quantity', action?.payload)
            let updatedOrderList = [...state.orderList]
            const updatedIndex = updatedOrderList?.findIndex(order => (
                order?.productId === action?.payload?.productId &&
                order?.colorId === action?.payload?.colorId &&
                order?.size === action?.payload?.size
            ))
            updatedOrderList[updatedIndex].quantity = action?.payload?.quantity
            updatedOrderList[updatedIndex].totalPrice = action?.payload?.quantity * action?.payload?.price

            return {...state, orderList: updatedOrderList}

        // update based on the payload value (can be negative)
        case actionType.UPDATE_QUANTITY:
            let updateQuantity = state.totalQuantity
            return {...state, totalQuantity: updateQuantity + action?.payload}
        // update based on the payload value (can be negative)
        case actionType.UPDATE_PRICE:
            let updatePrice = state.totalPrice
            return {...state, totalPrice: updatePrice + action?.payload}
        case actionType.SHOW_ADD_BAG:
            // console.log('show bag')
            return {...state, showBag: action?.payload}

        case actionType.PAYMENT_SUCCESS:
            console.log('success message', action?.payload)
            return {...state, successMessage: action?.payload}
        case actionType.PAYMENT_FAILURE:
            // console.log('failure message', action?.payload)
            return {...state, errorMessage: action?.payload}
        case actionType.UPDATE_ITEM_LIST:
            // console.log('item list', action?.payload)
            return {...state, itemList: action?.payload}
        case actionType.UPDATE_ORDER_ITEMS:
            // console.log('order items', action?.payload)
            return {...state, orderItems: action?.payload}
        case actionType.ADD_SINGLE_ORDER:
            // console.log('single order', action?.payload)
            return {...state, singleOrder: action?.payload}
        case actionType.SHOW_UPDATE_ITEM:
            console.log('show update item', action?.payload)
            return {...state, showUpdatedItem: action?.payload}
        case actionType.EMPTY_SHOPPING_CART:
            console.log('Empty shopping cart', action?.payload)
            return {...state, orderList: [], totalPrice: 0, totalQuantity: 0}
        default:
            return state
    }
}
