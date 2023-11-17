import "../styles/CheckoutMyBagCard.scss"
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import actions from "../actions";
import down from "../headerSvgIcons/down.svg"
import Modal from "@mui/material/Modal";

import {MyVerticallyCenteredModal} from "./CheckoutUpdateItem";
import {CheckoutUpdate} from "./CheckoutUpdate";

export const CheckoutMyBagCard = ({product}) => {

    // console.log('product from checkout my bag', product)
    const dispatch = useDispatch()

    let showUpdatedItem = useSelector(state => state.checkoutReducer.showUpdatedItem)

    const [singleProduct, setSingleProduct] = useState(
        {
            productId: product?.productId,
            productName: product?.productName,
            price: product?.price,
            size: product?.size,
            quantity: product.quantity,
            colorId: product?.colorId,
            colorName: product?.colorName,
            totalPrice: product?.totalPrice,
            imageList: product?.imageList,
            images: product?.images,
            swatches: product?.swatches,
            sizeList: product?.sizeList
        }
    )

    useEffect(() => {

        setSingleProduct(prevState => ({
            ...prevState,
            productId: product?.productId,
            productName: product?.productName,
            price: product?.price,
            size: product?.size,
            quantity: product.quantity,
            colorId: product?.colorId,
            colorName: product?.colorName,
            totalPrice: product?.totalPrice,
            imageList: product?.imageList,
            images: product?.images,
            swatches: product?.swatches,
            sizeList: product?.sizeList
        }))

    }, [product])

    const [changedQuantity, setChangedQuantity] = useState(0)
    const [changedTotalPrice, setChangeTotalPrice] = useState(0)
    const [optionShow, setOptionShow] = useState(false)
    const Quantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    // console.log("this is single product", singleProduct)

    const checkOpt = (item) => {

        setChangedQuantity(item - singleProduct.quantity)
        setChangeTotalPrice(singleProduct.price * (item - singleProduct.quantity))
        setSingleProduct(prevState => ({
            ...prevState,
            quantity: item,
            totalPrice: item * product?.price
        }))
        setOptionShow(false)

    }

    useEffect(() => {
        dispatch(actions.checkoutAction.updateOrderQuantity(singleProduct))
    }, [singleProduct])

    useEffect(() => {
        dispatch(actions.checkoutAction.updateQuantity(changedQuantity))
    }, [changedQuantity])

    useEffect(() => {
        dispatch(actions.checkoutAction.updatePrice(changedTotalPrice))
    }, [changedTotalPrice])

    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        setModalShow(showUpdatedItem)
    }, [showUpdatedItem])

    const [isShowRemove, setIsShowRemove] = useState(false)

    const handleClose = () => {
        setIsShowRemove(false)
    }

    return (
        <>
            <div className="CheckoutMyBagCard_Container">
                <div className="CheckoutMyBagCard_Container_ProductImgs">
                    <img
                        onClick={() => {
                            dispatch(actions.checkoutAction.showUpdatedItem(true))
                            dispatch(actions.checkoutAction.addSingleOrder(product))
                        }}
                        src={product?.imageList[0]}
                        alt=""
                    />
                </div>
                <div className="CheckoutMyBagCard_Container_RightProductInformation">
                    <div
                        onClick={() => {
                            dispatch(actions.checkoutAction.showUpdatedItem(true))
                            dispatch(actions.checkoutAction.addSingleOrder(product))
                        }}
                        type="button"
                        className="CheckoutMyBagCard_Container_RightProductInformation_ProductName">
                        {product?.productName}
                    </div>
                    <div className="CheckoutMyBagCard_Container_RightProductInformation_ColorName">
                        {product?.colorName}
                    </div>
                    <div className="CheckoutMyBagCard_Container_RightProductInformation_ProductDetail">
                        {/*<div><MyVerticallyCenteredModal*/}
                        {/*    show={modalShow}*/}
                        {/*    onHide={() => setModalShow(false)}*/}
                        {/*    // modalIsOpen={modalIsOpen}*/}
                        {/*    product={singleProduct}*/}
                        {/*    // setIsOpen={setIsOpen}*/}
                        {/*/>*/}
                        {/*</div>*/}
                        <div className="CheckoutMyBagCard_Container_RightProductInformation_ProductDetail_Size">
                            {product?.size}
                            <div
                                className="CheckoutMyBagCard_Container_RightProductInformation_ProductDetail_Size_Edit">
                                <button
                                    onClick={() => {
                                        dispatch(actions.checkoutAction.showUpdatedItem(true))
                                        dispatch(actions.checkoutAction.addSingleOrder(product))
                                    }}
                                >
                                    {/*    <button onClick={openModal}>Open Modal</button>*/}
                                    Edit
                                </button>
                            </div>
                        </div>
                        <div
                            className="CheckoutMyBagCard_Container_RightProductInformation_ProductDetail_RightInfo">
                            <div
                                className="CheckoutMyBagCard_Container_RightProductInformation_ProductDetail_RightInfo_ItemPrice">
                                <div
                                    className="CheckoutMyBagCard_Container_RightProductInformation_ProductDetail_RightInfo_ItemPrice_PriceTag">
                                    Item Price
                                </div>
                                <div
                                    className="CheckoutMyBagCard_Container_RightProductInformation_ProductDetail_RightInfo_ItemPrice_Amount">
                                    ${product?.price}.00
                                </div>
                            </div>
                            <div
                                className="CheckoutMyBagCard_Container_RightProductInformation_ProductDetail_RightInfo_Quantity">
                                <div
                                    className="CheckoutMyBagCard_Container_RightProductInformation_ProductDetail_RightInfo_Quantity_QuantityTag">
                                    Quantity
                                </div>
                                <div className="cusSelect">
                                    <div onClick={() => {

                                        setOptionShow(!optionShow)
                                    }}>
                                        <span>{singleProduct?.quantity}</span>
                                        <img src={down} className={optionShow ? 'trans' : ''}/>
                                    </div>
                                    {

                                        optionShow ? (

                                            <div>
                                                {Quantity.map((Quantity, number) => (

                                                    <div key={number}
                                                         onClick={checkOpt.bind(this, Quantity)}>
                                                        <span>{Quantity}</span>
                                                    </div>

                                                ))}
                                            </div>

                                        ) : null

                                    }
                                </div>
                            </div>
                            <div
                                className="CheckoutMyBagCard_Container_RightProductInformation_ProductDetail_RightInfo_TotalAmount">
                                <div
                                    className="CheckoutMyBagCard_Container_RightProductInformation_ProductDetail_RightInfo_TotalAmount_TotalAmountTag">
                                    Total Price
                                </div>
                                <div
                                    className="CheckoutMyBagCard_Container_RightProductInformation_ProductDetail_RightInfo_TotalAmount_TotalPrice">
                                    ${singleProduct.totalPrice}.00
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="CheckoutMyBagCard_Container_RightProductInformation_BottomInfo">
                        <div
                            className="CheckoutMyBagCard_Container_RightProductInformation_BottomInfo_FreeShipping">
                            Free Shipping+Free Return
                        </div>
                        <div
                            className="CheckoutMyBagCard_Container_RightProductInformation_BottomInfo_RightInfo">
                            <div
                                className="CheckoutMyBagCard_Container_RightProductInformation_BottomInfo_RightInfo_SaveForLater">
                                Save for Later
                            </div>
                            <hr className="lineBetweenWord"/>
                            <div
                                className="CheckoutMyBagCard_Container_RightProductInformation_BottomInfo_RightInfo_RemoveButton"
                                onClick={() => setIsShowRemove(true)

                                }
                            >
                                Remove
                            </div>
                            <div
                                className="CheckoutMyBagCard_Container_RightProductInformation_BottomInfo_RightInfo_X"
                                onClick={() => {
                                    dispatch(actions.checkoutAction.removeOrder(singleProduct))
                                    dispatch(actions.checkoutAction.updateQuantity(-singleProduct.quantity))
                                    dispatch(actions.checkoutAction.updatePrice(-singleProduct.totalPrice))
                                }}
                            >
                                X
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="underLine"/>
            </div>
            <CheckoutUpdate product={product}/>
            <Modal
                open={isShowRemove}
                onClose={handleClose}
            >
                <form className="RemoveButtonForm">
                    <div>
                        <div className="RemoveButtonForm_Close"
                             onClick={handleClose}
                        >X</div>
                        <div className="RemoveButtonForm_Text">Are you sure you want to remove this item from your bag?</div>
                        <button className="RemoveButtonForm_Button"
                        onClick={() => {
                            setIsShowRemove(false)
                            dispatch(actions.checkoutAction.removeOrder(singleProduct))
                            dispatch(actions.checkoutAction.updateQuantity(-singleProduct.quantity))
                            dispatch(actions.checkoutAction.updatePrice(-singleProduct.totalPrice))
                        }}
                        >
                            Yes, Remove this item
                        </button>
                        <div className="RemoveButtonForm_Keep"
                        onClick={handleClose}
                        >
                            No, keep this item</div>
                    </div>
                </form>
            </Modal>
        </>
    )
}
