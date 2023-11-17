import {useState, useEffect} from "react";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

import "../styles/Stripe.scss";
import {useSelector} from "react-redux";
import logo from "../headerSvgIcons/LogoIcon.svg";
import {useNavigate} from "react-router-dom";
import {CheckoutHeader} from "./CheckoutHeader";
import {CheckoutFooter} from "./CheckoutFooter";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51LvnguGnPFKlkHhrgsHSBFSNvsPhUbegRVJilDFhZAYRVT33onb8MlgoKJgsKVH54jJeHXH1N6FEfNGzvdujo5NA000JJmv7Bl");

export default function Stripe() {
    const [clientSecret, setClientSecret] = useState("");

    const totalCost = useSelector(state => state.checkoutReducer.totalPrice)

    let navigate = useNavigate()

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("/create-payment", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                total: totalCost * 100
            }),
        })
            .then(async (res) => {
                const {clientSecret} = await res.json()

                setClientSecret(clientSecret)
            })
    }, []);

    return (
        <>
            <CheckoutHeader/>
            <div className="Stripe">
            </div>
            <div className="Stripe_Heading">Payment</div>
            {clientSecret && clientSecret && (
                <Elements options={{clientSecret}} stripe={stripePromise}>
                    <CheckoutForm/>
                </Elements>
            )}
            <CheckoutFooter/>
        </>
    )
        ;
}