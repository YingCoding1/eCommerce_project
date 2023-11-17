import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import paymentAction from "../actions";
import {taxRate} from "../Helper";
import {PayPalScriptProvider, PayPalButtons} from "@paypal/react-paypal-js";

export const Payment = ({itemList, amount}) => {

    // const ref = useRef(null)
    // useEffect(() => {
    //     const element = ref.current
    //     console.log(element)
    //     element.addEventListener("click", () => {
    //         console.log('click')
    //     })

    // return () => {
    //     element.removeEventListener('onClick')
    // }
    // },[])

    const [transactions, setTransactions] = useState({
        transactions: [{
            amount: null,
            description: 'Test',
            custom: '10000000000',
            //invoice_number: '12345', Insert a unique invoice number
            payment_options: {
                allowed_payment_method: 'INSTANT_FUNDING_SOURCE'
            },
            soft_descriptor: 'HSDFR00000',
            item_list: {
                items: null
                ,
                shipping_address: {
                    recipient_name: 'Test',
                    line1: '100, Markham, ON L3R 0B3',
                    line2: 'Unit #200',
                    city: 'Toronto',
                    country_code: 'CA',
                    postal_code: 'A1A 324',
                    phone: '000000000',
                    state: 'Ontario'
                }
            }
        }],
        note_to_payer: 'Contact us for any questions on your order.'
    })

    useEffect(() => {
        setTransactions(state => (state.transactions[0].amount = amount, state))
        setTransactions(state => (state.transactions[0].item_list.items = itemList, state))
    }, [itemList, amount])

    const dispatch = useDispatch()
    useEffect(() => {
        window.PAYPAL.Button.render(paypalIntegrate(window.PAYPAL, () => {

        }), '#paypal-button');
    }, [])
    const paypalIntegrate = (paypal, PaymentSuccess) => {

        return {
            // Configure environment
            env: 'sandbox',
            client: {
                sandbox: 'AT00CBFeesBflw-Bi2e7S1Y1mCGOlY46BUkBEOTElGDUFwfPEuyy9afsitY7xF',
                production: 'AWy7L0BPpJU1RbTw9ha-4LOhB9y4biARxSpBnk1KjbaXEHCnv1pBhumgI'
            },
            // Customize button (optional)
            locale: 'en_US',
            style: {
                // layout: 'vertical',
                size: 'large',
                color: 'blue',
                shape: 'rect',
                tagline: 'false',
                label: 'paypal'
            },
            funding: {
                allowed: [paypal.FUNDING.CARD],
                disallowed: [paypal.FUNDING.CREDIT]
            },

            // Enable Pay Now checkout flow (optional)
            commit: true,

            // Set up a payment
            payment: (data, actions) => {
                return actions.payment.create(transactions
                );
            },
            // Execute the payment
            onAuthorize: (data, actions) => {
                return actions.payment.execute().then(function (res) {
                    // Show a confirmation message to the buyer
                    // call your action to tackle after payment process
                    console.log('payment returned results', res)
                    dispatch(paymentAction.checkoutAction.PaymentSuccess()) // call my PaymentSucess action
                });
            }
        }
    }

    return (
        <div id="paypal-button">

        </div>
    )

}