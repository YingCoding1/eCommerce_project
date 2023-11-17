import "../styles/OrderHistory.scss"
import LogoIcon from "../headerSvgIcons/LogoIcon.svg"
import {PDFFile} from "./PDFFile";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import actions from "../actions";

export const OrderHistory = ({orderHistory}) => {
    // console.log("this from my orderhistory",orderHistory)
    const dispatch = useDispatch()

    console.log(typeof (orderHistory.create))
    const date = new Date(orderHistory.create)
    console.log("this is date", date)

    return (
        <>
            <div className="orderHistory_DetailMainContent">
                <div className="orderHistory_MainContent_OrderDetail">
                    <div className="orderHistory_MainContent_OrderDetail_OrderNumber">
                        Order Number: {orderHistory?.orderNumber}</div>
                    <div className="orderHistory_MainContent_OrderDetail_OrderDate">
                        Order Date: {date.toDateString()}</div>
                    <div className="orderHistory_MainContent_OrderDetail_Status">
                        Status: {orderHistory?.orderStatus.status}</div>
                    {/*    /!*<div>Tracking No:</div>*!/*/}
                </div>
                <div className="orderHistory_MainContent_ProductDetail">
                    {/*//double Map the product Information*/}
                    {orderHistory?.products && orderHistory.products.map((order, index) =>

                        <div className="orderHistory_MainContent_ProductDetail_Products" key={index}>
                            <div className="orderHistory_MainContent_ProductDetail_Products_Top">
                                <img className="orderHistory_MainContent_ProductDetail_Products_Top_Images"
                                     src={order?.imageList[0]} alt=""
                                    // width="120px" height="150px"
                                />
                                <div className="orderHistory_MainContent_ProductDetail_Products_NameDetail">
                                    <div>{order?.productName}</div>
                                    <div>Color: {order?.colorName}</div>
                                    <div>Size: {order?.size}</div>
                                </div>
                                <div
                                    className="orderHistory_MainContent_ProductDetail_Products_Quantity">Quantity: {order?.quantity}</div>
                                <div className="orderHistory_MainContent_ProductDetail_Products_Price">
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
                            <div>${orderHistory?.itemTotal}</div>
                        </div>
                        <div className="orderHistory_MainContent_ProductDetail_Total_Shipping">
                            <div>Shipping:</div>
                            <div className="Free">Free</div>
                        </div>
                        <div className="orderHistory_MainContent_ProductDetail_Total_Taxes">
                            <div>Estimated Taxes:{100 * orderHistory?.taxRate}%</div>
                            <div>${orderHistory?.tax}</div>
                        </div>
                        <div className="orderHistory_MainContent_ProductDetail_Total_TotalPrice">
                            <div>Total:</div>
                            <div> ${orderHistory?.total}</div>
                        </div>
                        <div className="orderHistory_MainContent_ProductDetail_Total_OrderNumber">
                            Order Number: <br/> {orderHistory?.orderNumber}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
