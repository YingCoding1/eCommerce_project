import {Link} from "react-router-dom";
import "../styles/CheckoutFailure.scss"
import logo from "../headerSvgIcons/LogoIcon.svg";
import ExitMenuIcon from "../headerSvgIcons/ExitMenuIcon.svg"

export const CheckoutFailure = () => {
    return (
        <>
            <div className="FailurePage">
                <div className="CheckoutFailure_Header">
                    <div className="CheckoutFailure_Header_Text">
                        <p className="CheckoutFailure_Header_Text_Heading">Free shipping. Free returns. Less stress,
                            more
                            sweat.</p>
                        <Link to={`/`} className="CheckoutFailure_Header_Text_Link"> Shop What's New </Link>
                        <p className="CheckoutFailure_Header_Text_Close"><img src={ExitMenuIcon} alt=""/></p>
                    </div>
                    <div id="OrderPage-Header-CloseImg" className="CheckoutFailure_Header_Logo">
                        <img src={logo}/>
                    </div>
                </div>
                <div className='CheckoutFailure'>
                    <div className='CheckoutFailure_Main'>
                        <div className='CheckoutFailure_Main_Content'>
                            <div className='CheckoutFailure_Main_Content_Info'>You are not log in or you've timed out!
                            </div>
                            <p>Don’t worry, your items are still in your bag. You’ll be able to see them again when you
                                log in.</p>
                            <Link to={'/login'} className='CheckoutFailure_Main_Content_Link'>
                                <div className='CheckoutFailure_Main_Content_Link_Button'>LOG IN</div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="CheckoutFailure_Footer">
                    <div className="CheckoutFailure_Footer_Contact">
                        <div className="CheckoutFailure_Footer_Contact_Item">Contact Us</div>
                        <div className="CheckoutFailure_Footer_Contact_Item">Live Chat</div>
                        <div className="CheckoutFailure_Footer_Contact_Item">1.877.263.9300</div>
                    </div>
                    <div className="CheckoutFailure_Footer_Lists">
                        <p className="CheckoutFailure_Footer_Lists_Item">Shipping Policy</p>
                        <p className="CheckoutFailure_Footer_Lists_Item">Privacy Policy (Last Updated: 9/10/20)</p>
                        <p className="CheckoutFailure_Footer_Lists_Item">Terms of Use</p>
                        <p className="CheckoutFailure_Footer_Lists_Item">Accessibility Statement</p>
                        <p className="CheckoutFailure_Footer_Lists_Text">© lululemon athletica 1818 Cornwall Ave,
                            Vancouver BC V6J 1C7</p>
                    </div>
                </div>
            </div>
            <div className="RD_FailurePage">
                <div className="RD_CheckoutFailure_Header">
                    <div className="RD_CheckoutFailure_Header_Text">
                        <div className="RD_CheckoutFailure_Header_Text_Left">
                            <p className="RD_CheckoutFailure_Header_Text_Left_Heading">Free shipping. Free returns. Less
                                stress, more
                                sweat. <Link to={`/`} className="RD_CheckoutFailure_Header_Text_Left_Link">Shop What's
                                    New </Link></p>
                        </div>
                        <p className="RD_CheckoutFailure_Header_Text_Close"><img src={ExitMenuIcon} alt=""/></p>
                    </div>
                    <div id="OrderPage-Header-CloseImg" className="RD_CheckoutFailure_Header_Logo">
                        <img src={logo}/>
                    </div>
                </div>
                <div className='RD_CheckoutFailure'>
                    <div className='RD_CheckoutFailure_Main'>
                        <div className='RD_CheckoutFailure_Main_Content'>
                            <div className='RD_CheckoutFailure_Main_Content_Info'>You are not log in or you've timed
                                out!
                            </div>
                            <p>Don’t worry, your items are still in your bag. You’ll be able to see them again when you
                                log in.</p>
                            <Link to={'/login'} className='RD_CheckoutFailure_Main_Content_Link'>
                                <div className='RD_CheckoutFailure_Main_Content_Link_Button'>LOG IN</div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="RD_CheckoutFailure_Footer">
                    <div className="RD_CheckoutFailure_Footer_Contact">
                        <div className="RD_CheckoutFailure_Footer_Contact_Item">Contact Us</div>
                        <div className="RD_CheckoutFailure_Footer_Contact_Item">1.877.263.9300</div>
                    </div>
                    <div className="RD_CheckoutFailure_Footer_Lists">
                        <p className="RD_CheckoutFailure_Footer_Lists_Item">Shipping Policy</p>
                        <p className="RD_CheckoutFailure_Footer_Lists_Item">Privacy Policy (Last Updated: 9/10/20)</p>
                        <p className="RD_CheckoutFailure_Footer_Lists_Item">Terms of Use</p>
                        <p className="RD_CheckoutFailure_Footer_Lists_Item">Accessibility Statement</p>
                        <p className="RD_CheckoutFailure_Footer_Lists_Text">© lululemon athletica 1818 Cornwall Ave,
                            Vancouver BC V6J 1C7</p>
                    </div>
                </div>
            </div>
        </>
    )

}
