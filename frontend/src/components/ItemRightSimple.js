import "../styles/ItemRight.scss"
import React, {useEffect, useRef, useState} from "react";
import actions from "../actions";
import {useDispatch, useSelector} from "react-redux";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export const ItemRightSimple = ({product}) => {

    console.log('original order', product)

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

    // initial state for store updated order
    const [order, setOrder] = useState(product)

    // initial state for store previous order
    const [previousOrder] = useState(product)

    useEffect(() => {
        setOrder(product)
        const updatedCheckSizeState = checkedSizeState.map(item => item = false)
        setCheckedSizeState(updatedCheckSizeState)

        return () => {
            setOrder(product)
        }

    }, [product])

    const arraySize = new Array(product?.sizeList[0]?.details.length > 0 ? product?.sizeList[0]?.details.length : 30).fill(0)
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
        console.log('size', size)
        setOrder(prevState => ({
            ...prevState,
            size: size
        }))
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
                    className={checkedState[index] ? "btnChecked" : "btnNotChecked"}
                    onClick={() => handleOnChange(index)}
                >
                    <img src={swatch} alt=""/>
                </button>
            </div>
        )
    }))
    let showSize = (product?.sizeList[0]?.details.map((item, index) => {
        // console.log(checkedSizeState[{index}])
        return (
            <div className="showSizeButton" key={index}>
                <button
                    id={`custom-checkbox-${index}`}
                    className={checkedSizeState[index] ? "btnChecked" : "btnNotChecked"}
                    onClick={() => handleOnSizeChange(index, item)}
                >{item}
                </button>
            </div>
        )
    }))

    let showBag = useSelector(state => state?.checkoutReducer?.showBag)

    const [showError, setShowError] = useState(false)
// 这里在把物品添加到购物车
//     const displayAddToBag = () => {
//         // console.log('show add bag')
//         dispatch(actions.checkoutAction.updateShowBag(true))
//         dispatch(actions.checkoutAction.addOrder(order))
//         dispatch(actions.checkoutAction.updateQuantity(1))
//         dispatch(actions.checkoutAction.updatePrice(order.price))
//     }

    const displayWarningMessage = () => {
        // console.log('show warning')
        setShowError(true)
    }

    console.log('updated order', order)

    return (
        <>
            <div className="ItemRight">
                <h1>{product?.productName}</h1>
                <h2>{product?.price}</h2>
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
                <div className="ShipBlock">
                    <div className="buttonDiv">
                        <button
                            onClick={() => {
                                dispatch(actions.checkoutAction.updateOrder({previousOrder, order}))
                                dispatch(actions.checkoutAction.showUpdatedItem(false))
                            }}
                        >UPDATE ITEM
                        </button>
                    </div>
                    <button>View product details</button>
                </div>
            </div>
            {/*<div className="RD_ItemRight">*/}
            {/*    <h1>{product?.name}</h1>*/}
            {/*    <div className="RD_Price">*/}
            {/*        <h2>{product?.price}</h2>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div className="RD_ColorDetails">*/}
            {/*    <h4>Colour</h4>*/}
            {/*    <p>Water Drop</p>*/}
            {/*    <h5>10 colours ></h5>*/}
            {/*</div>*/}
            {/*<div className="RD_showColor">{showColor}</div>*/}
            {/*<div className="RD_SizeDetail">*/}
            {/*    <h4>Select Size</h4>*/}
            {/*    <h4 className="SizeGuide">Size Guide</h4>*/}
            {/*</div>*/}
            {/*<div className="RD_showSize">{showSize}</div>*/}
            {/*<div className="RD_ShipBlock">*/}
            {/*    <div className="RD_buttonDiv">*/}
            {/*        <button className="AddToBag">ADD TO BAG</button>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*{showBag && <CheckoutAddToBag order={order}/>}*/}
        </>
    )
}


