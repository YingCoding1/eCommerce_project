import Modal from "@mui/material/Modal";
import "../styles/CheckoutAddToBag.scss"
import {useDispatch, useSelector} from "react-redux";
import actions from "../actions";
import ShoppingBag from "../headerSvgIcons/ShoppingBagIcon.svg";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import {Link} from "react-router-dom";
import {saveRecentView} from "../Helper";
import {useEffect, useState, useRef, useLayoutEffect, useCallback} from "react";

export const CheckoutAddToBag = () => {

    let order = useSelector(state => state.checkoutReducer.singleOrder)
    console.log("order in check add to bag", order)
    const dispatch = useDispatch()
    let isShow = useSelector(state => state?.checkoutReducer?.showBag)
    let totalQuantity = useSelector(state => state?.checkoutReducer?.totalQuantity)
    let totalPrice = useSelector(state => state?.checkoutReducer?.totalPrice)
    const handleClose = () => dispatch(actions.checkoutAction.updateShowBag(false));
    let products = useSelector(state => state?.productReducer?.totalProducts)

    let isDown = false;
    let startX;
    let scrollLeft;
    const [contentRef, setContentRef] = useState(null)

    useEffect(() => {
        if (isShow && contentRef) {
            console.log(contentRef)
            contentRef?.addEventListener('mousedown', (e) => {
                isDown = true;
                contentRef?.classList.add('active');
                startX = e.pageX - contentRef?.offsetLeft;
                scrollLeft = contentRef?.scrollLeft;
            });
            contentRef?.addEventListener('mouseleave', () => {
                isDown = false;
                contentRef?.classList.remove('active');
            });
            contentRef?.addEventListener('mouseup', () => {
                isDown = false;
                contentRef?.classList.remove('active');
            });
            contentRef?.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - contentRef?.offsetLeft;
                const walk = (x - startX) * 3; //scroll-fast
                contentRef.scrollLeft = scrollLeft - walk;
            });
        }

    }, [contentRef, isShow])

    let sourceName = order.productName.split(" ")
    const [updateSize, setUpdatedSize] = useState(order.size)
    useEffect(() => {
        setUpdatedSize(order.size)
    }, [order])
    // get similar products
    const similarProducts = products.filter(product => {
        const targetName = product?.name.split(" ")
        return (product?.productId !== order.productId && sourceName.some(value => targetName.includes(value)))
    })
    // set front and hover image from mainCarousel for similar products
    similarProducts.forEach(object => {
        // console.log(object)
        const imageList = object?.images[0]?.mainCarousel?.media?.split(" | ")
        object.one = imageList[0]
    })
    // display four similar products
    const fourSimilarProducts = similarProducts?.length > 4 && similarProducts?.slice(0, 4)

    // console.log(fourSimilarProducts)
    return (
        <>
            <Modal
                open={isShow}
                onClose={handleClose}
                style={{overflow: 'scroll'}}
            >
                <form action="" className="CheckoutAddToBag">
                    <div className="CheckoutAddToBag_Header">
                        <div className="CheckoutAddToBag_Header_Heading">Added To Your Bag</div>
                        <img className="CheckoutAddToBag_Header_BagIcon" src={ShoppingBag}/>
                        <div className="CheckoutAddToBag_Header_Quantity">{totalQuantity} Items</div>
                        <div
                            className="CheckoutAddToBag_Header_Close"
                            onClick={handleClose}
                        >
                            X
                        </div>
                    </div>
                    <hr/>
                    <div className="CheckoutAddToBag_OrderSection">
                        <div className="CheckoutAddToBag_OrderSection_Left">
                            <img className="CheckoutAddToBag_OrderSection_Left_Image" src={order?.imageList[0]}/>
                            <div className="CheckoutAddToBag_OrderSection_Left_Info">
                                <div className="CheckoutAddToBag_OrderSection_Left_Info_Name">
                                    {order?.productName}
                                </div>
                                <div className="CheckoutAddToBag_OrderSection_Left_Info_Size">
                                    Size: {order?.size}
                                </div>
                                <div className="CheckoutAddToBag_OrderSection_Left_Info_Price">
                                    ${order.price.toFixed(2)} CAD
                                </div>
                                <div className="CheckoutAddToBag_OrderSection_Left_Info_FinalSale">
                                    <p>Final Sale</p>
                                    <ErrorOutlineIcon
                                        className="CheckoutAddToBag_OrderSection_Left_Info_FinalSale_Icon"/>
                                </div>
                            </div>
                        </div>
                        <div className="CheckoutAddToBag_OrderSection_Right">
                            <div className="CheckoutAddToBag_OrderSection_Right_Subtotal">
                                <p>Subtotal</p>
                                <p>${totalPrice.toFixed(2)} CAD</p>
                            </div>
                            <Link
                                to={`/checkout`}
                                className="CheckoutAddToBag_OrderSection_Right_Link"
                            >
                                <button className="CheckoutAddToBag_OrderSection_Right_Link_Btn"
                                        onClick={handleClose}
                                >
                                    VIEW BAG &CHECKOUT
                                </button>
                            </Link>
                            <div className="CheckoutAddToBag_OrderSection_Right_Continue"
                                 onClick={handleClose}
                            >
                                Continue Shopping
                            </div>
                        </div>
                    </div>
                    <div className="CheckoutAddToBag_Similar">
                        <div className="CheckoutAddToBag_Similar_Heading">
                            Goes well with
                        </div>
                        <div className="CheckoutAddToBag_Similar_List" ref={setContentRef}>
                            {fourSimilarProducts ?
                                fourSimilarProducts?.map((product, index) =>
                                    <div key={index} className="CheckoutAddToBag_Similar_List_Card">
                                        <Link
                                            to={`/product/${product?.name}&${product?.productId}&${product?.images[0]?.colorId}`}
                                        >
                                            <img src={product.one} className="CheckoutAddToBag_Similar_List_Card_Image"
                                                 onClick={() => {
                                                     // window.location.href = `/product/${product?.name}&${product?.productId}&${product?.images[0]?.colorId}`
                                                     handleClose()
                                                     saveRecentView(product)
                                                 }}
                                            />
                                        </Link>
                                        <div className="CheckoutAddToBag_Similar_List_Card_Name">{product.name}</div>
                                        <div className="CheckoutAddToBag_Similar_List_Card_Price">{product.price}</div>
                                    </div>
                                )
                                :
                                <div></div>
                            }
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    )
}