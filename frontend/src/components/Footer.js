import TwitterIcon from '@mui/icons-material/Twitter';
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import "../styles/Footer.scss"
import {useState} from "react";

<script src="https://kit.fontawesome.com/26134194a.js" crossOrigin="anonymous"></script>

export const Footer = () => {

    return (
        <div id="footerBox">
            <div className="footer">
                <div className="footer_primaryMenu">
                    <div className="footer_primaryMenu_primaryMenuInner">
                        <div className="footer_primaryMenu_primaryMenuInner_primarySec">
                            <a className="footer_primaryMenu_primaryMenuInner_primarySec_title" href="">My
                                Account</a>
                            <button className="footer_primaryMenu_primaryMenuInner_primarySec_clickBtn"
                                    type="button">My Account
                                <KeyboardArrowDownIcon className="footer_primaryMenu_primaryMenuInner_primarySec_arrowDown"/>
                            </button>
                            <div className="footer_primaryMenu_primaryMenuInner_primarySec_dropdown"
                                 style={{height: 0}}>
                                <ul className="footer_primaryMenu_primaryMenuInner_primarySec_dropdown_list">
                                    <li className="footer_primaryMenu_primaryMenuInner_primarySec_dropdown_list_content">
                                        <a>Sign In</a>
                                    </li>
                                    <li className="footer_primaryMenu_primaryMenuInner_primarySec_dropdown_list_content">
                                        <a>Register</a>
                                    </li>
                                    <li className="footer_primaryMenu_primaryMenuInner_primarySec_dropdown_list_content">
                                        <a>Order Status</a>
                                    </li>
                                    <li className="footer_primaryMenu_primaryMenuInner_primarySec_dropdown_list_content">
                                        <a>Returns</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="footer_primaryMenu_primaryMenuInner_primarySec">
                            <a className="footer_primaryMenu_primaryMenuInner_primarySec_title" href="">Help</a>
                            <button className="footer_primaryMenu_primaryMenuInner_primarySec_clickBtn"
                                    type="button">Help<KeyboardArrowDownIcon
                                className="footer_primaryMenu_primaryMenuInner_primarySec_arrowDown"/></button>
                            <div className="footer_primaryMenu_primaryMenuInner_primarySec_dropdown"
                                 style={{height: 0}}>
                                <ul className="footer_primaryMenu_primaryMenuInner_primarySec_dropdown_list">
                                    <li className="footer_primaryMenu_primaryMenuInner_primarySec_dropdown_list_content">
                                        <a>COVID-19 FAQ</a>
                                    </li>
                                    <li className="footer_primaryMenu_primaryMenuInner_primarySec_dropdown_list_content">
                                        <a>Services</a>
                                    </li>
                                    <li className="footer_primaryMenu_primaryMenuInner_primarySec_dropdown_list_content">
                                        <a>Ordering</a>
                                    </li>
                                    <li className="footer_primaryMenu_primaryMenuInner_primarySec_dropdown_list_content">
                                        <a>Shipping Policy</a>
                                    </li>
                                    <li className="footer_primaryMenu_primaryMenuInner_primarySec_dropdown_list_content">
                                        <a>Returns</a>
                                    </li>
                                    <li className="footer_primaryMenu_primaryMenuInner_primarySec_dropdown_list_content">
                                        <a>Sizing</a>
                                    </li>
                                    <li className="footer_primaryMenu_primaryMenuInner_primarySec_dropdown_list_content">
                                        <a>Our Products</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="footer_primaryMenu_primaryMenuInner_primarySec">
                            <a className="footer_primaryMenu_primaryMenuInner_primarySec_title" href="">About Us</a>
                            <button className="footer_primaryMenu_primaryMenuInner_primarySec_clickBtn"
                                    type="button">About Us<KeyboardArrowDownIcon
                                className="footer_primaryMenu_primaryMenuInner_primarySec_arrowDown"/></button>
                            <div className="footer_primaryMenu_primaryMenuInner_primarySec_dropdown "
                                 style={{height: 0}}>
                                <ul className="footer_primaryMenu_primaryMenuInner_primarySec_dropdown_list">
                                    <li className="footer_primaryMenu_primaryMenuInner_primarySec_dropdown_list_content">
                                        <a>Our Business</a>
                                    </li>
                                    <li className="footer_primaryMenu_primaryMenuInner_primarySec_dropdown_list_content">
                                        <a>Media</a>
                                    </li>
                                    <li className="footer_primaryMenu_primaryMenuInner_primarySec_dropdown_list_content">
                                        <a>Investors</a>
                                    </li>
                                    <li className="footer_primaryMenu_primaryMenuInner_primarySec_dropdown_list_content">
                                        <a>Strategic</a>
                                    </li>
                                    <li className="footer_primaryMenu_primaryMenuInner_primarySec_dropdown_list_content">
                                        <a>Affiliates and Creators</a>
                                    </li>
                                    <li className="footer_primaryMenu_primaryMenuInner_primarySec_dropdown_list_content">
                                        <a>Sweat Collective</a>
                                    </li>
                                    <li className="footer_primaryMenu_primaryMenuInner_primarySec_dropdown_list_content">
                                        <a>Team Canada</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="footer_primaryMenu_primaryMenuInner_primarySec">
                            <a className="footer_primaryMenu_primaryMenuInner_primarySec_title" href="">Contact
                                Us</a>
                            <button className="footer_primaryMenu_primaryMenuInner_primarySec_clickBtn"
                                    type="button">Contact Us<KeyboardArrowDownIcon
                                className="footer_primaryMenu_primaryMenuInner_primarySec_arrowDown"/></button>
                            <div className="footer_primaryMenu_primaryMenuInner_primarySec_dropdown"
                                 style={{height: 0}}>
                                <ul className="footer_primaryMenu_primaryMenuInner_primarySec_dropdown_list">
                                    <li className="footer_primaryMenu_primaryMenuInner_primarySec_dropdown_list_content">
                                        <a>Live Chat</a>
                                    </li>
                                    <li className="footer_primaryMenu_primaryMenuInner_primarySec_dropdown_list_content">
                                        <a>1.877.263.9300</a>
                                    </li>
                                    <li className="footer_primaryMenu_primaryMenuInner_primarySec_dropdown_list_content">
                                        <a>Email Sign Up</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="footer_primaryMenu_primaryMenuInner_primarySec">
                            <ul className="footer_primaryMenu_primaryMenuInner_primarySec_dropdown_list">
                                <li className="footer_primaryMenu_primaryMenuInner_primarySec_dropdown_list_content">
                                    <a className="noneExpander">CAREERS</a>
                                </li>
                                <li className="footer_primaryMenu_primaryMenuInner_primarySec_dropdown_list_content">
                                    <a className="noneExpander">COMMUNITY</a>
                                </li>
                                <li className="footer_primaryMenu_primaryMenuInner_primarySec_dropdown_list_content">
                                    <a className="noneExpander">SUSTAINABILITY</a>
                                </li>
                                <li className="footer_primaryMenu_primaryMenuInner_primarySec_dropdown_list_content">
                                    <a className="noneExpander">SOCIAL IMPACT</a>
                                </li>
                                <li className="footer_primaryMenu_primaryMenuInner_primarySec_dropdown_list_content">
                                    <a className="noneExpander">DIVERSITY AND INCLUSION</a>
                                </li>
                                <li className="footer_primaryMenu_primaryMenuInner_primarySec_dropdown_list_content">
                                    <a className="noneExpander">LULULEMON APPS</a>
                                </li>
                            </ul>
                        </div>
                        <div className="footer_primaryMenu_primaryMenuInner_primarySec">
                            <ul className="footer_primaryMenu_primaryMenuInner_primarySec_dropdown_list">
                                <li className="footer_primaryMenu_primaryMenuInner_primarySec_dropdown_list_content">
                                    <a className="noneExpander">GIFT</a>
                                </li>
                                <li className="footer_primaryMenu_primaryMenuInner_primarySec_dropdown_list_content">
                                    <a className="noneExpander">STORE LOCATOR</a></li>
                                <li className="footer_primaryMenu_primaryMenuInner_primarySec_dropdown_list_content">
                                    <a className="noneExpander">Privacy Policy&nbsp;(Last Updated: 9/10/20)</a>
                                </li>
                                <li className="footer_primaryMenu_primaryMenuInner_primarySec_dropdown_list_content">
                                    <a className="noneExpander">UK Modern Slavery Act</a>
                                </li>
                                <li className="footer_primaryMenu_primaryMenuInner_primarySec_dropdown_list_content">
                                    <a className="noneExpander">California Transparency Act</a>
                                </li>
                                <li className="footer_primaryMenu_primaryMenuInner_primarySec_dropdown_list_content">
                                    <a className="noneExpander">Accessibility Statement</a>
                                </li>
                            </ul>
                        </div>
                        <div className="footer_primaryMenu_primaryMenuInner_externalLink">
                            <TwitterIcon/>
                            <EnergySavingsLeafIcon/>
                            <YouTubeIcon/>
                            <FacebookIcon/>
                            <InstagramIcon/>
                        </div>
                    </div>
                </div>

                <div className="footer_bottomPart">
                    <div className="footer_bottomPart_addressInfo">© lululemon athletica 1818 Cornwall Ave,
                        Vancouver BC
                        V6J 1C7
                    </div>
                    <div className="footer_bottomPart_policyLink">
                        <a className="policy">Policy&nbsp;(Last Updated: 9/10/20)</a>&nbsp;<a className="term">Term
                        of Use</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
