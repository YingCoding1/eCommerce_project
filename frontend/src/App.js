import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import actions from "./actions";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {PageNotFound} from "./components/PageNotFound";
import {Home} from "./components/Home";
import "./styles/App.scss"
import {WhatsNew} from "./components/WhatsNew";
import {ProductDetail} from "./components/ProductDetail";
import {LogInPage} from "./components/LogInPage";
import {Checkout} from "./components/Checkout";
import {Payment} from "./components/Payment";
import {CheckoutFailure} from "./components/CheckoutFailure";
import {CheckoutSuccess} from "./components/CheckoutSuccess";
import Stripe from "./components/Stripe";
import {MyOrderHistory} from "./components/MyOrderHistory";
import {OrderConfirmation} from "./components/OrderConfirmation";
import {Shipping} from "./components/Shipping";
import {Billing} from "./components/Billing";
import AddressAutoComplete from "./components/AddressAutoComplete";

function App() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actions.productAction.fetchAllProducts())
        dispatch(actions.productAction.fetchProductWithSort(1))
        dispatch(actions.productAction.fetchAllFilter())
        // dispatch(actions.productAction.fetchAllProducts(filters))
    }, [])

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/whats-new" element={<Home/>}/>
                    <Route path="*" element={<PageNotFound/>}/>
                    <Route path="/whats-new/:gender" element={<WhatsNew/>}/>
                    <Route path="/" element={<Navigate to="/whats-new"/>}/>
                    <Route path="/product/:productInfo" element={<ProductDetail/>}/>
                    <Route path="/login" element={<LogInPage/>}/>
                    <Route path="/checkout" element={<Checkout/>}/>
                    <Route path="/payment" element={<Payment/>}/>
                    <Route path="/checkout/failure" element={<CheckoutFailure/>}/>
                    <Route path="/checkout/success" element={<CheckoutSuccess/>}/>
                    <Route path="/checkout/payment" element={<Stripe/>}/>
                    <Route path="/order-history" element={<MyOrderHistory/>}/>
                    <Route path="/checkout/order-confirmation" element={<OrderConfirmation/>}/>
                    <Route path="/checkout/shipping" element={<Shipping/>}/>
                    <Route path="/checkout/billing" element={<Billing/>}/>
                    <Route path="/test" element={<AddressAutoComplete/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
