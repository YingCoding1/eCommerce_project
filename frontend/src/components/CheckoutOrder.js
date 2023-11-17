import "../styles/CheckoutOrder.scss"
import {Payment} from "./Payment";
import {useSelector} from "react-redux";
import {getToken, taxRate} from "../Helper";
import {useEffect, useState} from "react";
import afterpayLogo from "../headerSvgIcons/svgexport-afterpay.svg";
import WhiteLogo from "../headerSvgIcons/WhiteLogo.svg";
import dropdownIcon from "../headerSvgIcons/dropdownIcon.svg";
import iIcon from "../headerSvgIcons/iIcon.svg";
import React from "react";
import {isExpired, useJwt} from "react-jwt";
import paypalText from "../headerSvgIcons/paypal.svg"
import paypalLogo from "../headerSvgIcons/paypal_logo.svg"
import {useNavigate} from "react-router-dom";
import Modal from "@mui/material/Modal";

export const CheckoutOrder = () => {

    const [isShow, setIsShow] = useState(false)
    const handleClose = () => {
        setIsShow(false)
    }

    let totalPrice = useSelector(state => state.checkoutReducer.totalPrice)
    let orderList = useSelector(state => state.checkoutReducer.orderList)

    let navigate = useNavigate()

    const itemList = orderList.map(order => ({
        name: order.productName,
        description: `${order.colorName} ${order.size}`,
        quantity: order.quantity,
        price: order.price,
        tax: order.price * taxRate,
        sku: order.productId,
        currency: 'CAD'
    }))

    const orderItems = orderList.map(order => ({
        quantity: order.quantity,
        productId: order.productId,
        colorId: order.colorId,
        size: order.size
    }))

    const amount = {
        total: (totalPrice + totalPrice * taxRate).toFixed(2),
        currency: 'CAD',
        details: {
            subtotal: totalPrice.toFixed(2),
            tax: (totalPrice * taxRate).toFixed(2),
        }
    }

    const isMyTokenExpired = isExpired(getToken())

    console.log(isMyTokenExpired)

    const date = new Date(new Date().getTime() + (3 * 24 * 60 * 60 * 1000))

    const options = {
        weekday: 'short',
        month: 'long',
        day: 'numeric',
    };

    return (
        <div className="OrderSummary">
            <h2>Order Summary</h2>
            <div className="OrderSummary-Details">
                <div className="OrderSummary-Details-Subtotal">
                    <div>Subtotal</div>
                    <div>$ {totalPrice.toFixed(2)}</div>
                </div>
                <hr/>
                <div className="OrderSummary-Details-Shipping">
                    <div>Shipping</div>
                    <div>FREE</div>
                </div>
                <hr/>
                <div className="OrderSummary-Details-Tax">
                    <div>Tax</div>
                    <div>Calculated at checkout</div>
                </div>
                <hr/>
                <div className="OrderSummary-Details-Total">
                    <div>Estimated Total
                        <br/>
                    </div>
                    <div>CAD ${totalPrice.toFixed(2)}</div>
                </div>
                <div id="AfterPay">or 4 payments of ${(totalPrice / 4).toFixed(2)} with
                    <img src={afterpayLogo} alt="" className="AfterPay_Logo"/> <img src={iIcon} alt=""
                                                                                    className="AfterPay_iIcon"/>
                </div>
                <div className="OrderSummary-Btn">
                    <button className="OrderSummary-Btn-Red"
                            onClick={() => {
                                isMyTokenExpired ? setIsShow(true) : navigate('/checkout/shipping')
                            }}
                    >
                        CHECKOUT
                    </button>
                    <div className="OrderSummary-Btn-Text">
                        or checkout quickly with
                    </div>
                    <div className="OrderSummary-Btn-Blue">
                        {isMyTokenExpired ?
                            <div className="paypal_expired"
                                 onClick={() => {
                                     setIsShow(true)
                                 }}
                            >
                                <img className="paypal_expired_Logo" src={paypalLogo} alt=""/>
                                <img className="paypal_expired_Text" src={paypalText} alt=""/>
                            </div>
                            :
                            <Payment
                                itemList={itemList}
                                amount={amount}
                            />
                        }
                    </div>
                </div>
                <div className="OrderSummary-ShipTo">
                    <p>Ship to <span>Ottawa, ON</span>
                        <br/>Arrives by {date.toLocaleString('en-US', options)} with free shipping</p>
                </div>
            </div>
            <Modal
                open={isShow}
                onClose={handleClose}
            >
                <form className="LoginModalForm">
                    <div>
                        <div
                            className="LoginModalForm_Close"
                            onClick={handleClose}
                        >X
                        </div>
                        <div
                            className="LoginModalForm_Text"
                        >You Must Be Logged In To Checkout
                        </div>
                        <button
                            className="LoginModalForm_Button"
                            onClick={() => {
                                navigate('/login')
                            }}
                        >Log In
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}