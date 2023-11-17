import {useSelector} from "react-redux";
import {useState} from "react";
// import CircleIcon from '@mui/icons-material/Circle';
import "../styles/ProductDetailMainCarouselResponsive.scss"
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Pagination} from 'swiper';
// Import Swiper styles
import 'swiper/swiper-bundle.css'
import 'swiper/components/pagination/pagination.scss';
import afterpayLogo from "../headerSvgIcons/svgexport-afterpay.svg";
// import React from "@types/react";

SwiperCore.use([Pagination]);
export const ProductDetailMainCarouselResponsive = ({product}) => {
    let colorId = useSelector(state => state?.productReducer?.updateColorId)
    const productImageSelected = product?.images.filter(element => element?.colorId === colorId)
    const productImgs = productImageSelected[0]?.mainCarousel?.media?.split(" | ")
    let url = productImgs && productImgs[0]
    let [sliderUrl, setSliderUrl] = useState('')
    let [imgIndex, setImgIndex] = useState(0)
//restore Image
    if (productImgs && productImgs?.length !== 1) {
        setTimeout(() => {
            setSliderUrl(productImgs[imgIndex])
        }, 200);
    }
    // const handleClick = (index) => {
    //     setImgIndex(index)
    //     const slider = productImgs[index];
    //     setSliderUrl(slider);
    // }

    const checkImg = (type) => {
        if (type === 0) {
            setImgIndex(imgIndex >= productImgs?.length ? 0 : imgIndex += 1)
        } else {
            setImgIndex(imgIndex <= 0 ? 0 : imgIndex -= 1)
        }
        setSliderUrl(productImgs[imgIndex])
    }
    const goToSlide = slideIndex => {
        setImgIndex(slideIndex)
    }
    return (
        <div className="ProductDetail_MainCarousel_Responsive">
            <div className="ProductDetail_MainCarousel_Responsive_ProductInforContainer">
                <h1 className="ProductDetail_MainCarousel_Responsive_ProductInforContainer_ProductName">{product?.name}</h1>
                <h2 className="ProductDetail_MainCarousel_Responsive_ProductInforContainer_ProductPrice">{product?.price}</h2>
                <div className="ProductDetail_MainCarousel_Responsive_ProductInforContainer_AfterPayContainer">
                    <h3 className="ProductDetail_MainCarousel_Responsive_ProductInforContainer_AfterPayContainer_AfterPay">or
                        4 payments of $14.50 with <img src={afterpayLogo} alt=""/>
                    </h3>
                </div>
            </div>
            <div className="ProductDetail_MainCarousel_Responsive_SlideStyles">
                {/* <img src={sliderUrl} alt="" className="ProductDetail_MainCarousel_Responsive_SlideStyles_Imgs"/> */}
                <Swiper
                    pagination={{clickable: true}}
                    slidesPerView={1}
                    className='ProductDetail_MainCarousel_Responsive_SlideStyles_Imgs'
                >
                    {
                        productImgs?.map((item, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <img src={item} alt=""
                                         className="ProductDetail_MainCarousel_Responsive_SlideStyles_Imgs"/>
                                </SwiperSlide>

                            )
                        })
                    }
                </Swiper>
                <div className="ProductDetail_MainCarousel_Responsive_DotsContainerStyles"
                >
                    {/*{productImgs?.map((productImgs, i) => (*/}
                    {/*        <div className="ProductDetail_MainCarousel_Responsive_DotsContainerStyles_DotStyles"*/}
                    {/*             key={i} onClick={() => console.log(goToSlide(i))}><CircleIcon fontSize="8px"/></div>*/}
                    {/*    )*/}
                    {/*)}*/}
                </div>
                <div className="ProductDetail_MainCarousel_Responsive_ModelInfo">
                    Adot is 5´10˝ and wears a size 6
                </div>
            </div>
        </div>

    )
}
