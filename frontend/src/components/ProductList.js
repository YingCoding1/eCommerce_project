import {useDispatch, useSelector} from "react-redux";
import {Product} from "./Product";
import "../styles/ProductList.scss"
import {useEffect, useState} from "react";
import AddIcon from '@mui/icons-material/Add';
import {filter, toMatrix} from "../Helper";
import {ProductDetail} from "./ProductDetail";
import imagePlaceholder from "../headerSvgIcons/No-image.jpg"
import actions from "../actions";
import loadingGif from "../headerSvgIcons/loading.gif"
import loadingGifBG from "../headerSvgIcons/large_loading.gif"

export const ProductList = () => {
    let products = useSelector(state => state?.productReducer?.allProductList)
    const totalNum = useSelector(state => state?.productReducer?.totalProductNum)
    let pageNum = useSelector(state => state?.productReducer?.pageNum)
    let sortIndex = useSelector(state => state?.productReducer?.sortIndex)
    let filters = useSelector(state => state?.productReducer?.allFilters)
    // console.log('page ', pageNum, 'sort ', sortIndex)
    const dispatch = useDispatch()
    let isLoading = useSelector(state => state?.productReducer?.isLoading)
    const [displayNum, setDisplayNum] = useState(0)
    useEffect(() => {
        setDisplayNum(products.length)
    }, [products])
    // Add a new state for the index
    const [index, setIndex] = useState(1);

    // Click the button - update the index
    function addElement(arr) {
        setIndex(index + 1);
        // setDisplayNum(displayNum + 24)
    }

    // const matrixProducts = toMatrix(products, 24)
    // Return some JSX by slicing the array up
    // to the index, and then `map` over that array
    // and return some divs
    // const getElements = (matrix, index) => {
    //     return matrix?.slice(0, index).map(array => array?.map((element, index) => {
    //         return <Product key={index} product={element}/>;
    //     }))
    // }
    // set front and hover image from mainCarousel
    products.forEach(object => {
        // console.log(object)
        const imageList = object?.images[0]?.mainCarousel?.media?.split(" | ")
        object.one = imageList[0]
        object.two = imageList[1]
    })
    return (
        <div className="ProductList">
            {isLoading ? <img className="ProductList_Loading" src={loadingGifBG}/> :
                <div className="ProductList_ListCards">
                    {/*{getElements(matrixProducts, index)}*/}
                    {products && products?.map((element, index) => <Product key={index} product={element}/>)}
                </div>
            }
            <div className="ProductList_ViewMore">
                {isLoading ? <img className="ProductList_ViewMore_DisplayNum_Loading" src={loadingGif}/> :
                    <>
                        <div className="ProductList_ViewMore_DisplayNum">Viewing {displayNum} of {totalNum}</div>
                        {totalNum > displayNum &&
                            <div className="ProductList_ViewMore_Content"
                                 onClick={() => {
                                     dispatch(actions.productAction.updatePageNumber(pageNum + 1))
                                     dispatch(actions.productAction.updateProductWithFilter(filters,pageNum + 1, sortIndex))
                                 }}
                            >
                                <AddIcon className="ProductList_ViewMore_Content_AddIcon"/>
                                <button className="ProductList_ViewMore_Content_AddBtn">View More Products</button>
                            </div>
                        }
                    </>
                }
            </div>
        </div>
    )
}
