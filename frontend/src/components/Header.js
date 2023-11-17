import {useEffect, useState} from "react";
import "../styles/Header.scss";
import StoreLocatorIcon from "../headerSvgIcons/StoreLocatorIcon.svg"
import SignInIcon from "../headerSvgIcons/SignInIcon.svg"
import OrderHistory from "../headerSvgIcons/OrderHistory.png"
import WishListIcon from "../headerSvgIcons/WishListIcon.svg"
import GiftCardsIcon from "../headerSvgIcons/GiftCardsIcon.svg"
import LanguageIcon from "../headerSvgIcons/LanguageIcon.svg"
import LogoIcon from "../headerSvgIcons/LogoIcon.svg"
import SearchIcon from "../headerSvgIcons/SearchIcon.svg"
import MenuIcon from '@mui/icons-material/Menu';
import ArrowIcon from "../headerSvgIcons/ArrowIcon.svg"
import {Link} from "react-router-dom";
import ExitMenuIcon from "../headerSvgIcons/ExitMenuIcon.svg"
import ShowListIcon from "../headerSvgIcons/ShowListIcon.svg"
import {CheckoutItemInBag} from "./CheckoutItemInBag"
import {useSelector} from "react-redux";
import AlarmIcon from "../headerSvgIcons/AlarmIcon.gif"
import {isExpired} from "react-jwt";
import {getToken} from "../Helper";

