import {useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {ProductDetailProductCard} from "./ProductDetailProductCard";
import "../styles/ProductDetailAlsoLike.scss"
import {useEffect, useRef, useState} from "react";

export const ProductDetailAlsoLike = ({product}) => {

    const ref = useRef(null)
    let isDown = false;
    let startX;
    let scrollLeft;
    useEffect(() => {
        const element = ref.current
        // console.log(element)
        element.addEventListener('mousedown', (e) => {
            isDown = true;
            element.classList.add('active');
            startX = e.pageX - element.offsetLeft;
            scrollLeft = element.scrollLeft;
        });
        element.addEventListener('mouseleave', () => {
            isDown = false;
            element.classList.remove('active');
        });
        element.addEventListener('mouseup', () => {
            isDown = false;
            element.classList.remove('active');
        });
        element.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - element.offsetLeft;
            const walk = (x - startX) * 3; //scroll-fast
            element.scrollLeft = scrollLeft - walk;
        });
    }, [])

    let allProducts = useSelector(state => state?.productReducer?.totalProducts)
    // let product = useSelector(state => state?.productReducer?.product)

    // get url parameters
    let params = useParams()
    let {productInfo} = params

    // store parameters into array
    productInfo = productInfo.split("&")

    // let sourceName = productInfo[0].split(" ")
    let sourceName = product?.name.split(" ")

    // get similar products
    const similarProducts = allProducts.filter(product => {
        const targetName = product?.name.split(" ")
        return (product?.productId !== productInfo[1] && sourceName.some(value => targetName.includes(value)))
    })
    // console.log(similarProducts)
    // set front and hover image from mainCarousel for similar products
    similarProducts.forEach(object => {
        // console.log(object)
        const imageList = object?.images[0]?.mainCarousel?.media?.split(" | ")
        object.one = imageList[0]
        object.two = imageList[1]
    })
    // display four similar products
    const fourSimilarProducts = similarProducts?.length > 4 && similarProducts?.slice(0, 4)
    // console.log('four products', fourSimilarProducts)

    return (
        <div className="ProductDetailAlsoLike">
            <div className="ProductDetailAlsoLike_Heading">You may also like</div>
            <div className="ProductDetailAlsoLike_ListProducts" ref={ref}>
                {fourSimilarProducts && fourSimilarProducts?.map((product, index) =>
                    <ProductDetailProductCard product={product} key={index}/>
                )}
            </div>
        </div>
    )
}