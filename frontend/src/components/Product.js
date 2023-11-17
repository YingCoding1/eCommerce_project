import "../styles/Product.scss"
import {useDispatch, useSelector} from "react-redux";
import {lazyLoading, saveRecentView, takeCadAway} from "../Helper";
import React, {useEffect, useState} from 'react';
import {Swatch, SwatchCarousel} from "./SwatchCarousel";
import {Link} from "react-router-dom";
import actions from "../actions";

export const Product = ({product, index, productList}) => {
    const price = takeCadAway(product.price)
    const [activeColorId, setActiveColorId] = useState(product?.swatches[0].colorId)
    // console.log("active color id", activeColorId)
    // console.log(product)
    const dispatch = useDispatch()
    let isLoading = useSelector(state => state?.productReducer.isLoading)
    useEffect(() => {
        lazyLoading()
    }, [product])
    // console.log(carousel)
    // console.log(product)
    // console.log("This is Swatches",product.swatches[0].swatch)
    // console.log('product', product.productId, product.images[0].whyWeMadeThis[0])
    const [colorCarousel, setColorCarousel] = useState(0)
    const [imgt, setImgt] = useState({
        one: product.one,
        two: product.two
    })
    useEffect(() => {
        setImgt({
            ...imgt,
            one: product.one,
            two: product.two,
        })
    }, [product])
    const findColorCarousel = (colorId) => {
        const colorCarousel = product.images.findIndex(object => object.colorId === colorId)
        colorCarousel && setColorCarousel(colorCarousel)
        // console.log("this from Product",findColorCarousel)
    }
    const setImgs = (id) => {
        setActiveColorId(id)
        const data = product.images.filter((item) => {
            return item.colorId === id
        })
        if (data.length !== 0) {
            const imgList = data[0].mainCarousel.media.split('|')
            if (imgList.length !== 0) {
                setImgt({
                    ...imgt,
                    one: imgList[0],
                    two: imgList[1]
                })
            }
        }
    }
    const [enterHover, setEnterHover] = useState()
    const hoverEnter = () => setEnterHover(true)
    const hoverLeave = () => setEnterHover(false)
    // console.log("this is colorCarousel from Product",colorCarousel)
    // console.log('active color id', activeColorId)
    // set one and two to store the front and back image in each images for hover
    product && product?.images.forEach(image => {
        const imageList = image?.mainCarousel?.media?.split(" | ")
        // console.log(imageList)
        image.one = imageList[0]
        image.two = imageList[1]
        return image
    })
    // console.log('product component', product)
    return (
        <div className="Product">
            <div className="Product_Container" onMouseEnter={hoverEnter} onMouseLeave={hoverLeave}>
                <Link
                    onClick={() => {
                        // dispatch(actions.productAction.fetchOneProduct(product?.productId))
                        // dispatch(actions.productAction.updateColorId(activeColorId))
                        saveRecentView(product)
                    }}
                    to={`/product/${product?.name}&${product?.productId}&${activeColorId}`}
                    state={product}
                >
                    <img src={imgt.one} alt={product?.name}/>
                    {product.images &&
                        <img src={imgt.two} alt={product?.name} className={enterHover ? "hover" : "hide"}/>}
                </Link>
            </div>
            <div className="Product_details">
                <SwatchCarousel swatch={product.swatches} colorCarousel={setImgs} product={product}/>
            </div>
            <div className="Product_details_title">
                {/*<div className="Product_details_index">{index}</div>*/}
                <div className="Product_details_name">{product?.name}</div>
                <div className="Product_details_price">{price}</div>
                <div className="Product_details_swatchLength">{product?.swatches?.length} colors</div>
            </div>
        </div>
    )
}
