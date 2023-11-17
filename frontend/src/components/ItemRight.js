import "../styles/ItemRight.scss"
import React, {useEffect, useRef, useState} from "react";
import houseLogo from "../headerSvgIcons/svgexport-29.svg"
import afterpayLogo from "../headerSvgIcons/svgexport-afterpay.svg"
import starLogo from "../headerSvgIcons/svgexport-star.svg"
import heartLogo from "../headerSvgIcons/svgexport-heart.svg"
import ArrowIcon from "../headerSvgIcons/ArrowIcon.svg"
import actions from "../actions";
import {useDispatch, useSelector} from "react-redux";
import {CheckoutAddToBag} from "./CheckoutAddToBag";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export const ItemRight = ({product}) => {

    console.log('product', product)

    // console.log('item right', product)
    const dispatch = useDispatch()

    let colorId = useSelector(state => state?.productReducer?.updateColorId)

    const images = product?.images?.map(element => {
        const imageList = element?.mainCarousel?.media?.split(" | ")
        element.images = imageList
        return element
    })

    const image = images?.filter(image => image?.colorId === colorId)

    const updateImage = updatedColorId => {
        const updatedImage = images?.filter(image => image?.colorId === updatedColorId)
        setOrder(prevState => ({
            ...prevState,
            imageList: updatedImage[0]?.images
        }))
    }

    // initial state for order
    const [order, setOrder] = useState({
        productId: product?.productId,
        productName: product?.name,
        price: parseInt(product?.price?.slice(1, -4)),
        size: null,
        quantity: 1,
        colorId: colorId,
        colorName: image[0]?.colorAlt,
        totalPrice: parseInt(product?.price?.slice(1, -4)),
        imageList: image[0]?.images,
        images: product?.images,
        swatches: product?.swatches,
        sizeList: product?.sizes
    })

    useEffect(() => {
        setOrder(prevState => ({
            ...prevState,
            productId: product?.productId,
            productName: product?.name,
            price: parseInt(product?.price?.slice(1, -4)),
            size: product?.sizes[0]?.details.length === 0 ? 'One Size' : null,
            quantity: 1,
            colorId: colorId,
            colorName: image[0]?.colorAlt,
            totalPrice: parseInt(product?.price?.slice(1, -4)),
            imageList: image[0]?.images,
            images: product?.images,
            swatches: product?.swatches,
            sizeList: product?.sizes
        }))
        const updatedCheckSizeState = checkedSizeState.map(item => item = false)
        setCheckedSizeState(updatedCheckSizeState)

    }, [product])

    const arraySize = new Array(product?.sizes[0]?.details.length > 0 ? product?.sizes[0]?.details.length : 30).fill(0)
    const arrayColor = new Array(product?.images.length > 0 ? product?.images.length : 30).fill(0)
    const [checkedState, setCheckedState] = useState(arrayColor)
    const [checkedSizeState, setCheckedSizeState] = useState(arraySize)
    // console.log(checkedSizeState, checkedState)
    const handleOnChange = (position) => {

        setOrder(prevState => ({
            ...prevState,
            colorId: product?.swatches[position]?.colorId,
            colorName: product?.swatches[position]?.swatchAlt

        }))

        updateImage(product?.swatches[position]?.colorId)

        const updatedCheckState = checkedState.map(
            (item, index) => {
                return position === index ? !item : false
            }
        )
        // const updatedCheckState = checkedState[position]= !item
        dispatch(actions.productAction.updateColorId(product.swatches[position].colorId))
        setCheckedState(updatedCheckState)
    }
    const handleOnSizeChange = (position, size) => {
        if (order.size === size) {
            setOrder(prevState => ({
                ...prevState,
                size: null
            }))
        } else {
            setOrder(prevState => ({
                ...prevState,
                size: size
            }))
        }

        setShowError(false)
        const updatedCheckSizeState = checkedSizeState.map(
            (item, index) => {
                return position === index ? !item : false
            }
        )
        setCheckedSizeState(updatedCheckSizeState)
        // console.log('handleChange', checkedState)
    }
    let showColor = (product?.swatches.map(({swatch}, index) => {
        return (
            <div key={index}>
                <button
                    style={{backgroundImage: {swatch}}}
                    id={`custom-checkbox-${index}`}
                    // checked={isChecked}
                    className={checkedState[index] ? "btnChecked" : "btnNotChecked"}
                    onClick={() => handleOnChange(index)}
                >
                    <img src={swatch} alt=""/>
                </button>
                {/*<label htmlFor="">{alt}</label>*/}
                {/*<hr style={{display: name === "sizeDivider" ? true : "none"}}/>*/}
                {/*<img>{swatch}?{swatch}: </img>*/}
            </div>
        )
    }))
    let showSize = (product?.sizes[0].details.map((item, index) => {
        // console.log(checkedSizeState[{index}])
        return (
            <div className="showSizeButton" key={index}>
                <button
                    // style={{backgroundImage: {swatch}, display: name === "sizeDivider" ? "none" : true}}
                    id={`custom-checkbox-${index}`}
                    // name={name}
                    // value={name}
                    // checked={isChecked}
                    className={checkedSizeState[index] ? "btnChecked" : "btnNotChecked"}
                    onClick={() => handleOnSizeChange(index, item)}
                >{item}
                    {/*<img src={swatch} alt=""/>*/}
                </button>
                {/*<label htmlFor="">{alt}</label>*/}
                {/*<hr style={{display: name === "sizeDivider" ? true : "none"}}/>*/}
                {/*<img>{swatch}?{swatch}: </img>*/}
            </div>
        )
    }))

    let showBag = useSelector(state => state?.checkoutReducer?.showBag)

    const [showError, setShowError] = useState(false)

    const displayAddToBag = () => {
        // console.log('show add bag')
        dispatch(actions.checkoutAction.updateShowBag(true))
        dispatch(actions.checkoutAction.addOrder(order))
        dispatch(actions.checkoutAction.addSingleOrder(order))
        setOrder(prevState => ({
            ...prevState,
            productId: product?.productId,
            productName: product?.name,
            price: parseInt(product?.price?.slice(1, -4)),
            size: null,
            quantity: 1,
            colorId: colorId,
            colorName: image[0]?.colorAlt,
            totalPrice: parseInt(product?.price?.slice(1, -4)),
            imageList: image[0]?.images,
            images: product?.images,
            swatches: product?.swatches,
            sizeList: product?.sizes
        }))
        const updatedCheckSizeState = checkedSizeState.map(item => item = false)
        setCheckedSizeState(updatedCheckSizeState)
        dispatch(actions.checkoutAction.updateQuantity(1))
        dispatch(actions.checkoutAction.updatePrice(order.price))
    }

    const displayWarningMessage = () => {
        // console.log('show warning')
        setShowError(true)
    }

    // console.log('order item right', order)
    return (
        <>
            <div className="ItemRight">
                <h1>{product?.name}</h1>
                <h2>{product?.price}</h2>
                <div className="afterpay"><h3>or 4 payments of $14.50 with</h3> <img src={afterpayLogo} alt=""/></div>
                <div className="Colour"><h4>Colour</h4></div>
                <div className="showColor">{showColor}</div>
                {showError &&
                    <div className="ItemRight_WarningMessage">
                        <ErrorOutlineIcon className="ItemRight_WaringMessage_Error"
                                          style={{fill: '#d22030', width: '24px'}}/>
                        <p>Please select a size.</p>
                    </div>
                }
                <div className="SizeText">
                    <h4>Select Size</h4>
                    <h4 className="SizeGuide">Size Guide</h4>
                </div>
                <div className="showSize">{showSize}</div>
                <div className="WhatsMySize">
                    <div>T</div>
                    <h4>What's my size?</h4>
                </div>
                <div className="ShipBlock">
                    <div className="ShipIt">
                        <h1>Ship it to me</h1>
                        <h5>Free shipping and returns</h5>
                    </div>
                    <div className="PickUp">
                        <img src={houseLogo} alt=""/>
                        <p>Pick up in-store</p>
                    </div>
                    <div className="buttonDiv">
                        <button
                            onClick={order.size ? displayAddToBag : displayWarningMessage}
                        >ADD TO BAG
                        </button>
                    </div>
                </div>
                <div className="heartAndstar">
                    <div className="heart">
                        <img src={heartLogo} alt=""/>
                        <div className="text">Add to Wish List</div>
                    </div>
                    <div className="star">
                        <img src={starLogo} alt=""/>
                        <div className="text">Reviews</div>
                    </div>
                </div>
                <div className="details">
                    <h2>Details</h2>
                    {product?.featureTitles?.map((element, index) => (
                        <div className="details_row" key={index}>
                            <img src={element.iconPath} alt=""/>
                            <div>{element.title}</div>
                        </div>
                    ))}
                </div>
                <div className="Ques">
                    <div className="Text">
                        <h2>Questions? Bring them on (all of them)</h2>
                        <h3>Virtual shop with one of our educators</h3>
                    </div>
                    <div className="img">
                        < img src={ArrowIcon} alt=""/>
                    </div>
                </div>
            </div>
            <div className="RD_ItemRight">
                <h1>{product?.name}</h1>
                <div className="RD_Price">
                    <h2>{product?.price}</h2>
                </div>
                <div className="RD_afterpay"><h3>or 4 payments of $14.50 with</h3> <img src={afterpayLogo} alt=""/>
                </div>
                <div className="RD_ColorDetails">
                    <h4>Colour</h4>
                    <p>Water Drop</p>
                    <h5>10 colours ></h5>
                </div>
                <div className="RD_showColor">{showColor}</div>
                {showError &&
                    <div className="RD_ItemRight_WarningMessage">
                        <ErrorOutlineIcon className="RD_ItemRight_WaringMessage_Error"
                                          style={{fill: '#d22030', width: '24px'}}/>
                        <p>Please select a size.</p>
                    </div>
                }
                <div className="RD_SizeDetail">
                    <h4>Select Size</h4>
                    <h4 className="SizeGuide">Size Guide</h4>
                </div>
                <div className="RD_showSize">{showSize}</div>
                <div className="WhatsMySize">
                    <div>T</div>
                    <h4>What's my size?</h4>
                </div>
                <div className="RD_ShipBlock">
                    <div className="RD_ShipIt">
                        <h1>Ship it to me</h1>
                        <h5>Free shipping and returns</h5>
                    </div>
                    <div className="RD_PickUp">
                        <img src={houseLogo} alt=""/>
                        <h4>Pick up in-store</h4>
                    </div>
                    <div className="RD_buttonDiv">
                        <button
                            onClick={order.size ? displayAddToBag : displayWarningMessage}
                            className="AddToBag">ADD TO BAG
                        </button>
                    </div>
                </div>
                <div className="RD_heartAndstar">
                    <div className="RD_heart">
                        <img src={heartLogo} alt=""/>
                        <div>Add to Wish List</div>
                    </div>
                    <div className="RD_star">
                        <img src={starLogo} alt=""/>
                        <div>Reviews</div>
                    </div>
                </div>
                <div className="RD_Ques">
                    <div className="Text">
                        <h2>Questions?</h2>
                        <h2>Bring them on (all of them)</h2>
                        <h3>Virtual shop with one of our educators</h3>
                    </div>
                    <div className="img">
                        < img src={ArrowIcon} alt=""/>
                    </div>
                </div>
            </div>
            {showBag && <CheckoutAddToBag/>}
        </>
    )
}
