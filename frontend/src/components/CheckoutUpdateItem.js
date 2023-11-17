//利用react bootstrap框架设置弹出框
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Modal from 'react-bootstrap/Modal';
import ReactDOM from 'react-dom';
// import Modal from 'react-modal';
// import "bootstrap/dist/css/bootstrap.min.css";
import styled from 'styled-components'; // Import this
import "../styles/CheckoutUpdateItem.scss";
import {ProductDetailMainCarousel} from "./ProductDetailMainCarousel";
import {ProductDetailMainCarouselResponsive} from "./ProductDetailMainCarouselResponsive";
import {ItemRightSimple} from "./ItemRightSimple";
import {OrderData} from "../ItemData";
// import Button from "react-bootstrap/Button";
import {useState} from "react";
import actions from "../actions";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
const Styles = styled.div`
  .my-modal {
    margin: 2px;
  }`

export function MyVerticallyCenteredModal(props) {
    let subtitle
    const [aProductDetail, setAProduct] = useState(props.product)

    const dispatch = useDispatch()

    useEffect(() => {
        setAProduct(props.product)
    }, [props.product])

    // console.log("a product detail", aProductDetail)

    function openModal() {
        props.setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        props.setIsOpen(false);
    }

    return (
        <Styles>
            <Modal dialogClassName="my-modal"
                   {...props}
                   size="lg"
                   animation={false}
                   aria-labelledby="contained-modal-title-vcenter"
                   centered
            >
                <Modal.Body>
                    <div className="ProductDetail">
                        <div className="ProductDetail_Main">
                            <div className="ProductDetail_Main_ContainerStyles">
                                {props?.product &&
                                    <ProductDetailMainCarousel product={props.product} color={props.product.color}
                                                               className="ProductDetail_Main_Carousel"/>}
                                {props?.product && <ProductDetailMainCarouselResponsive product={props.product}
                                                                                        className="ProductDetail_Main_Responsive_Carousel"/>}
                            </div>
                            <div className="ProductDetail_Main_ContainerStylesRight">
                                <div className="ProductDetail_Main_ContainerStylesRightTwo">
                                    <button onClick={() => dispatch(actions.checkoutAction.showUpdatedItem(false))}>x
                                    </button>
                                </div>
                                {props?.product && <ItemRightSimple product={aProductDetail}/>}
                            </div>
                            {/*<ProductDetailLike/>*/}
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </Styles>
    );
}
