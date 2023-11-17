import {CheckoutMyBag} from "./CheckoutMyBag";
import {CheckoutOrder} from "./CheckoutOrder";
import {OrderData} from "../ItemData";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useRef} from "react";
import "../styles/Checkout.scss"
import actions from "../actions";
import {CheckoutUpdateItem} from "./CheckoutUpdateItem";
import {actionType, taxRate} from "../Helper";
import logo from "../headerSvgIcons/LogoIcon.svg"

export const Checkout = () => {


    let orderList = useSelector(state => state.checkoutReducer.orderList)

    let errorMessage = useSelector(state => state.checkoutReducer.errorMessage)

    let successMessage = useSelector(state => state.checkoutReducer.successMessage)

    let navigate = useNavigate()

    const dispatch = useDispatch()

    // console.log(errorMessage)

    useEffect(() => {
        errorMessage && navigate('/checkout/failure')
        dispatch({
            type: actionType.PAYMENT_FAILURE,
            payload: null
        })

        successMessage && navigate('/checkout/success')
        dispatch({
            type: actionType.PAYMENT_SUCCESS,
            payload: null
        })

    }, [errorMessage, successMessage])

    return (
        <div className="Checkout" >
            <div className="Checkout_Header">
                <div className="Checkout_Header_Text">
                    <p className="Checkout_Header_Text_Heading">Free shipping. Free returns. Less stress, more
                        sweat.</p>
                    <Link to={`/`} className="Checkout_Header_Text_Link">Shop What's New</Link>
                    <p className="Checkout_Header_Text_Close">X</p>
                </div>
                <hr/>
                <div id="OrderPage-Header-CloseImg" className="Checkout_Header_Logo">
                    <img src={logo}/>
                </div>
            </div>
            <div className="Checkout_MainSection">
                {
                    orderList.length === 0 ?
                        <div className="Checkout_MainSection_WithoutProduct">
                            <div className="Checkout_MainSection_WithoutProduct_Info">
                                Give your bag some love!
                            </div>
                            <Link to={'/'} className="Checkout_MainSection_WithoutProduct_Link">
                                <span className="Checkout_MainSection_WithoutProduct_Link_Button">SHOP WHATS'S NEW</span>
                            </Link>
                        </div>
                        :
                        <div className="Checkout_MainSection_WithProduct">
                            <div className="Checkout_MainSection_WithProduct_Body">
                                <CheckoutMyBag/>
                                <CheckoutOrder/>
                            </div>
                            <div className="Checkout_MainSection_WithProduct_Save">
                                <h2>Saved for Later</h2>
                                <p><span>Sign in</span> or <span>create an account </span>to view your saved items.</p>
                            </div>
                        </div>
                }
            </div>
            {/*<CheckoutUpdateItem />*/}
            <div className="Checkout_Footer">
                <div className="Checkout_Footer_Contact">
                    <div className="Checkout_Footer_Contact_Item">Contact Us</div>
                    <div className="Checkout_Footer_Contact_Item Chat">Live Chat</div>
                    <div className="Checkout_Footer_Contact_Item">1.877.263.9300</div>
                </div>
                <div className="Checkout_Footer_Lists">
                    <p className="Checkout_Footer_Lists_Item">Shipping Policy</p>
                    <p className="Checkout_Footer_Lists_Item">Privacy Policy (Last Updated: 9/10/20)</p>
                    <p className="Checkout_Footer_Lists_Item">Terms of Use</p>
                    <p className="Checkout_Footer_Lists_Item">Accessibility Statement</p>
                    <p className="Checkout_Footer_Lists_Text">© lululemon athletica 1818 Cornwall Ave, Vancouver BC V6J 1C7</p>
                </div>
            </div>
        </div>
    )
}