export default function Header() {

    const totalQuantity = useSelector(state => state.checkoutReducer.totalQuantity)

    const [Language, setLanguage] = useState('CAN')

    const [display, setDisplay] = useState(false)

    // burger menu
    const hamburger = document.querySelector(".Hamburger")

    // show this header when scroll down
    const [isVisible, setIsVisible] = useState(true);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        window.addEventListener("scroll", listenToScroll);
        return () =>
            window.removeEventListener("scroll", listenToScroll);
    }, []);

    const listenToScroll = () => {
        let heightToHideFrom = 900;
        const winScroll = document.body.scrollTop ||
            document.documentElement.scrollTop;
        setHeight(winScroll);

        if (winScroll > heightToHideFrom) {
            isVisible && setIsVisible(false);
        } else {
            setIsVisible(true);
        }
    };
    // show this header when scroll down

    // get the url of current page
    function getCurrentURL() {
        return window.location.href
    }

    // get the url of current page
    const url = getCurrentURL()

    const isMyTokenExpired = isExpired(getToken())

    return (
        <>
            {((url !== "http://localhost:3000/whats-new/Women") && (url !== "http://localhost:3000/whats-new/Men") && (url !== "http://localhost:3000/whats-new") && !isVisible)
                || <header className="Header">
                    <div className="CeilingWrap">
                        <div className="Ceiling">
                            <div className="Item" id="StoreLocator">
                                <div className="Icon">
                                    <img src={StoreLocatorIcon} alt=""/>
                                </div>
                                <div className="Button">Store Locator</div>
                            </div>
                            {
                                isMyTokenExpired ?
                                    <Link
                                        to={`/login`}
                                    >
                                        <div className="Item" id="SignIn">
                                            <div className="Icon">
                                                <img src={SignInIcon} alt=""/>
                                            </div>
                                            <div className="Button">Sign In</div>
                                        </div>
                                    </Link> :
                                    <div className="Item" id="SignIn"
                                         onMouseEnter={() => setDisplay(true)}
                                         onMouseLeave={() => setDisplay(false)}
                                    >
                                        <div className="Icon">
                                            <img src={SignInIcon} alt=""/>
                                        </div>
                                        <div
                                            className="Button"
                                        >
                                            My Account
                                            {
                                                display &&
                                                <div className="Button_Logout"
                                                     onMouseLeave={() => setDisplay(false)}
                                                     onMouseEnter={() => setDisplay(true)}
                                                     onClick={() => localStorage.setItem('token', "")}
                                                >
                                                    Logout
                                                </div>
                                            }
                                        </div>
                                    </div>
                            }
                            <Link
                                to={isMyTokenExpired ? `/login` : `/order-history`}
                            >
                                <div className="Item" id="OrderHistory">
                                    <div className="Icon">
                                        <img id="OrderHistoryIcon" src={OrderHistory} alt=""/>
                                    </div>
                                    <div className="Button">Order History</div>
                                </div>
                            </Link>
                            <div className="Item" id="WishList">
                                <div className="Icon">
                                    <img src={WishListIcon} alt=""/>
                                </div>
                                <div className="Button">Wish List</div>
                            </div>
                            <div className="Item" id="GiftCards">
                                <div className="Icon">
                                    <img src={GiftCardsIcon} alt=""/>
                                </div>
                                <div className="Button">Gift Cards</div>
                            </div>
                            <div className="Item" id="Language">
                                <div className="Icon">
                                    <img src={LanguageIcon} alt=""/>
                                </div>
                                <div className="Button">{Language}</div>
                            </div>
                        </div>
                    </div>
                    <div className="NavBarWrap">
                        <div className="NavBar">
                            <div className="Left">
                                <div className="Logo" id="Logo">
                                    <Link to={'/whats-new'}><img src={LogoIcon} alt=""/></Link>
                                </div>
                                <div className="dropdown">
                                    <div className="Button" id="WOMEN">WOMEN</div>
                                    <div className="dropdownMenu">
                                        <div className="dropdownMenu_Content">
                                            <ul className="dropdownMenu_Content_Left">
                                                <div className="dropdown_Items">
                                                    <Link className="dropdown_Items_Link"
                                                          to={'/whats-new/Women'}>
                                                        What's New
                                                    </Link>
                                                </div>
                                                <div className="dropdown_Items">Bestsellers</div>
                                                <div className="dropdown_Items">Plus Size Clothes</div>
                                                <div className="dropdown_Items">Reflective Running Clothes</div>
                                                <div className="dropdown_Items">Align Shop</div>
                                                <div className="dropdown_Items">Loungewear</div>
                                                <div className="dropdown_Items">Fall Clothes Shop</div>
                                                <div className="dropdown_Items">lululemon lab</div>
                                                <div className="dropdown_Items" id="WMTM">We Made Too Much</div>
                                            </ul>
                                            <ul className="dropdownMenu_Content_Middle">
                                                <div className="grid_Container">
                                                    <div className="Left List">
                                                        <div className="ArrowLink">
                                                            <div>WOMEN'S CLOTHES</div>
                                                            <img className="Arrow" src={ArrowIcon} alt=""/>
                                                        </div>
                                                        <div className="dropdown_Items">Leggings</div>
                                                        <div className="dropdown_Items">Coats & Jackets</div>
                                                        <div className="dropdown_Items">Dresses</div>
                                                        <div className="dropdown_Items">Hoodies & Sweatshirts</div>
                                                        <div className="dropdown_Items">Joggers</div>
                                                        <div className="dropdown_Items">Pants</div>
                                                        <div className="dropdown_Items">Shirts</div>
                                                        <div className="dropdown_Items">Shoes</div>
                                                    </div>
                                                    <div className="Middle List">
                                                        <div className="Empty">XXXXXXXXX</div>
                                                        <div className="dropdown_Items">Shorts</div>
                                                        <div className="dropdown_Items">Skirts</div>
                                                        <div className="dropdown_Items">Socks</div>
                                                        <div className="dropdown_Items">Sports Bras</div>
                                                        <div className="dropdown_Items">Sweaters</div>
                                                        <div className="dropdown_Items">Swimsuits</div>
                                                        <div className="dropdown_Items">Tank Tops</div>
                                                        <div className="dropdown_Items">Underwear</div>
                                                    </div>
                                                    <div className="Right List">
                                                        <div className="ArrowLink">
                                                            <div>ACCESSORIES</div>
                                                            <img className="Arrow" src={ArrowIcon} alt=""/>
                                                        </div>
                                                        <div className="dropdown_Items">Bags</div>
                                                        <div className="dropdown_Items">Gloves & Mittens</div>
                                                        <div className="dropdown_Items">Hair Accessories</div>
                                                        <div className="dropdown_Items">Hats</div>
                                                        <div className="dropdown_Items">Scarves & Wraps</div>
                                                        <div className="dropdown_Items">Water Bottles</div>
                                                        <div className="dropdown_Items">Yoga Accessories</div>
                                                        <div className="dropdown_Items">Yoga Mats</div>
                                                    </div>
                                                </div>
                                            </ul>
                                            <div className="dropdownMenu_Content_Right">
                                                <img
                                                    src="https://images.lululemon.com/is/image/lululemon/NA_Aug22_StudioSets_Leggings_EarthTones_W_MegaNav_D?$promoBlock$&wid=768&op_usm=0.8,1,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72"
                                                    alt=""/>
                                                <h2>Break new ground.</h2>
                                                <p>Strech, sprint, and train in fall earth tones that complement all
                                                    your
                                                    goals——here in sizes 0-20.</p>
                                                <div className="dropdownMenu_Content_Right_Link">
                                                    <div className="dropdown_Item">Shop Leggings</div>
                                                    <img className="Arrow" src={ArrowIcon} alt=""/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="dropdownMenu_Footer">
                                            <div className="dropdownMenu_Footer_Left">ACTIVITY</div>
                                            <div className="dropdownMenu_Footer_Middle">
                                                <div className="dropdown_Items">Tennis</div>
                                                <div className="dropdown_Items">Running</div>
                                                <div className="dropdown_Items">Yoga</div>
                                                <div className="dropdown_Items">Workout</div>
                                                <div className="dropdown_Items">Hiking</div>
                                                <div className="dropdown_Items">Work</div>
                                            </div>
                                            <div className="dropdownMenu_Footer_Right">
                                                <div>SHOP ALL WOMEN</div>
                                                <img className="Arrow" src={ArrowIcon} alt=""/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="dropdown">
                                    <div className="Button" id="WOMEN">MEN</div>
                                    <div className="dropdownMenu">
                                        <div className="dropdownMenu_Content">
                                            <ul className="dropdownMenu_Content_Left">
                                                <div className="dropdown_Items">
                                                    <Link className="dropdown_Items_Link" to={'/whats-new/Men'}>
                                                        What's New
                                                    </Link>
                                                </div>
                                                <div className="dropdown_Items">Bestsellers</div>
                                                <div className="dropdown_Items">ABC Pants Shop</div>
                                                <div className="dropdown_Items">Pace Breaker Shorts Shop</div>
                                                <div className="dropdown_Items">Metal Vent Tech Shirts Shop</div>
                                                <div className="dropdown_Items">Business Casual Clothes</div>
                                                <div className="dropdown_Items">Fall Clothes Shop</div>
                                                <div className="dropdown_Items">lululemon lab</div>
                                                <div className="dropdown_Items" id="WMTM">We Made Too Much</div>
                                            </ul>
                                            <ul className="dropdownMenu_Content_Middle">
                                                <div className="grid_Container">
                                                    <div className="Left List">
                                                        <div className="ArrowLink">
                                                            <div>MEN'S CLOTHES</div>
                                                            <img className="Arrow" src={ArrowIcon} alt=""/>
                                                        </div>
                                                        <div className="dropdown_Items">Joggers</div>
                                                        <div className="dropdown_Items">Button Down Shirts</div>
                                                        <div className="dropdown_Items">Coats</div>
                                                        <div className="dropdown_Items">Hoodies & Sweatshirts</div>
                                                        <div className="dropdown_Items">Pants</div>
                                                        <div className="dropdown_Items">Polo Shirts</div>
                                                        <div className="dropdown_Items">Shirts</div>
                                                        <div className="dropdown_Items">Shoes</div>
                                                    </div>
                                                    <div className="Middle List">
                                                        <div className="Empty">XXXXXXXXX</div>
                                                        <div className="dropdown_Items">Shorts</div>
                                                        <div className="dropdown_Items">Socks</div>
                                                        <div className="dropdown_Items">Sweaters</div>
                                                        <div className="dropdown_Items">Swim Trunks</div>
                                                        <div className="dropdown_Items">Tank Tops</div>
                                                        <div className="dropdown_Items">Trousers</div>
                                                        <div className="dropdown_Items">T-Shirts</div>
                                                        <div className="dropdown_Items">Underwear</div>
                                                    </div>
                                                    <div className="Right List">
                                                        <div className="ArrowLink">
                                                            <div>ACCESSORIES</div>
                                                            <img className="Arrow" src={ArrowIcon} alt=""/>
                                                        </div>
                                                        <div className="dropdown_Items">Bags</div>
                                                        <div className="dropdown_Items">Gloves & Mittens</div>
                                                        <div className="dropdown_Items">Hair Accessories</div>
                                                        <div className="dropdown_Items">Hats</div>
                                                        <div className="dropdown_Items">Water Bottles</div>
                                                        <div className="dropdown_Items">Yoga Accessories</div>
                                                        <div className="dropdown_Items">Yoga Mats</div>
                                                        <div className="Empty">XXXXXXXXX</div>
                                                    </div>
                                                </div>
                                            </ul>
                                            <div className="dropdownMenu_Content_Right">
                                                <img
                                                    src="https://images.lululemon.com/is/image/lululemon/NA_MensQ3_Sept22_Wk2_MegaNav_Workout?$promoBlock$&wid=768&op_usm=0.8,1,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72"
                                                    alt=""/>
                                                <h2>Every motion, multiplied.</h2>
                                                <p>Do more than you came for, in breathable fabric and seamless
                                                    designs.</p>
                                                <div className="dropdownMenu_Content_Right_Link">
                                                    <div className="dropdown_Item">Shop Workout</div>
                                                    <img className="Arrow" src={ArrowIcon} alt=""/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="dropdownMenu_Footer">
                                            <div className="dropdownMenu_Footer_Left">ACTIVITY</div>
                                            <div className="dropdownMenu_Footer_Middle">
                                                <div className="dropdown_Items">Workout</div>
                                                <div className="dropdown_Items">Running</div>
                                                <div className="dropdown_Items">Casual</div>
                                                <div className="dropdown_Items">Golf</div>
                                                <div className="dropdown_Items">Tennis</div>
                                                <div className="dropdown_Items">Hiking</div>
                                            </div>
                                            <div className="dropdownMenu_Footer_Right">
                                                <div>SHOP ALL MEN</div>
                                                <img className="Arrow" src={ArrowIcon} alt=""/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="dropdown">
                                    <div className="Button" id="WOMEN">ACCESSORIES</div>
                                    <div className="dropdownMenu">
                                        <div className="dropdownMenu_Content">
                                            <ul className="dropdownMenu_Content_Left">
                                                <div className="dropdown_Items">What's New</div>
                                                <div className="dropdown_Items">Bestsellers</div>
                                                <div className="dropdown_Items">Reflective Accessories</div>
                                                <div className="dropdown_Items">Women's Socks</div>
                                                <div className="dropdown_Items">Men's Socks</div>
                                                <div className="dropdown_Items">Mini Bags</div>
                                                <div className="dropdown_Items">Travel Accessories</div>
                                                <div className="dropdown_Items" id="WMTM">We Made Too Much</div>
                                            </ul>
                                            <ul className="dropdownMenu_Content_Middle">
                                                <div className="grid_Container">
                                                    <div className="Left List">
                                                        <div className="ArrowLink">
                                                            <div>ACCESSORIES</div>
                                                            <img className="Arrow" src={ArrowIcon} alt=""/>
                                                        </div>
                                                        <div className="dropdown_Items">Backpacks</div>
                                                        <div className="dropdown_Items">Bags</div>
                                                        <div className="dropdown_Items">Beanies</div>
                                                        <div className="dropdown_Items">Belt Bags</div>
                                                        <div className="dropdown_Items">Crossbody Bags</div>
                                                        <div className="dropdown_Items">Gloves & Mittens</div>
                                                        <div className="dropdown_Items">Hair Accessories</div>
                                                    </div>
                                                    <div className="Middle List">
                                                        <div className="Empty">XXXXXXXXX</div>
                                                        <div className="dropdown_Items">Hats</div>
                                                        <div className="dropdown_Items">Keychains</div>
                                                        <div className="dropdown_Items">Scarves & Wraps</div>
                                                        <div className="dropdown_Items">Wallets & Pouches</div>
                                                        <div className="dropdown_Items">Water Bottles</div>
                                                        <div className="dropdown_Items">Yoga Accessories</div>
                                                        <div className="dropdown_Items">Yoga Mats</div>
                                                    </div>
                                                    <div className="Right List">
                                                        <div className="ArrowLink">
                                                            <div>SELFCARE</div>
                                                            <img className="Arrow" src={ArrowIcon} alt=""/>
                                                        </div>
                                                        <div className="dropdown_Items">Shop All Selfcare</div>
                                                        <div className="dropdown_Items">Learn More</div>
                                                        <div className="Empty">XXXXXXXXX</div>
                                                        <div className="Empty">XXXXXXXXX</div>
                                                        <div className="Empty">XXXXXXXXX</div>
                                                        <div className="Empty">XXXXXXXXX</div>
                                                        <div className="Empty">XXXXXXXXX</div>
                                                    </div>
                                                </div>
                                            </ul>
                                            <div className="dropdownMenu_Content_Right">
                                                <img
                                                    src="https://images.lululemon.com/is/image/lululemon/NA_Jul22_Wk4_W_Chargefeel_MegaNav_D_WorkoutShoe-1?$promoBlock$&wid=768&op_usm=0.8,1,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72"
                                                    alt=""/>
                                                <h2>The shoe that's always on.</h2>
                                                <p>Run. Train. Go. In chargefeel, pressing pause is optional.</p>
                                                <div className="dropdownMenu_Content_Right_Link">
                                                    <div className="dropdown_Item">Shop Shoes</div>
                                                    <img className="Arrow" src={ArrowIcon} alt=""/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="dropdownMenu_Footer">
                                            <div className="dropdownMenu_Footer_Left">ACTIVITY</div>
                                            <div className="dropdownMenu_Footer_Middle">
                                                <div className="dropdown_Items">Yoga</div>
                                                <div className="dropdown_Items">Running</div>
                                                <div className="dropdown_Items">Hiking</div>
                                                <div className="dropdown_Items">Workout</div>
                                                <div className="dropdown_Items">Tennis</div>
                                                <div className="dropdown_Items">Casual</div>
                                            </div>
                                            <div className="dropdownMenu_Footer_Right">
                                                <div>SHOP ALL ACCESSORIES</div>
                                                <img className="Arrow" src={ArrowIcon} alt=""/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="dropdown">
                                    <div className="Button">COMMUNITY</div>
                                    <div className="dropdownMenu">
                                        <div className="dropdownMenu_Content">
                                            <ul className="dropdownMenu_Content_Middle" id="COMMUNITY">
                                                <div className="grid_Container">
                                                    <div className="Right List">
                                                        <div className="ArrowLink">
                                                            <div>TEAM CANADA</div>
                                                            <img className="Arrow" src={ArrowIcon} alt=""/>
                                                        </div>
                                                        <div className="dropdown_Items">Team Canada Partnership</div>
                                                        <div className="Empty">XXXXXXXXX</div>
                                                        <div className="Empty">XXXXXXXXX</div>
                                                    </div>
                                                    <div className="Right List">
                                                        <div className="ArrowLink">
                                                            <div>SWEATLIFE</div>
                                                            <img className="Arrow" src={ArrowIcon} alt=""/>
                                                        </div>
                                                        <div className="dropdown_Items">At Home Workouts</div>
                                                        <div className="dropdown_Items">Run Training Plan</div>
                                                        <div className="dropdown_Items">Mindfulness Tools</div>
                                                    </div>
                                                    <div className="Right List">
                                                        <div className="ArrowLink">
                                                            <div>IMPACT</div>
                                                            <img className="Arrow" src={ArrowIcon} alt=""/>
                                                        </div>
                                                        <div className="dropdown_Items">Diversity And Conclusion</div>
                                                        <div className="Empty">XXXXXXXXX</div>
                                                        <div className="Empty">XXXXXXXXX</div>
                                                    </div>
                                                </div>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="Button" id="MIRROR">MIRROR</div>
                                <div className="Button" id="SHOES">SHOES</div>
                            </div>
                            <div className="Right">
                                <div className="SearchBar">
                                    <img className="SearchIcon" src={SearchIcon} alt=""/>
                                    <input type="text" placeholder="Search"/>
                                </div>
                                <div className="ShoppingBag">
                                    {totalQuantity >= 1 && <img className="Alarm" src={AlarmIcon} alt=""/>}
                                    <Link to={`/Checkout`}>
                                        {(totalQuantity < 1) ? (<div className="ItemsInCart emptyBag">0</div>) : (
                                            <div className="ItemsInCart">{totalQuantity}</div>)}
                                    </Link>
                                    <div className="ShowItemInBag"><CheckoutItemInBag/></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            }
            <header className="RD_Header">
                <div className="RD_Header_Navbar">
                    <div className="RD_Header_Navbar_Logo">
                        <img src={LogoIcon} alt=""/>
                    </div>
                    <div className="RD_Header_Navbar_Icons">
                        <img src={SignInIcon} alt=""/>
                        <img src={StoreLocatorIcon} alt=""/>
                        <img src={WishListIcon} alt=""/>
                        <img src={GiftCardsIcon} alt=""/>
                        <div className="RD_Header_Navbar_Icons_ShoppingBag">
                            <div className="RD_Header_Navbar_Icons_ShoppingBag_ItemsInCart">{totalQuantity}</div>
                        </div>
                        <MenuIcon className="RD_Header_Navbar_Icons_Menu"/>
                    </div>
                </div>
                {/*// unfinished hamburger menu*/}
                <div className="Hamburger">
                    <div className="LOGO">
                        <img id="LOGO" src={LogoIcon} alt=""/>
                        <img id="Exit" src={ExitMenuIcon} alt=""/>
                    </div>
                    <div className="NavButton">
                        <div>Women</div>
                        <img src={ShowListIcon} alt=""/>
                    </div>
                    <div className="NavButton">
                        <div>Men</div>
                        <img src={ShowListIcon} alt=""/>
                    </div>
                    <div className="NavButton">
                        <div>Accessories</div>
                        <img src={ShowListIcon} alt=""/>
                    </div>
                    <div className="NavButton">
                        <div>Community</div>
                        <img src={ShowListIcon} alt=""/>
                    </div>
                    <div className="NavButton">
                        <div>MIRROR</div>
                    </div>
                    <div className="NavButton">
                        <div>Shoes</div>
                    </div>
                    <div className="ExtraFeatures">
                        <div className="UpperLine">Lululemon Apps</div>
                        <div className="UpperLine">Track My Order</div>
                        <div className="BottomLine">Store Locator</div>
                    </div>
                    <div className="Language">
                        <img src={LanguageIcon} alt=""/>
                        <div>{Language} / Change Location</div>
                    </div>
                    {/*// unfinished hamburger menu*/}
                </div>
                <div className="RD_Header_SearchBar">
                    <img className="RD_Header_SearchBar_Icon" src={SearchIcon} alt=""/>
                    <input type="text" placeholder="Search"/>
                </div>
            </header>
        </>
    )
}
