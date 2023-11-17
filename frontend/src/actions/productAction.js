import axios from "axios";
import {actionType, allProducts, filter, handleEmptyData, URL, pageNum, sortIndex, myKey} from "../Helper"

// fetch all products with get
const fetchAllProducts = () => async dispatch => {
    console.log('start fetch all products', myKey)
    dispatch({
        type: actionType.FETCH_LOADING,
        payload: true
    })
    try {

        let res = await axios({
                method: 'post',
                url: `${URL}${allProducts}?mykey=${myKey}`,
                headers: {
                    'Content-Type': 'application/json'
                },
                // params: {
                //     mykey: myKey
                // }
                // data: JSON.stringify(filtersJson)
            }
        )
        const {data: {rs: {products}}} = res
        const filterProducts = handleEmptyData(products)
        // console.log(filterProducts)

        dispatch({
            type: actionType.FETCH_ALL_PRODUCTS,
            payload: filterProducts
        })
        dispatch({
            type: actionType.FETCH_LOADING,
            payload: false
        })
    } catch (error) {
        console.log('fetch error', error)
        dispatch({
            type: actionType.FETCH_LOADING,
            payload: false
        })
        dispatch({
            type: actionType.FETCH_FAILURE,
            payload: error
        })
    }
}

// fetch products with page number and sort index
const fetchProductWithPageAndSort = (pageNum, sortIndex) => async dispatch => {
    // console.log('start fetch all products')
    dispatch({
        type: actionType.FETCH_LOADING,
        payload: true
    })
    try {

        let res = await axios({
                method: 'post',
                url: `${URL}${allProducts}?mykey=${myKey}`,
                // headers: {
                //     'Content-Type': 'application/json'
                // },
                params: {
                    sortingId: sortIndex,
                    page: pageNum,
                    // mykey: myKey
                }
            }
        )
        const {data: {rs: {products}}} = res
        const filterProducts = handleEmptyData(products)
        console.log('products', products)

        dispatch({
            type: actionType.FETCH_ALL_PRODUCTS_PAGE_SORT,
            payload: filterProducts
        })
        dispatch({
            type: actionType.FETCH_LOADING,
            payload: false
        })
        dispatch({
            type: actionType.UPDATE_SORT_INDEX,
            payload: sortIndex
        })
        dispatch(updatePageNumber(pageNum))
    } catch (error) {
        // console.log('fetch error', error)
        dispatch({
            type: actionType.FETCH_LOADING,
            payload: false
        })
        dispatch({
            type: actionType.FETCH_FAILURE,
            payload: error
        })
    }
}

// fetch all filters
const fetchAllFilter = () => async dispatch => {
    // console.log("start fetch filter")
    dispatch({
        type: actionType.FETCH_LOADING,
        payload: true
    })
    try {
        let res = await axios({
                method: 'post',
                url: `${URL}${filter}?mykey=${myKey}`,
                headers: {
                    'Content-Type': 'application/json'
                },
                // params: {
                //     mykey: myKey
                // }
            }
        )
        const {data: {rs}} = res
        // console.log('filter before action', rs)
        dispatch({
            type: actionType.FETCH_ALL_FILTER,
            payload: rs
        })
        dispatch({
            type: actionType.FETCH_LOADING,
            payload: false
        })
    } catch (error) {
        // console.log('fetch error', error)
        dispatch({
            type: actionType.FETCH_LOADING,
            payload: false
        })
        dispatch({
            type: actionType.FETCH_FAILURE,
            payload: error
        })
    }
}

// fetch product with sort index
const fetchProductWithSort = sortIndex => async dispatch => {
    // console.log("start fetch sorting")
    dispatch({
        type: actionType.FETCH_LOADING,
        payload: true
    })
    try {
        let res = await axios({
                method: 'post',
                url: `${URL}${allProducts}?mykey=${myKey}`,
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    sortingId: sortIndex,
                    // mykey: myKey
                }
                // data: JSON.stringify(filtersJson)
            }
        )
        const {data: {rs: {pageParams: {totalProducts}}}} = res
        const {data: {rs: {products}}} = res
        const filterProducts = handleEmptyData(products)
        // console.log('products', res)

        dispatch({
            type: actionType.FETCH_ALL_PRODUCTS_SORT,
            payload: filterProducts
        })
        dispatch({
            type: actionType.FETCH_LOADING,
            payload: false
        })
        dispatch(updatePageNumber(1))
        dispatch(fetchTotalProductNum(totalProducts))
    } catch (error) {
        // console.log('fetch error', error)
        dispatch({
            type: actionType.FETCH_LOADING,
            payload: false
        })
        dispatch({
            type: actionType.FETCH_FAILURE,
            payload: error
        })
    }
}

// update the colorId
const updateColorId = (index) => dispatch => {

    dispatch(
        {
            type: actionType.UPDATE_COLORID,
            payload: index
        }
    )
}

// update the filter
const updateFilter = filter => {
    // console.log("action update filter")
    return {
        type: actionType.UPDATE_FILTER,
        payload: filter
    }
}

