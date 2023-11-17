import React, {useEffect, useState} from "react";
import {useStripe, useElements} from "@stripe/react-stripe-js";
import {PaymentElement} from "@stripe/react-stripe-js";
import "../styles/CheckoutForm.scss"
import axios from "axios";
import {allProducts, URL} from "../Helper";
import paymentAction from "../actions";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();

    const dispatch = useDispatch()

    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const [paymentType, setPaymentType] = useState(null);

    const orderList = useSelector(state => state?.checkoutReducer?.orderList)
    const totalQuantity = useSelector(state => state?.checkoutReducer?.totalQuantity)
    const totalPrice = useSelector(state => state?.checkoutReducer?.totalPrice)

    let successMessage = useSelector(state => state.checkoutReducer.successMessage)

    const userInfo = useSelector(state => state.loginReducer.userData)

    let navigate = useNavigate()

    useEffect(() => {
        console.log(successMessage)
        successMessage && navigate('/checkout')

    }, [successMessage])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return
        }

        setIsProcessing(true)

        const {error, paymentIntent} = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/checkout/success`,
            },
            redirect: "if_required"
        })
        console.log(paymentIntent)

        if (error) {
            setMessage(error.message)
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            setMessage("Payment status: " + paymentIntent.status)
            fetch(`/create-payment/${paymentIntent.payment_method}`).then(async (r) => {
                const {payment} = await r.json()
                console.log(payment)

                // call api save payment to database
                try {
                    let res = await axios({
                        method: 'post',
                        url: "http://localhost:3001/payment",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: JSON.stringify({
                            "cardNumber": payment.last4,
                            "expiryMonth": payment.exp_month,
                            "expiryYear": payment.exp_year,
                            "paymentStatus": 2,
                            "paymentType": (payment.brand === 'visa') ? 2 : 4
                        })
                    })

                    const {data: {data}} = res

                    // console.log(data)

                    // call api save order to database
                    try {
                        await axios({
                            method: 'post',
                            url: "http://localhost:3001/order",
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            data: JSON.stringify({
                                "itemTotal": totalPrice,
                                "taxRate": 0.05,
                                "tax": (totalPrice * 0.05).toFixed(2),
                                "total": totalPrice + (totalPrice * 0.05),
                                "products": orderList,
                                "orderStatus": 2,
                                "payment": data.id,
                                "user": userInfo.id
                            })
                        })

                    } catch (e) {
                        console.log(e)
                    }

                    dispatch(paymentAction.checkoutAction.PaymentSuccess())

                } catch (e) {
                    console.log(e)
                }

            })
        } else {
            setMessage("Unexpected state")
        }
        setIsProcessing(false)
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit} className="checkoutForm">
            <PaymentElement/>
            <button disabled={isProcessing} id="submit" className="checkoutForm_button">
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Pay now"}
        </span>
            </button>
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
        </form>
    );
}