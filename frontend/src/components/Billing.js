import {OrderSummary} from "./OrderSummary";
import Logo from "../headerSvgIcons/LogoIcon.svg";
import {useNavigate} from "react-router-dom";
import {useEffect, useState, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import actions from "../actions";
import {CheckoutFooter} from "./CheckoutFooter";
import {CheckoutHeader} from "./CheckoutHeader";
import "../styles/Billing.scss"
import {apiKey, extractAddress, loadAsyncScript, mapApi} from "../Helper";

export const Billing = () => {
    let navigate = useNavigate()

    const dispatch = useDispatch()

    const [billingInfo, setBillingInfo] = useState({})

    const [isBillingForm, setIsBillingForm] = useState(false)

    const [billingAddress, setBillingAddress] = useState({})

    const addressInput = useRef(null)
    const cityInput = useRef(null)
    const postCodeInput = useRef(null)
    const provinceSelect = useRef(null)

    // init map script
    const initMapScript = () => {
        // if script already loaded
        if (window.google) {
            return Promise.resolve();
        }
        const src = `${mapApi}?key=${apiKey}&libraries=places&v=weekly`;
        return loadAsyncScript(src)
    }

    // onchange address
    const onChangeAddress = (autocomplete) => {
        const place = autocomplete.getPlace();
        console.log(extractAddress(place));

        setBillingAddress(extractAddress(place))
    }

    // init autocomplete
    const initAutocomplete = () => {
        if (isBillingForm) {
            if (!addressInput.current) return
            const autocomplete = new window.google.maps.places.Autocomplete(addressInput.current);
            autocomplete.setFields(["address_component", "geometry"]);
            autocomplete.addListener("place_changed", () => onChangeAddress(autocomplete));
        }
    }

    let shippingInfo = useSelector(state => state?.paymentReducer.shippingAddress)
    console.log(shippingInfo)

    const billingForm = () => {
        return (
            <>
                <div className="billing_body_left_address">
                    <div className="billing_body_left_address_name">
                        <h4>First Name</h4>
                        <input type="text" name="firstname" required="required"/>
                        <h4>Last Name</h4>
                        <input type="text" name="lastname" required="required"/>
                    </div>
                    <div className="billing_body_left_address_phone">
                        <h4>Phone number</h4>
                        <input type="text" name="phoneNumber" required="required"/>
                    </div>
                    <div className="billing_body_left_address_street">
                        <h4>address</h4>
                        <input type="text" name="address" required="required" ref={addressInput}/>
                    </div>
                    <div className="billing_body_left_address_map">
                        <div className="billing_body_left_address_map_city">
                            <h4>City</h4>
                            <input type="text" name="city" required="required" ref={cityInput}/>
                        </div>
                        <div className="billing_body_left_address_map_province">
                            <h4>Province</h4>
                            <select name="province" ref={provinceSelect}>
                                <option value="Alberta">Alberta</option>
                                <option value="British Columbia">British Columbia</option>
                                <option value="Manitoba">Manitoba</option>
                                <option value="New Brunswick">New Brunswick</option>
                                <option value="Newfoundland and Labrador">Newfoundland and Labrador</option>
                                <option value="Northwest Territories">Northwest Territories</option>
                                <option value="Nova Scotia">Nova Scotia</option>
                                <option value="Nunavut">Nunavut</option>
                                <option value="Ontario">Ontario</option>
                                <option value="Price Edward Island">Price Edward Island</option>
                                <option value="Quebec">Quebec</option>
                                <option value="Saskatchewan">Saskatchewan</option>
                                <option value="Yukon Territory">Yukon Territory</option>
                            </select>
                        </div>
                        <div className="billing_body_left_address_map_postcode">
                            <h4>Postal code</h4>
                            <input type="text" name="postalCode" required="required" ref={postCodeInput}/>
                        </div>
                    </div>
                </div>
                <div className="billing_body_left_submit">
                    <button type="submit">GO TO NEXT STEP</button>
                </div>
            </>
        )
    }

    const handleSubmit = (event) => {
        const formData = new FormData(event.currentTarget);
        event.preventDefault();
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
            setBillingInfo(prevState => ({...prevState, [key]: value}))
        }
    };

    // load map script after amounted
    useEffect(() => {
        initMapScript().then(() => initAutocomplete())
    }, [isBillingForm]);

    useEffect(() => {

        console.log(billingInfo)
        billingInfo && dispatch(actions.paymentAction.addBillingInformation(billingInfo))

        return () => {
            navigate("/checkout/order-confirmation")
        }
    }, [billingInfo])

    useEffect(() => {
        if (isBillingForm) {
            addressInput.current.value = billingAddress.streetName !== undefined ? `${billingAddress.streetNumber} ${billingAddress.streetName}` : ""
            cityInput.current.value = billingAddress.city !== undefined ? `${billingAddress.city}` : ""
            postCodeInput.current.value = billingAddress.zip !== undefined ? `${billingAddress.zip}` : ""
            provinceSelect.current.value = billingAddress.state !== undefined ? `${billingAddress.state}` : "Alberta"
        }
    }, [billingAddress])

    return (
        <div className="billing">
            <CheckoutHeader/>
            <div className="billing_body">
                <div className="billing_body_left">
                    <form onSubmit={handleSubmit}>
                        <h2>Billing address</h2>
                        <input
                            type="checkbox"
                            checked={!isBillingForm}
                            onChange={() => {
                                setIsBillingForm(!isBillingForm)
                            }}/>
                        <label> Same as shipping address</label>
                        {isBillingForm ? billingForm() : <button
                            onClick={() => {
                                console.log(shippingInfo)
                                setBillingInfo(shippingInfo)
                            }}
                        >GO TO NEXT STEP</button>}
                    </form>
                </div>
                <div className="billing_body_right">
                    <OrderSummary/>
                </div>
            </div>
            <CheckoutFooter/>
        </div>
    )
}