// fetch single one product
const fetchOneProduct = productId => async dispatch => {
    // console.log("fetch one product")
    dispatch({
        type: actionType.FETCH_LOADING,
        payload: true
    })
    try {
        let res = await axios({
                method: 'get',
                url: `${URL}${productId}?mykey=${myKey}`,
                // params: {
                //     mykey: myKey
                // }
                // headers: {
                //     'Content-Type': 'application/json'
                // },
                // data: JSON.stringify(filtersJson)
            }
        )

        const {data: {rs}} = res
        // console.log('single product', res)

        dispatch({
            type: actionType.FETCH_ONE_PRODUCT,
            payload: rs
        })
        dispatch({
            type: actionType.FETCH_LOADING,
            payload: false
        })
    } catch (error) {
        // console.log('fetch error', error)
        dispatch({
            type: actionType.FETCH_LOADING,
            payload: false
        })
        dispatch({
            type: actionType.FETCH_FAILURE,
            payload: error
        })
    }
}

// update the page number
const updatePageNumber = pageNum => ({
    type: actionType.UPDATE_PAGE_NUMBER,
    payload: pageNum
})

// update the recent views
const updateRecentView = product => ({
    type: actionType.UPDATE_RECENT_VIEW,
    payload: product
})

// update the reviews
const updateReviews = review => ({
    type: actionType.UPDATE_REVIEW,
    payload: review
})

// fetch product with filter, page number, and sort index
const fetchProductWithFilter = (filters, pageNum, sortIndex) => async dispatch => {

    // console.log('start fetch product with filter')
    dispatch({
        type: actionType.FETCH_LOADING,
        payload: true
    })
    // console.log('fetch filter body', filters)
    const data = JSON.stringify(filters)
    // console.log('filter body', data)
    try {

        let res = await axios({
                method: 'post',
                url: `${URL}${allProducts}?mykey=${myKey}`,
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    sortingId: sortIndex,
                    page: pageNum,
                    // mykey: myKey
                },
                data: data
            }
        )
        const {data: {rs: {products}}} = res
        const {data: {rs: {pageParams: {totalProducts}}}} = res
        // console.log('fetch api data', res)
        const filterProducts = handleEmptyData(products)
        // console.log('products', products)

        dispatch({
            type: actionType.FETCH_ALL_PRODUCTS_FILTER,
            payload: filterProducts
        })
        dispatch({
            type: actionType.FETCH_LOADING,
            payload: false
        })
        dispatch({
            type: actionType.UPDATE_SORT_INDEX,
            payload: sortIndex
        })
        dispatch(updatePageNumber(pageNum))
        dispatch(fetchTotalProductNum(totalProducts))
    } catch (error) {
        // console.log('fetch error', error)
        dispatch({
            type: actionType.FETCH_LOADING,
            payload: false
        })
        dispatch({
            type: actionType.FETCH_FAILURE,
            payload: error
        })
    }
}

// update product with filter, page number, and sort index
const updateProductWithFilter = (filters, pageNum, sortIndex) => async dispatch => {

    console.log('start update product with filter')
    dispatch({
        type: actionType.FETCH_LOADING,
        payload: true
    })
    console.log('update filter body', filters)
    const data = JSON.stringify(filters)
    // console.log('filter body', data)
    try {

        let res = await axios({
                method: 'post',
                url: `${URL}${allProducts}?mykey=${myKey}`,
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    sortingId: sortIndex,
                    page: pageNum,
                    // mykey: myKey
                },
                data: data
            }
        )
        const {data: {rs: {products}}} = res
        console.log('update api data', res)
        const filterProducts = handleEmptyData(products)
        // console.log('products', products)

        dispatch({
            type: actionType.UPDATE_ALL_PRODUCTS_FILTER,
            payload: filterProducts
        })
        dispatch({
            type: actionType.FETCH_LOADING,
            payload: false
        })
        dispatch({
            type: actionType.UPDATE_SORT_INDEX,
            payload: sortIndex
        })
        dispatch(updatePageNumber(pageNum))
    } catch (error) {
        // console.log('fetch error', error)
        dispatch({
            type: actionType.FETCH_LOADING,
            payload: false
        })
        dispatch({
            type: actionType.FETCH_FAILURE,
            payload: error
        })
    }
}

const fetchTotalProductNum = num => ({
    type: actionType.FETCH_TOTAL_PRODUCT_NUM,
    payload: num
})

const displayProduct = product => ({
    type: actionType.DISPLAY_PRODUCT,
    payload: product
})

export default {
    fetchAllProducts,
    fetchAllFilter,
    fetchProductWithSort,
    updateColorId,
    updateFilter,
    fetchOneProduct,
    fetchProductWithPageAndSort,
    updatePageNumber,
    updateRecentView,
    updateReviews,
    fetchProductWithFilter,
    updateProductWithFilter,
    fetchTotalProductNum,
    displayProduct,
}