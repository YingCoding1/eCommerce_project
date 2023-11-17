import "../styles/OrderSummary.scss"
import ShoppingBagIcon from "../headerSvgIcons/ShoppingBagIcon.svg"
import dropdownIcon from "../headerSvgIcons/dropdownIcon.svg"
import {useDispatch, useSelector} from "react-redux";

export const OrderSummary = () => {

    const orderList = useSelector(state => state?.checkoutReducer?.orderList)
    const totalQuantity = useSelector(state => state?.checkoutReducer?.totalQuantity)
    const totalPrice = useSelector(state => state?.checkoutReducer?.totalPrice)


  return (
      <>
          <div className="OrderSummary">
              <div className="OrderSummary_Header">
                  Order Summary
              </div>
              <div className="OrderSummary_SubHeader">
                  <div className="OrderSummary_SubHeader_ItemNumber">
                      <img className="OrderSummary_SubHeader_ItemNumber_ShoppingBagIcon" src={ShoppingBagIcon} alt=""/>
                      { (totalQuantity <= 1) ? <p className="OrderSummary_SubHeader_ItemNumber_Text">( {totalQuantity} item)</p> : <p className="OrderSummary_SubHeader_ItemNumber_Text">( {totalQuantity} items)</p>}
                      <img className="OrderSummary_SubHeader_ItemNumber_DropdownIcon" src={dropdownIcon} alt=""/>
                  </div>
                  <div className="OrderSummary_SubHeader_Total">${totalPrice.toFixed(2)}</div>
              </div>
              <div className="OrderSummary_Products">
                  {orderList && orderList.map((order, index) =>
                  <div className="OrderSummary_Products_SingleProduct" key={index}>
                          <img className="OrderSummary_Products_SingleProduct_Image" src={order.imageList[0]} alt="" />
                      <div className="OrderSummary_Products_SingleProduct_Details">
                          <div className="OrderSummary_Products_SingleProduct_Details_ProductName">{order.productName}</div>
                          <div className="OrderSummary_Products_SingleProduct_Details_ColorName">{order.colorName}</div>
                          <div className="OrderSummary_Products_SingleProduct_Details_Size">Size {order.size}</div>
                          <div className="OrderSummary_Products_SingleProduct_Details_QuantityAndTotal">
                              <div className="OrderSummary_Products_SingleProduct_Details_QuantityAndTotal_Quantity">Quantity {order.quantity}</div>
                              <div className="OrderSummary_Products_SingleProduct_Details_QuantityAndTotal_">${order.totalPrice.toFixed(2)}</div>
                          </div>
                      </div>
                  </div>
                      )}
              </div>
              <div className="OrderSummary_Cost">
                  <div className="OrderSummary_Cost_Item">
                      <p className="OrderSummary_Cost_Item_Text">Subtotal</p>
                      <p className="OrderSummary_Cost_Item_Text">${totalPrice.toFixed(2)}</p>
                  </div>
                  <div className="OrderSummary_Cost_Item">
                      <p className="OrderSummary_Cost_Item_Text">Shipping</p>
                      <p className="OrderSummary_Cost_Item_Text">FREE</p>
                  </div>
                  <div className="OrderSummary_Cost_Item">
                      <p className="OrderSummary_Cost_Item_Text">Tax</p>
                      <p className="OrderSummary_Cost_Item_Text">Calculated at next step</p>
                  </div>
              </div>
              <div className="OrderSummary_Total">
                  <p className="OrderSummary_Total_Text">Order total</p>
                  <p className="OrderSummary_Total_Text">CAD ${totalPrice.toFixed(2)}</p>
              </div>
          </div>

      </>
  )
}