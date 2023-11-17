import {OrderHistoryFilter} from "./OrderHistoryFilter";
// import {PDFFile} from "./PDFFile";
import {OrderHistory} from "./OrderHistory";
import {useDispatch, useSelector} from "react-redux";
import LogoIcon from "../headerSvgIcons/LogoIcon.svg";
import {Link} from "react-router-dom";
import "../styles/MyOrderHistory.scss"
import axios from "axios";
import {URL} from "../Helper";
import {useEffect, useRef} from "react";
import actions from "../actions";
import {CheckoutHeader} from "./CheckoutHeader";
import {CheckoutFooter} from "./CheckoutFooter";

export const MyOrderHistory = (children, func) => {
    const dispatch = useDispatch()

    const elementRef = useRef()

    const userInfo = useSelector(state => state.loginReducer.userData)

    //get data from the database
    useEffect(() => {
        dispatch(actions.paymentAction.fetchOrdersFromDatabase(1, userInfo.id))
    }, [])

    //const dataName
    let historyOrders = useSelector(state => state?.paymentReducer.ordersDatabase)

    // historyOrders.length > 0 && console.log(historyOrders)

    const PDFFile = () => {
        const invoice = elementRef.current
        console.log(invoice)
        let PDFWidth = window.innerWidth
        let PDFHeight = 1600
        let opt = {
            margin: 1,
            filename: 'OrderHistory.pdf',
            //Image Type
            image: {type: 'jpg', quality: 0.3},
            //useCORS is to allow to access the outside API
            html2canvas: {useCORS: true, scale: 1},
            // allowTaint: true,
            jsPDF: {unit: 'px', format: [PDFWidth, PDFHeight], orientation: 'portrait'},
            pagebreak: {mode: 'avoid-all', before: '#page2el'}
        };
        window.html2pdf().set(opt).from(invoice).save();
    }



    return (
        <>
            <CheckoutHeader/>
            <div className="orderHistory" id="invoice" ref={elementRef}>
                {/*<div className="orderHistory_Icon">*/}
                {/*    <Link to={'/whats-new'}><img src={LogoIcon} alt=""/></Link>*/}
                {/*</div>*/}
                <div className="orderHistory_MyOrder">
                    My Order
                </div>
                <div className="orderHistory_MainContent">
                    <OrderHistoryFilter/>
                    <div className="btnContainer">
                        <button className="invoiceBtn" id="download" onClick={() => {
                            PDFFile()
                        }}> download invoice
                        </button>
                    </div>
                </div>
                {/*first Map the order*/}
                {(historyOrders && historyOrders?.map((element, index) =>
                        <OrderHistory key={index} orderHistory={element}/>
                    )
                )
                }
            </div>
            <CheckoutFooter/>
        </>
    )

}
