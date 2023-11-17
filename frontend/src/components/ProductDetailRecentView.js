import {useDispatch, useSelector} from "react-redux";
import {ProductDetailProductCard} from "./ProductDetailProductCard";
import "../styles/ProductDetailRecentView.scss"
import {useParams} from "react-router-dom";
import {useEffect, useRef} from "react";
import actions from "../actions";
import {getRecentView} from "../Helper";

export const ProductDetailRecentView = () => {

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

    // get product from the local storage
    let recentViewProducts = getRecentView()
    // console.log('recent view', recentViewProducts)

    return (
        <div className="ProductDetailRecentView">
            <div className="ProductDetailRecentView_Heading">Recently viewed</div>
            <div className="ProductDetailRecentView_ListProducts" ref={ref}>
                {recentViewProducts && recentViewProducts?.map((product, index) =>
                    <ProductDetailProductCard product={product} key={index}/>
                )}
            </div>
        </div>
    )
}