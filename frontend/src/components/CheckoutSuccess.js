import {Link} from "react-router-dom";
import "../styles/CheckoutSuccess.scss"
import logo from "../headerSvgIcons/LogoIcon.svg";
import ExitMenuIcon from "../headerSvgIcons/ExitMenuIcon.svg"
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef} from "react";
import actions from "../actions";

export const CheckoutSuccess = () => {
    const dispatch = useDispatch()

    const elementRef = useRef()

    const userInfo = useSelector(state => state.loginReducer.userData)

    //get data from the database
    useEffect(() => {
        dispatch(actions.paymentAction.fetchOrdersFromDatabase(1, userInfo?.id))
    }, [])



    //const dataName
    let orderHistory = useSelector(state => state?.paymentReducer.ordersDatabase)

    console.log(orderHistory)
    console.log(orderHistory[0]?.create)
    const date = new Date(orderHistory[0]?.create)
    return (
        <>
            <div className="SuccessPage">
                <div className="CheckoutSuccess_Header">
                    <div className="CheckoutSuccess_Header_Text">
                        <p className="CheckoutSuccess_Header_Text_Heading">Free shipping. Free returns. Less stress,
                            more
                            sweat.</p>
                        <Link to={`/`} className="CheckoutSuccess_Header_Text_Link"> Shop What's New </Link>
                        <p className="CheckoutSuccess_Header_Text_Close"><img src={ExitMenuIcon} alt=""/></p>
                    </div>
                    <div id="OrderPage-Header-CloseImg" className="CheckoutSuccess_Header_Logo">
                        <img data-testid='TestImage' src={logo} alt="logo"/>
                    </div>
                </div>
                <div className='CheckoutSuccess'>
                    <div className='CheckoutSuccess_Main'>
                        <div className='CheckoutSuccess_Main_Content'>
                            <div className='CheckoutSuccess_Main_Content_Info'>You have successfully checked out!</div>
                            <div className="orderInvoice_Container">
                                <div className="orderHistory_DetailMainContent">
                                    <div className="orderHistory_DetailMainContent_Title">Order Invoice</div>
                                    <div className="orderHistory_MainContent_OrderDetail">
                                        <div className="orderHistory_MainContent_OrderDetail_OrderNumber">
                                            Invoice Number: {orderHistory[0]?.orderNumber}</div>
                                        <div className="orderHistory_MainContent_OrderDetail_OrderDate">
                                            Order Date: {date?.toDateString()}</div>
                                        <div className="orderHistory_MainContent_OrderDetail_Status">
                                            Status: {orderHistory[0]?.payment.paymentStatus.status}
                                        </div>
                                        {/*    /!*<div>Tracking No:</div>*!/*/}
                                    </div>
                                    <div className="orderHistory_MainContent_ProductDetail">
                                        {/*//double Map the product Information*/}
                                        {orderHistory[0]?.products && orderHistory[0].products.map((order, index) =>

                                            <div className="orderHistory_MainContent_ProductDetail_Products"
                                                 key={index}>
                                                <div className="orderHistory_MainContent_ProductDetail_Products_Top">
                                                    <img
                                                        className="orderHistory_MainContent_ProductDetail_Products_Top_Images"
                                                        src={order?.imageList[0]} alt=""
                                                        // width="120px" height="150px"
                                                    />
                                                    <div
                                                        className="orderHistory_MainContent_ProductDetail_Products_NameDetail">
                                                        <div>{order?.productName}</div>
                                                        <div>Color: {order?.colorName}</div>
                                                        <div>Size: {order?.size}</div>
                                                    </div>
                                                    <div
                                                        className="orderHistory_MainContent_ProductDetail_Products_Quantity">Quantity: {order?.quantity}</div>
                                                    <div
                                                        className="orderHistory_MainContent_ProductDetail_Products_Price">
                                                        ${order?.totalPrice}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                        }
                                        <hr className="hr1"/>
                                        <div className="orderHistory_MainContent_ProductDetail_Total">
                                            <div className="orderHistory_MainContent_ProductDetail_Total_ItemTotal">
                                                <div>Item Total:</div>
                                                <div>${orderHistory[0]?.itemTotal}</div>
                                            </div>
                                            <div className="orderHistory_MainContent_ProductDetail_Total_Shipping">
                                                <div>Shipping:</div>
                                                <div className="Free">Free</div>
                                            </div>
                                            <div className="orderHistory_MainContent_ProductDetail_Total_Taxes">
                                                <div>Estimated Taxes:{100 * orderHistory[0]?.taxRate}%</div>
                                                <div>${orderHistory[0]?.tax}</div>
                                            </div>
                                            <div className="orderHistory_MainContent_ProductDetail_Total_TotalPrice">
                                                <div>Total:</div>
                                                <div> ${orderHistory[0]?.total}</div>
                                            </div>
                                            <div className="orderHistory_MainContent_ProductDetail_Total_OrderNumber">
                                                Order Number: <br/> {orderHistory[0]?.orderNumber}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="Button_Container">
                                    <Link to={'/login'} className='CheckoutSuccess_Main_Content_Link'>
                                        <button className='CheckoutSuccess_Main_Content_Link_Button'>Return Home</button>
                                    </Link>
                                    <Link to={'/order-history'} className='CheckoutSuccess_Main_Content_Link'>
                                        <button className='CheckoutSuccess_Main_Content_Link_Button'>Go To OrderHistory
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="CheckoutSuccess_Footer">
                    <div className="CheckoutSuccess_Footer_Contact">
                        <div className="CheckoutSuccess_Footer_Contact_Item">Contact Us</div>
                        <div className="CheckoutSuccess_Footer_Contact_Item">Live Chat</div>
                        <div className="CheckoutSuccess_Footer_Contact_Item">1.877.263.9300</div>
                    </div>
                    <div className="CheckoutSuccess_Footer_Lists">
                        <p className="CheckoutSuccess_Footer_Lists_Item">Shipping Policy</p>
                        <p className="CheckoutSuccess_Footer_Lists_Item">Privacy Policy (Last Updated: 9/10/20)</p>
                        <p className="CheckoutSuccess_Footer_Lists_Item">Terms of Use</p>
                        <p className="CheckoutSuccess_Footer_Lists_Item">Accessibility Statement</p>
                        <p className="CheckoutSuccess_Footer_Lists_Text">© lululemon athletica 1818 Cornwall Ave,
                            Vancouver BC V6J 1C7</p>
                    </div>
                </div>
            </div>
            <div className="RD_SuccessPage">
                <div className="RD_CheckoutSuccess_Header">
                    <div className="RD_CheckoutSuccess_Header_Text">
                        <div className="RD_CheckoutSuccess_Header_Text_Left">
                            <p className="RD_CheckoutSuccess_Header_Text_Left_Heading">Free shipping. Free returns. Less
                                stress, more
                                sweat. <Link to={`/`} className="RD_CheckoutSuccess_Header_Text_Left_Link">Shop What's
                                    New </Link></p>
                        </div>
                        <p className="RD_CheckoutSuccess_Header_Text_Close"><img src={ExitMenuIcon} alt=""/></p>
                    </div>
                    <div id="OrderPage-Header-CloseImg" className="RD_CheckoutSuccess_Header_Logo">
                        <img src={logo}/>
                    </div>
                </div>
                <div className='RD_CheckoutSuccess'>
                    <div className='RD_CheckoutSuccess_Main'>
                        <div className='RD_CheckoutSuccess_Main_Content'>
                            <div className='RD_CheckoutSuccess_Main_Content_Info'>You have successfully checked out!
                            </div>
                            <Link to={'/login'} className='RD_CheckoutSuccess_Main_Content_Link'>
                                <button className='RD_CheckoutSuccess_Main_Content_Link_Button'>RETURN HOME</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="RD_CheckoutSuccess_Footer">
                    <div className="RD_CheckoutSuccess_Footer_Contact">
                        <div className="RD_CheckoutSuccess_Footer_Contact_Item">Contact Us</div>
                        <div className="RD_CheckoutSuccess_Footer_Contact_Item">1.877.263.9300</div>
                    </div>
                    <div className="RD_CheckoutSuccess_Footer_Lists">
                        <p className="RD_CheckoutSuccess_Footer_Lists_Item">Shipping Policy</p>
                        <p className="RD_CheckoutSuccess_Footer_Lists_Item">Privacy Policy (Last Updated: 9/10/20)</p>
                        <p className="RD_CheckoutSuccess_Footer_Lists_Item">Terms of Use</p>
                        <p className="RD_CheckoutSuccess_Footer_Lists_Item">Accessibility Statement</p>
                        <p className="RD_CheckoutSuccess_Footer_Lists_Text">© lululemon athletica 1818 Cornwall Ave,
                            Vancouver BC V6J 1C7</p>
                    </div>
                </div>
            </div>
        </>
    )
}

