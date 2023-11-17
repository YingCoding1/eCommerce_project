import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import "../styles/ProductDetailLike.scss";
import {Link} from "react-router-dom";
import {saveRecentView} from "../Helper";

export const ProductDetailLike = () => {
    let products = useSelector(state => state?.productReducer?.totalProducts)
    // get url parameters
    let params = useParams()
    let {productInfo} = params
    // store parameters into array
    productInfo = productInfo.split("&")
    let sourceName = productInfo[0].split(" ")
    // get similar products
    const similarProducts = products.filter(product => {
        const targetName = product?.name.split(" ")
        return (product?.productId !== productInfo[1] && sourceName.some(value => targetName.includes(value)))
    })
    // set front and hover image from mainCarousel for similar products
    similarProducts.forEach(object => {
        // console.log(object)
        const imageList = object?.images[0]?.mainCarousel?.media?.split(" | ")
        object.one = imageList[0]
    })
    // display four similar products
    const fourSimilarProducts = similarProducts?.length > 4 && similarProducts?.slice(0, 4)
    // console.log('product', similarProducts)
    return (
        <div className="ProductDetailLike">
            <h1>You may like</h1>
            {fourSimilarProducts && fourSimilarProducts.map((product, index) =>
                <div className="ProductDetailLike_Products" key={index}>
                    <Link
                        to={`/product/${product?.name}&${product?.productId}&${product?.images[0]?.colorId}`}
                    >
                        <img src={product?.one} alt="" height="104.5px"
                             onClick={() => {
                                 // window.location.href = `/product/${product?.name}&${product?.productId}&${product?.images[0]?.colorId}`
                                 saveRecentView(product)
                             }}
                        />
                    </Link>
                    <p>{product?.name}</p>
                    {/*<h2>{product?.productId}</h2>*/}
                </div>)}
        </div>
    )
}