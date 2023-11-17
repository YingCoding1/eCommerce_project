import {useDispatch, useSelector} from "react-redux";
import {useLocation, useParams} from "react-router-dom";
import "../styles/ProductDetail.scss"
import Header from "./Header";
import {Footer} from "./Footer";
import {ProductDetailAlsoLike} from "./ProductDetailAlsoLike";
import {ProductDetailRecentView} from "./ProductDetailRecentView";
import {ProductDetailMainCarousel} from "./ProductDetailMainCarousel";
import {VirtualShopping} from "./VirtualShopping";
import {ItemRight} from "./ItemRight";
import {useEffect} from "react";
import actions from "../actions";
import {ProductDetailLike} from "./ProductDetailLike";
import {ScrollDownHeader} from "./ScrollDownHeader";
import {Reviews} from "./Reviews";
import {ProductDetailMainCarouselResponsive} from "./ProductDetailMainCarouselResponsive";
import {WhyWeMadeThis} from "./WhyWeMadeThis";
import {FeatureAccordion} from "./FeatureAccordion";

export const ProductDetail = ({color}) => {
    const dispatch = useDispatch()
    let product = useSelector(state => state?.productReducer?.product)
    // get url parameters
    let params = useParams()
    let {productInfo} = params
    // store parameters into array
    productInfo = productInfo.split("&")

    // const imageList = product?.images?.filter(image => image.colorId === productInfo[2])
    // const media = imageList && imageList[0]?.mainCarousel?.media?.split(" | ")
    // if (product) {
    //     product.one = media[0]
    //     product.two = media[1]
    // }

    const location = useLocation();

    useEffect(() => {
        dispatch(actions.productAction.fetchOneProduct(productInfo[1]))
        dispatch(actions.productAction.updateColorId(productInfo[2]))

    }, [location])
    // console.log('product', product)
    return (
        <div className="ProductDetail">
            <Header/>
            <ScrollDownHeader product={product}/>
            <div className="ProductDetail_Main">
                <div className="ProductDetail_Main_ContainerStyles">
                    {product && <ProductDetailMainCarousel product={product} color={color}
                                                           className="ProductDetail_Main_Carousel"/>}
                    {product && <ProductDetailMainCarouselResponsive product={product}
                                                                     className="ProductDetail_Main_Responsive_Carousel"/>}
                </div>
                {product && <ItemRight product={product}/>}
                <ProductDetailLike/>
            </div>
            <WhyWeMadeThis product={product}/>
            <FeatureAccordion featurePanels={product?.featurePanels}/>
            {product && <ProductDetailAlsoLike product={product}/>}
            <Reviews product={product}/>
            <ProductDetailRecentView/>
            <VirtualShopping/>
            <Footer/>
        </div>
    )
}

