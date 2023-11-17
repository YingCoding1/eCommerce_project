import "../styles/OrderConfirmation.scss"
import {OrderSummary} from "./OrderSummary";
import {CheckoutHeader} from "./CheckoutHeader"
import {CheckoutFooter} from "./CheckoutFooter"
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

export const OrderConfirmation = () => {

    let navigate = useNavigate()

    let Shipping = useSelector(state => state?.paymentReducer.shippingAddress)

    let Billing = useSelector(state => state?.paymentReducer.billingAddress)

    console.log("shipping", Shipping)
    console.log("billing", Billing)

    return (
        <>
            <div className="OrderConfirmation">
                <CheckoutHeader/>
                <div className="OrderConfirmation_Title">
                    Order Confirmation
                </div>
                <div className="OrderConfirmation_Content">
                    <div className="OrderConfirmation_Content_OrderDetails">
                        {/*<div className="OrderConfirmation_Content_OrderDetails_Review">*/}
                        {/*    <p className="OrderConfirmation_Content_OrderDetails_Review_Title">Review and place*/}
                        {/*        order</p>*/}
                        {/*    <p className="OrderConfirmation_Content_OrderDetails_Review_Text">You will go to the final*/}
                        {/*        step of payment process when you click "GO TO NEXT STEP".</p>*/}
                        {/*</div>*/}
                        {/*<div className="OrderConfirmation_Content_OrderDetails_Email">*/}
                        {/*    <p className="OrderConfirmation_Content_OrderDetails_Email_Title">Email address</p>*/}
                        {/*    <div className="CustomerInfo">*/}
                        {/*        <p className="OrderConfirmation_Content_OrderDetails_Email_Text">*/}
                        {/*            {Shipping.email}*/}
                        {/*        </p>*/}
                        {/*        /!*email address*!/*/}
                        {/*        <div className="EditButton">Change</div>*/}
                        {/*        /!*edit button*!/*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <div className="OrderConfirmation_Content_OrderDetails_Address">
                            <p className="OrderConfirmation_Content_OrderDetails_Address_Title">Shipping address</p>
                            <div className="CustomerInfo">
                                <div>
                                    <p className="OrderConfirmation_Content_OrderDetails_Address_Text">{Shipping.firstname} {Shipping.lastname}</p>
                                    <p className="OrderConfirmation_Content_OrderDetails_Address_Text">{Shipping.address}</p>
                                    <p className="OrderConfirmation_Content_OrderDetails_Address_Text">{Shipping.city} {Shipping.province}</p>
                                    <p className="OrderConfirmation_Content_OrderDetails_Address_Text">{Shipping.postalCode}</p>
                                    <p className="OrderConfirmation_Content_OrderDetails_Address_Text">{Shipping.phoneNumber}</p>
                                </div>
                                {/*shipping address*/}
                                <div className="EditButton" onClick={() => {
                                    navigate('/checkout/shipping')
                                }}>Change
                                </div>
                                {/*edit button*/}
                            </div>
                        </div>
                        <div className="OrderConfirmation_Content_OrderDetails_Address">
                            <p className="OrderConfirmation_Content_OrderDetails_Address_Title">Billing address</p>
                            <div className="CustomerInfo">
                                <div>
                                    <p className="OrderConfirmation_Content_OrderDetails_Address_Text">{Billing.firstname} {Billing.lastname}</p>
                                    <p className="OrderConfirmation_Content_OrderDetails_Address_Text">{Billing.address}</p>
                                    <p className="OrderConfirmation_Content_OrderDetails_Address_Text">{Billing.city} {Billing.province}</p>
                                    <p className="OrderConfirmation_Content_OrderDetails_Address_Text">{Billing.postalCode}</p>
                                    <p className="OrderConfirmation_Content_OrderDetails_Address_Text">{Billing.phoneNumber}</p>
                                </div>
                                {/*shipping address*/}
                                <div className="EditButton" onClick={() => {
                                    navigate('/checkout/billing')
                                }}>Change
                                </div>
                                {/*edit button*/}
                            </div>
                        </div>
                        <div className="OrderConfirmation_Content_OrderDetails_ConfirmOrder">
                            <div className="OrderConfirmation_Content_OrderDetails_ConfirmOrder_Button"
                                 onClick={() => {
                                     navigate("/checkout/payment")
                                 }}
                            >
                                GO TO NEXT STEP
                            </div>
                        </div>
                    </div>
                    <OrderSummary/>
                </div>
                <CheckoutFooter/>
            </div>
        </>
    )
}
