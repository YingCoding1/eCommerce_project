import "../styles/CheckoutHeader.scss"
import Logo from "../headerSvgIcons/LogoIcon.svg";
import {useNavigate} from "react-router-dom";

export const CheckoutHeader = () => {

  let navigate = useNavigate()

  return (
    <>
      <div className="CheckoutHeader">
        <img className="CheckoutHeader_Logo"
             src={Logo}
             onClick={() => {
               navigate("/")
             }}
             alt=""/>
      </div>
    </>
  )
}