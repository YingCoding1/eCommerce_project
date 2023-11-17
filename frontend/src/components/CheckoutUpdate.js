import Modal from "@mui/material/Modal";
import {useDispatch, useSelector} from "react-redux";
import actions from "../actions";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import "../styles/CheckoutUpdate.scss"
import {useEffect, useState} from "react";
import Box from '@mui/material/Box';

import SwipeableViews from 'react-swipeable-views';
import {useTheme} from "@mui/material";

export const CheckoutUpdate = ({product}) => {

    let singleOrder = useSelector(state => state.checkoutReducer.singleOrder)

    console.log('single order update', singleOrder)

    const [order, setOrder] = useState(singleOrder)

    const [sizeSelection, setSizeSelection] = useState(singleOrder.size)

    const [colorSelection, setColorSelection] = useState(singleOrder.colorId)

    const [imageIndex, setImageIndex] = useState(0)

    useEffect(() => {
        setSizeSelection(order.size)
        setColorSelection(order.colorId)
    }, [order])

    useEffect(() => {
        setOrder(singleOrder)
    }, [singleOrder])

    const dispatch = useDispatch()

    let isShow = useSelector(state => state?.checkoutReducer?.showUpdatedItem)

    const handleClose = () => {
        dispatch(actions.checkoutAction.showUpdatedItem(false))
        setOrder(singleOrder)
        setImageIndex(0)
    }

    const updatedImageList = colorId => {
        const filterImages = order.images.filter(element => element.colorId === colorId)
        const filterImageList = filterImages[0].mainCarousel.media.split(" | ")
        setOrder(prevState => ({
            ...prevState,
            imageList: filterImageList
        }))
    }

    const handleSizeChange = event => {
        console.log('event', event.target.outerText)
        setSizeSelection(event.target.outerText)
        setOrder(prevState => ({
            ...prevState,
            size: event.target.outerText
        }))
    }

    const handleColorChange = (colorId, swatchAlt) => {
        console.log('color id', colorId)
        setColorSelection(colorId)

        setOrder(prevState => ({
            ...prevState,
            colorId: colorId,
            colorName: swatchAlt
        }))

        updatedImageList(colorId)
    }

    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);

    const handleStepChange = (step) => {
        setActiveStep(step);
    }

    return (
        <>
            <Modal
                open={isShow}
                onClose={handleClose}
                style={{overflow: 'scroll'}}
            >
                <form className="CheckoutUpdate">
                    <div className="CheckoutUpdate_Left">
                        <img className="CheckoutUpdate_Left_Image" src={order.imageList[imageIndex]} alt=""/>
                        {
                            imageIndex > 0 &&
                            <div className="CheckoutUpdate_Left_LeftIcon"
                                 onClick={() => {
                                     setImageIndex(imageIndex - 1)
                                 }}
                            >
                                <ArrowBackIosIcon
                                />
                            </div>
                        }
                        {imageIndex < singleOrder.imageList.length - 1 &&
                            <div className="CheckoutUpdate_Left_RightIcon"
                                 onClick={() => {
                                     setImageIndex(imageIndex + 1)
                                 }}>
                                <ArrowForwardIosIcon/>
                            </div>
                        }
                    </div>
                    <div className="RD_CheckoutUpdate_Left">
                        <div className="RD_CheckoutUpdate_Left_Close" onClick={handleClose}>X</div>
                        <Box sx={{maxWidth: 390, flexGrow: 1}}>
                            <SwipeableViews
                                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                index={activeStep}
                                onChangeIndex={handleStepChange}
                                enableMouseEvents
                            >
                                {
                                    order.imageList.map((image, index) => (
                                        <div key={index}>
                                            {Math.abs(activeStep - index) <= 2 ? (
                                                    <Box
                                                        component="img"
                                                        sx={{
                                                            display: 'block',
                                                            maxWidth: 390,
                                                            overflow: 'hidden',
                                                            width: '100%',
                                                        }}
                                                        src={image}
                                                    />)
                                                : null}
                                        </div>

                                    ))
                                }
                            </SwipeableViews>
                        </Box>
                        <div className="RD_CheckoutUpdate_Left_Dots">
                            {order.imageList.map((image, index) =>
                                <div key={index}
                                     className="RD_CheckoutUpdate_Left_Dots_Dot"
                                     onClick={() => {
                                         handleStepChange(index)
                                     }}
                                     style={{backgroundColor: activeStep === index ? '#303030' :'#c0c0c0'}}
                                >
                                </div>)
                            }
                        </div>
                    </div>
                    <div className="CheckoutUpdate_Right">
                        <div className="CheckoutUpdate_Right_Close"
                             onClick={handleClose}
                        >X
                        </div>
                        <div className="CheckoutUpdate_Right_ProductName">{order.productName}</div>
                        <div className="CheckoutUpdate_Right_Price">$ {order.price.toFixed(2)}</div>
                        <div className="CheckoutUpdate_Right_ColorName">Color: {order.colorName}</div>
                        <div className="CheckoutUpdate_Right_ColorSelector">
                            {order.swatches.map((element, index) =>
                                <img
                                    src={element.swatch}
                                    key={index}
                                    className="CheckoutUpdate_Right_ColorSelector_Color"
                                    onClick={() => handleColorChange(element.colorId, element.swatchAlt)}
                                    style={{border: element.colorId === colorSelection ? '2px solid black' : '2px solid white'}}
                                />
                            )}
                        </div>
                        <div className="CheckoutUpdate_Right_Size">Size: {order.size}</div>
                        <div className="CheckoutUpdate_Right_SizeSelector">
                            {order.sizeList[0].details.map((element, index) =>
                                <div
                                    key={index}
                                    onClick={handleSizeChange}
                                    value={element}
                                    className={element === sizeSelection ?
                                        'CheckoutUpdate_Right_SizeSelector_Size_Checked' :
                                        'CheckoutUpdate_Right_SizeSelector_Size_Unchecked'}
                                >
                                    {element}
                                </div>
                            )}
                        </div>
                        <div className="CheckoutUpdate_Right_UpdateBtn">
                            <button
                                onClick={() => {
                                    handleClose()
                                    dispatch(actions.checkoutAction.updateOrder({singleOrder, order}))
                                }}
                            >
                                UPDATE ITEM
                            </button>
                        </div>
                        <div className="CheckoutUpdate_Right_Detail">
                            View product details
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    )
}