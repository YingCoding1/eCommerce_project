import "../styles/Shipping.scss"
import {OrderSummary} from "./OrderSummary";
import {useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import actions from "../actions";
import {CheckoutHeader} from "./CheckoutHeader";
import {CheckoutFooter} from "./CheckoutFooter";
import {apiKey, extractAddress, loadAsyncScript, mapApi} from "../Helper";

export const Shipping = () => {
    let navigate = useNavigate()

    const dispatch = useDispatch()

    const addressInput = useRef(null)

    const cityInput = useRef(null)

    const postCodeInput = useRef(null)

    const provinceSelect = useRef(null)

    const [shippingAddress, setShippingAddress] = useState({})

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

        setShippingAddress(extractAddress(place));
    }

    // init autocomplete
    const initAutocomplete = () => {
        if (!addressInput.current) return
        const autocomplete = new window.google.maps.places.Autocomplete(addressInput.current);
        autocomplete.setFields(["address_component", "geometry"]);
        autocomplete.addListener("place_changed", () => onChangeAddress(autocomplete));
    }

    const [shippingInfo, setShippingInfo] = useState({})

    const handleSubmit = (event) => {
        const formData = new FormData(event.currentTarget);
        event.preventDefault();
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
            setShippingInfo(prevState => ({...prevState, [key]: value}))
        }
    };

    // load map script after amounted
    useEffect(() => {
        initMapScript().then(() => initAutocomplete())
    }, []);

    useEffect(() => {
        shippingInfo && dispatch(actions.paymentAction.addShippingInformation(shippingInfo))

        return () => {
            navigate("/checkout/billing")
        }
    }, [shippingInfo])

    useEffect(() => {
        console.log(provinceSelect.current.value)
        addressInput.current.value = shippingAddress.streetName !== undefined ? `${shippingAddress.streetNumber} ${shippingAddress.streetName}` : ""
        cityInput.current.value = shippingAddress.city !== undefined ? `${shippingAddress.city}` : ""
        postCodeInput.current.value = shippingAddress.zip !== undefined ? `${shippingAddress.zip}` : ""
        provinceSelect.current.value = shippingAddress.state !== undefined ? `${shippingAddress.state}` : "Alberta"

    }, [shippingAddress])

    return (
        <div className="Shipping">
            <CheckoutHeader/>
            <form onSubmit={handleSubmit}>
                <div className="Shipping_body">
                    <div className="Shipping_body_left">
                        {/*<h2>Have an account</h2>*/}
                        <div className="Shipping_body_left_contact">
                            <h2>Contact information</h2>
                            <h4>Email address(for order notification)</h4>
                            <input required="required" className="Shipping_body_left_contact_email" type="email"
                                   name="email"/>
                            <br/>
                            <input type="checkbox"/>sign me up for Lululemon emails(you can unsubscribe at any time).See
                            our privacy,policy,for details
                        </div>
                        <div className="Shipping_body_left_address">
                            <h2>Shipping address</h2>
                            <div className="Shipping_body_left_address_name">
                                <h4>First Name</h4>
                                <input required="required" type="text" name="firstname"/>
                                <h4>Last Name</h4>
                                <input required="required" type="text" name="lastname"/>
                            </div>
                            <h4>Phone number</h4>
                            <input required="required" className="Shipping_body_left_address_tel" type="text"
                                   name="phoneNumber"/>
                            <h4>address</h4>
                            <input required="required" className="Shipping_body_left_address_add" type="text"
                                   name="address" ref={addressInput}
                            />
                            <div className="Shipping_body_left_address_citypp">
                                <div className="Shipping_body_left_address_citypp_head">
                                    <h4>City</h4>
                                    <h4>Province</h4>
                                    <h4>Postal code</h4>
                                </div>
                                <div className="Shipping_body_left_address_citypp_body">
                                    <div><input required="required" type="text" name="city" ref={cityInput}/>
                                    </div>
                                    <div>
                                        <select required="required" name="province" ref={provinceSelect}>
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
                                    <div>
                                        <input required="required" type="text" name="postalCode" ref={postCodeInput}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="Shipping_body_left_option">
                            <h2>Shipping & gift options</h2>
                            <h3>2-6 business day</h3>
                            <input type="checkbox"/>This is a gift,add a message
                        </div>
                        <div className="Shipping_body_left_submit">
                            <button type="submit">GO TO NEXT STEP</button>
                        </div>
                    </div>
                    <div className="Shipping_body_right">
                        <OrderSummary/>
                    </div>
                </div>
            </form>
            <CheckoutFooter/>
        </div>
    )
}