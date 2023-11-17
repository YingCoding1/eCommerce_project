import "../styles/ProductDetialProductCard.scss"
import {useEffect, useState} from "react";
import {saveRecentView, toMatrix} from "../Helper";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {Link, useNavigate} from "react-router-dom";
import actions from "../actions";
import {useDispatch, useSelector} from "react-redux";


export const ProductDetailProductCard = ({product}) => {

    // console.log(product)
    const images = product?.images?.map(element => {
        const imageList = element?.mainCarousel?.media?.split(" | ")
        element.one = imageList[0]
        element.two = imageList[1]
        return element
    })
    const dispatch = useDispatch()
    const swatchesMatrix = toMatrix(product?.swatches, 7)
    const imagesMatrix = toMatrix(images, 7)
    const [isLink, setIsLink] = useState(false)
    // active colorId
    const [activeColorId, setActiveColorId] = useState(product?.swatches[0].colorId)
    // current display image
    const [displayImage, setDisplayImage] = useState(product?.one)
    // isShow carousel bar
    const [carouselBar, setCarouselBar] = useState(false)
    // updated images
    const [updatedImages, setUpdatedImages] = useState({
        one: product?.one,
        two: product?.two
    })
    // border index
    const [borderIndex, setBorderIndex] = useState(0)
    // carousel index
    const [carouselIndex, setCarouselIndex] = useState(0)
    // clickedIcon
    const [clickedIcon, setClickedIcon] = useState(null)
    // className
    const [className, setClassName] = useState('ProductDetailProductCard_Image_Bar_Swatches')
    // update border color
    const updateBorderColor = event => {
        const imageTags = document.querySelectorAll('.ProductDetailProductCard_Image_Bar_Swatches_Swatch')
        imageTags.forEach((element, index) => {
                element.dataset.color === event.target.dataset.color && setBorderIndex(index)
            }
        )
    }
    const incrementCarouselIndex = () => {
        setCarouselIndex(carouselIndex + 1)
    }
    const decrementCarouselIndex = () => {
        setCarouselIndex(carouselIndex - 1)
    }
    const cbAddForward = () => {
        incrementCarouselIndex()
        setClickedIcon(`Left`)
        setClassName('ProductDetailProductCard_Image_Bar_Swatches Left')
    }
    const cbAddBackward = () => {
        decrementCarouselIndex()
        setClickedIcon(`Right`)
        setClassName('ProductDetailProductCard_Image_Bar_Swatches Right')
    }
    // callback update the updated images and display image
    const cbUpdateImages = event => {
        updateBorderColor(event)
        setActiveColorId(event.target.dataset.color)
        const activeImages = images.filter(element => element.colorId === event.target.dataset.color)
        setDisplayImage(activeImages[0].one)
        setUpdatedImages(updatedImages => ({
            ...updatedImages,
            one: activeImages[0].one,
            two: activeImages[0].two
        }))
    }
    const renderSwatches = () => {
        return (
            <div key={carouselIndex} className={`${className} ${carouselIndex}`}>
                {swatchesMatrix[carouselIndex]?.map((element, index) =>
                    (index === borderIndex) ?
                        <img className="ProductDetailProductCard_Image_Bar_Swatches_Swatch Border"
                             src={element?.swatch}
                             alt=""
                             key={index}
                             data-color={element?.colorId}
                             onMouseEnter={cbUpdateImages}
                        />
                        :
                        <img className="ProductDetailProductCard_Image_Bar_Swatches_Swatch"
                             src={element?.swatch}
                             alt=""
                             key={index}
                             data-color={element?.colorId}
                             onMouseEnter={cbUpdateImages}
                        />
                )}
            </div>
        )
    }
    useEffect(() => {
        setDisplayImage(product?.one)
    }, [product])
    return (
        <div className="ProductDetailProductCard">
            <Link
                to={`/product/${product?.name}&${product?.productId}&${activeColorId}`}
                onClick={event => {
                    if (isLink) {
                        event.preventDefault()
                    }
                    if (!isLink) {
                        // window.location.href = `/product/${product?.name}&${product?.productId}&${activeColorId}`
                        saveRecentView(product)
                    }
                }}
                // style={{pointerEvents: `none`}}
            >
                <div className="ProductDetailProductCard_Image"
                     onMouseEnter={() => {
                         setDisplayImage(updatedImages?.two)
                         setCarouselBar(true)
                     }}
                     onMouseLeave={() => {
                         setDisplayImage(updatedImages?.one)
                         setCarouselBar(false)
                         setClassName('ProductDetailProductCard_Image_Bar_Swatches')
                     }}
                     style={{
                         backgroundImage: `url('${
                             displayImage
                             // product?.one
                         }')`
                     }}
                >
                    {carouselBar &&
                        <div className="ProductDetailProductCard_Image_Bar"
                             onMouseEnter={() => {
                                 setDisplayImage(updatedImages?.one)
                                 setIsLink(true)
                             }}
                             onMouseLeave={() => {
                                 setDisplayImage(updatedImages?.two)
                                 setIsLink(false)
                             }}
                        >
                            {imagesMatrix.length > 1 &&
                                <ArrowBackIosIcon
                                    className="ProductDetailProductCard_Image_Bar_Arrow back"
                                    pointerEvents={carouselIndex === 0 ? 'none' : 'auto'}
                                    onClick={cbAddBackward}
                                    style={{color: carouselIndex === 0 ? '#c1c1c1' : '#000000'}}
                                />
                            }
                            {renderSwatches()}
                            {imagesMatrix.length > 1 &&
                                <ArrowForwardIosIcon
                                    className="ProductDetailProductCard_Image_Bar_Arrow forward"
                                    pointerEvents={carouselIndex === imagesMatrix.length - 1 ? 'none' : 'auto'}
                                    onClick={cbAddForward}
                                    style={{color: carouselIndex === imagesMatrix.length - 1 ? '#c1c1c1' : '#000000'}}
                                />
                            }
                        </div>
                    }
                </div>
            </Link>
            <div className="ProductDetailProductCard_Name">{product?.name}</div>
            <div className="ProductDetailProductCard_Price">{product?.price}</div>
        </div>
    )
}


