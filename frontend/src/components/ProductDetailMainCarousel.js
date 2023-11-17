import '../styles/ProductDetailMainCarousel.scss'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {useSelector} from "react-redux";
import {useState} from "react";
import ZoomInIcon from '@mui/icons-material/ZoomIn';

export const ProductDetailMainCarousel = ({product, color}) => {
    const productImages = product?.images
    let colorId = useSelector(state => state?.productReducer?.updateColorId)
    const productImageSelected = product?.images.filter(element => element?.colorId === colorId)
    const productImgs = productImageSelected[0]?.mainCarousel?.media?.split(" | ")
    let url = productImgs && productImgs[0]
    let [sliderUrl, setSliderUrl] = useState('')
    //当前图片的下标
    let [imgIndex, setImgIndex] = useState(0)
    //preview
    let [popShow, setPopShow] = useState(false)
    //Zoom up image
    let [priviewList, setPriviewList] = useState([])
    //restore Image
    if (productImgs && productImgs?.length !== 1) {
        setTimeout(() => {
            setSliderUrl(productImgs[imgIndex])
        }, 200);
    }
    const handleClick = (index) => {
        setImgIndex(index)
        const slider = productImgs[index];
        setSliderUrl(slider);
    }
    const checkImg = (type) => {
        if (type === 'right') {
            setImgIndex(imgIndex >= productImgs.length ? 0 : imgIndex += 1)
        } else {
            setImgIndex(imgIndex <= 0 ? 0 : imgIndex -= 1)
        }
        setSliderUrl(productImgs[imgIndex])
    }
    //preview
    const openImg = () => {
        let imgs = productImgs.filter((item) => {
            return item !== sliderUrl
        })
        imgs.unshift(sliderUrl)
        setPriviewList(imgs)
        setPopShow(true)
    }
    //close preview
    const closeOpen = () => {
        setPopShow(false)
    }
    // console.log("this is sliderUrl",sliderUrl)
    // const settings = {
    //     dots:false,
    //     infinite:true,
    //     speed:500,
    //     slidesToShow:1,
    //     sliderToScroll:1
    // }
    return (
        <div className="ProductDetail_MainCarousel">
            <div className="ProductDetail_MainCarousel_Container">
                <img src={sliderUrl} alt="" className="ProductDetail_MainCarousel_Container_Imgs" onClick={() => {
                    openImg()
                }}/>
                <div className="action_icon">
                    <div className='left' onClick={() => {
                        checkImg('left')
                    }}><ArrowBackIosIcon/></div>
                    <div className='right' onClick={() => {
                        checkImg('right')
                    }}><ArrowForwardIosIcon/></div>
                </div>
                <div
                    className='zoomin_icon'
                    onClick={()=> {
                        openImg()
                    }}
                ><ZoomInIcon/></div>
            </div>
            <div className="imagesCarousel_Bar">
                {productImgs && productImgs.map((url, i) =>
                    <div className="imageCarousel_Bar_Image" key={i}>
                        <img className={sliderUrl === i ? "clicked" : ""}
                             className="ImageCarousel_List"
                             src={url} alt="" onClick={() => {
                            handleClick(i)
                        }}
                             width="40px" height="50px"/>
                    </div>)}
            </div>
            {
                popShow ? (
                    <div className='priview_img'>
                        <div>
                            <div className='view_head'>
                                <div
                                    className="backToProduct_Container"
                                    onClick={() => {
                                        closeOpen()
                                    }}><ArrowBackIosIcon/>
                                    <div className="backToProduct">
                                        Back to Product
                                    </div>
                                </div>
                                <div className="zoomInProductName">{product?.name}</div>
                                <div
                                    className="zoomInProductClose"
                                    onClick={() => {
                                        closeOpen()
                                    }}>x
                                </div>
                            </div>
                            <div className='view_cont'>
                                {priviewList && priviewList.map((url, i) => {
                                    return (
                                        <img src={url} key={i}/>
                                    )
                                })
                                }
                            </div>
                        </div>
                    </div>
                ) : null
            }
            <div className="ProductDetail_MainCarousel_ModelInfo">Adot is 5´10˝ and wears a size 6</div>
        </div>
    )
}