import CreditCardIcon from '@mui/icons-material/CreditCard';
import TimerIcon from '@mui/icons-material/Timer';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import ClearIcon from '@mui/icons-material/Clear';
import "../styles/LogInPage.scss"
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loginAction, loginActionMark} from "../actions/loginAction";
import {useNavigate} from "react-router-dom";
import Header from "./Header";
import {Footer} from "./Footer";

export const space = " "

export const perks = ['Fast Track Refunds', 'Check out faster', 'Track Orders', 'Wish List', 'Tailored Suggestions']

export const LogInPage = () => {
    const Icons = [<CreditCardIcon/>, <TimerIcon/>, <AddLocationIcon/>, <FavoriteBorderIcon/>, <LocalMallIcon/>]

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    const handleSubmit = async () => {
        await dispatch(loginAction(email, password))
        await dispatch(loginActionMark())
        const token = localStorage.getItem('token')
        // console.log('toke in login', token)
        token && navigate('/')
    }

    const [isEmailEntered, setIsEmailEntered] = useState(false)
    const [isPasswordEntered, setIsPasswordEntered] = useState(false)

    const [isEmailValid, setIsEmailValid] = useState(false)

    function emailValidate(email) {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
    }

    const failedLogin = useSelector(state => state?.loginReducer?.failedMessage)

    return <>
        <Header/>
        <div className='logInHeaderContainer'>
            <h1 className='logInHeader'>The good stuff awaits</h1>
            <hr/>
        </div>
        <div className="contentContainer">
            <div className="perksContainer">
                <h3 className='perksContainer_FirstTitle'>
                    One account, twice the fun!
                </h3>
                <span className='perkCell'>
                    Use the same email address for online and in-store!
                </span>
                <h3 className='perksContainer_Title'>
                    Here are some of the perks
                </h3>
                <div className="perksContainer">
                    {perks.map((perk, index) => <div className='perkCell' key={index}>
                        <div className='perkCell_Icon'>
                            {Icons[index]}
                        </div>
                        <span className="perkCell_Des">
                            {perk}
                        </span>
                    </div>)}
                </div>
            </div>
            <div className="logInSec">
                <h3 className="logInSec_Title">
                    Sign in to your account
                </h3>
                {failedLogin &&
                    <div className="alert">
                        <div className="alert_Container">
                            <div className='alertMsg'>
                                <span>{failedLogin}</span>
                            </div>
                        </div>
                    </div>
                }
                <div className="email">
                    <label className="email_Label">Email address</label>
                    <div className="email_InputBox_Container">
                        <div className="email_InputBox">
                            <input type="text" onChange={evt => {
                                setEmail(evt.target.value)
                                setIsEmailEntered(true)
                                emailValidate(email) ? setIsEmailValid(true) : setIsEmailValid(false)
                            }}/>
                            {/*<ClearIcon style={{color: 'red'}}/>*/}
                        </div>
                        <div className='closeBtnContainer'>
                        </div>
                    </div>
                    {isEmailEntered && <>
                        {!isEmailValid && email && <div className="email_Msg">
                            <span>Email address is not in the correct format (xxx@yyy.zzz). Please correct the email address</span>
                        </div>}
                        {!email && <div className="email_Msg">
                            <span>Please enter an email address</span>
                        </div>}
                    </>}
                </div>
                <div className="password">
                    <label className="password_Label">Password</label>
                    <div className="password_InputBox_Container">
                        <div className="password_InputBox">
                            <input type="password"
                                   onChange={evt => {
                                       setPassword(evt.target.value)
                                       setIsPasswordEntered(true)
                                       console.log('password is', password)
                                       console.log('ispassword enter', isPasswordEntered)
                                   }}/>
                            {/*<ClearIcon style={{color: 'red'}}/>*/}
                        </div>
                    </div>
                    {isPasswordEntered && !password && <div className="password_Msg">
                        <span>Please enter your password</span>
                    </div>}
                </div>
                <div className="forgetPassword">
                    <a href="https://shop.lululemon.com/account/forgot-password">Forget your password?</a></div>
                {!isEmailValid || !email || !password ?
                    <button className="signInBtn" onClick={handleSubmit}
                            style={{backgroundColor: 'grey'}} disabled>
                        <span>SIGN IN</span>
                    </button> :
                    <button className="signInBtn" onClick={handleSubmit}>
                        <span>SIGN IN</span>
                    </button>}
                <div className='breakLn'>{space}</div>
                <div className="signUpBtn">
                    <a href="">Creat a lululemon account</a>
                </div>
            </div>
        </div>
        <Footer/>
    </>
}

