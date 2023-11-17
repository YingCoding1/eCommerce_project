import {useDispatch, useSelector} from "react-redux";
import actions from "../actions";

export const OrderHistoryFilter = () => {

    const dispatch = useDispatch()

    const userInfo = useSelector(state => state.loginReducer.userData)

    return (
        <div className="orderHistory_MainContent_ProductHistory">
            <label htmlFor="Last 6 Months">
                <input type="radio"
                       name="orderFilter"
                       onChange={()=> {
                           dispatch(actions.paymentAction.fetchOrdersFromDatabase(2, userInfo.id))
                       }}
                /> Last 6 months
            </label>
            <label htmlFor="Last Year">
                <input type="radio"
                       name="orderFilter"
                       onChange={()=> {
                           dispatch(actions.paymentAction.fetchOrdersFromDatabase(3, userInfo.id))
                       }}
                /> Last Year
            </label>
            <label htmlFor="All Item">
                <input type="radio"
                       name="orderFilter"
                       onChange={()=> {
                           dispatch(actions.paymentAction.fetchOrdersFromDatabase(1, userInfo.id))
                       }}
                /> All Item
            </label>
        </div>
    )
}
