import "../styles/WhyWeMadeThis.scss"
import {useSelector} from "react-redux";

export const WhyWeMadeThis = ({product}) => {
    // console.log("this is test form WWMS", product)

    let colorId = useSelector(state => state?.productReducer?.updateColorId)

    const images = product?.images?.map(element => {
        const imageList = element?.mainCarousel?.media?.split(" | ")
        element.one = imageList[0]
        element.two = imageList[1]
        return element
    })

    // console.log(product)

    const image = images?.filter(image => image?.colorId === colorId)

    // console.log('image', image)

    return (
        <div className="WhyWeMadeThis_Content">
            <div className="WhyWeMadeThis_Content_Text">
                <h1>Why we made this</h1>
                <hr/>
                <p>{product && product?.whyWeMadeThis}</p>
            </div>
            {product &&
                <div
                    className="WhyWeMadeThis_Content_RDImgLeft"
                    style={{
                        backgroundImage:
                            `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 59%, rgba(255, 255, 255, 255) 100%),
                            url('${image[0]?.one}')`
                    }}
                >
                </div>}
            {product &&
                <div
                    className="WhyWeMadeThis_Content_ImgLeft"
                    style={{backgroundImage: `url('${image[0]?.one}')`}}
                >
                </div>}
            {product &&
                <div
                    className="WhyWeMadeThis_Content_ImgRight"
                    style={{backgroundImage: `url('${image[0]?.two}')`}}
                >
                </div>}
        </div>
    )

}