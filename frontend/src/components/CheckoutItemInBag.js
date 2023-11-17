import "../styles/CheckoutItemInBag.scss";
import ExitMenuIcon from "../headerSvgIcons/ExitMenuIcon.svg"
import {useDispatch, useSelector} from "react-redux";
import actions from "../actions";
import {Link} from "react-router-dom";

export const CheckoutItemInBag = () => {

    const orderList = useSelector(state => state?.checkoutReducer?.orderList)
    const totalQuantity = useSelector(state => state?.checkoutReducer?.totalQuantity)
    const totalPrice = useSelector(state => state?.checkoutReducer?.totalPrice)
    const dispatch = useDispatch()

    // console.log('orderList item in my bag', orderList)

    return (
        <>
            { (totalPrice > 0) &&
                <div className="body">
                    <div className="Bridge"></div>
                    <div className="CheckoutItemInBag">
                        <div className="CheckoutItemInBag_Title">
                            <p>Items in Your Bag</p>
                        </div>
                        <div className="CheckoutItemInBag_Items">
                            {orderList && orderList.map((order, index) =>
                                <div className="CheckoutItemInBag_Items_Product" key={index}>
                                    <div className="CheckoutItemInBag_Items_Product_Left">
                                        <img src={order.imageList[0]} alt="" width="100px"/>
                                    </div>
                                    <div className="CheckoutItemInBag_Items_Product_Right">
                                        <div className="CheckoutItemInBag_Items_Product_Right_Name">
                                            <p>{order.productName}</p>
                                            <img src={ExitMenuIcon} alt=""
                                                 onClick={() => {
                                                     dispatch(actions.checkoutAction.removeOrder(order))
                                                     dispatch(actions.checkoutAction.updateQuantity(-order.quantity))
                                                     dispatch(actions.checkoutAction.updatePrice(-order.totalPrice))
                                                 }}
                                            />
                                        </div>
                                        <div className="CheckoutItemInBag_Items_Product_Right_Color">
                                            {order.colorName}
                                        </div>
                                        <div className="CheckoutItemInBag_Items_Product_Right_Size">
                                            Size {order.size}
                                        </div>
                                        <div className="CheckoutItemInBag_Items_Product_Right_QuantityAndPrice">
                                            <div>Quantity {order.quantity}</div>
                                            <div>${order.totalPrice.toFixed(2)}</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="CheckoutItemInBag_Costs">
                            <div className="CheckoutItemInBag_Costs_SubTotal">
                                <div className="CheckoutItemInBag_Costs_SubTotal_Left">
                                    <h3>Subtotal</h3>
                                    { (totalQuantity <= 1) ? <p>( {totalQuantity} item)</p> : <p>( {totalQuantity} items)</p>}
                                </div>
                                <div className="CheckoutItemInBag_Costs_SubTotal_Right"><h3>${totalPrice.toFixed(2)}</h3>
                                </div>
                            </div>
                            <div className="CheckoutItemInBag_Costs_Shipping">
                                <h3>Shipping</h3>
                                <h3>Free</h3>
                            </div>
                            <div className="CheckoutItemInBag_Costs_Container">
                                <Link className="CheckoutItemInBag_Costs_Container_Button" to={`/Checkout`}>
                                    <h2>VIEW BAG & CHECKOUT</h2>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
