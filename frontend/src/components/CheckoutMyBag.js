import {CheckoutMyBagCard} from "./CheckoutMyBagCard";
import "../styles/CheckoutMyBag.scss"
import {OrderData} from "../ItemData";
import {useSelector} from "react-redux";
import {useEffect} from "react";

export const CheckoutMyBag = () => {
    // const order = OrderData

    const orderList = useSelector(state => state?.checkoutReducer?.orderList)
    const totalQuantity = useSelector(state => state?.checkoutReducer?.totalQuantity)
    const totalPrice = useSelector(state => state.checkoutReducer?.totalPrice)

    // console.log('checkout my bag order', orderList)

    return (
        <div className="checkoutMyBag_Container">
            {/*CHANGE BY EASON*/}
            <div className="checkoutMyBag_Container_SummaryTop">
                <h1 className="checkoutMyBag_Container_MyBagsResponsive">My Bags({totalQuantity} items)</h1>
                <div className="checkoutMyBag_Container_TotalPrice">${totalPrice}.00</div>
            </div>
            <div className="OrderSummary_ShipTo_Responsive">
                <div className="OrderSummary_ShipTo_Responsive_ShipLocation">
                    {/*//changebyEason*/}
                    Ship to <h1>Ottawa, ON</h1>
                    <div className="OrderSummary_ShipTo_Responsive_ArriveTime">Arrives by Thu, Sep 29 with free
                        shipping
                    </div>
                </div>
            </div>
            <h1 className="checkoutMyBag_Container_MyBags">My Bags({totalQuantity} items)</h1>
            {
                orderList && orderList?.map((element, index) =>
                    <CheckoutMyBagCard key={index} product={element}/>
                )}
        </div>
    )
}



