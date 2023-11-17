import {actionType} from "../Helper";

const initialState = {
    allProductList: [],
    allFilters: null,
    isLoading: null,
    errorMessage: null,
    updateColorId: null,
    product: null,
    totalProducts: [],
    sortIndex: 1,
    pageNum: 1,
    recentViewList: [],
    recentViewFlag: false,
    reviewList: [],
    test: [],
    totalProductNum: null
}
export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.FETCH_ALL_PRODUCTS:
            // console.log('Fetch all products')
            return {...state, totalProducts: action?.payload}
        case actionType.FETCH_LOADING:
            // console.log('Fetch loading')
            return {...state, isLoading: action?.payload}
        case actionType.FETCH_FAILURE:
            // console.log('Fetch Failure')
            return {...state, errorMessage: action?.payload}
        case actionType.FETCH_ALL_FILTER:
            // console.log('Fetch all filters', action?.payload)
            return {...state, allFilters: action?.payload}
        case actionType.FETCH_ALL_PRODUCTS_SORT:
            // console.log('Fetch All Sorting')
            return {...state, allProductList: action?.payload}
        case actionType.UPDATE_COLORID:
            // console.log('update colorId')
            return {...state, updateColorId: action?.payload}
        case actionType.UPDATE_FILTER:
            // console.log('Update the filter')
            return {...state, allFilters: action?.payload}
        case actionType.FETCH_ONE_PRODUCT:
            // console.log('fetch one product')
            return {...state, product: action?.payload}
        case actionType.FETCH_ALL_PRODUCTS_PAGE_SORT:
            // console.log('fetch product with page and sort')
            // let updatedProductList = [...state.allProductList]
            return {...state, allProductList: updatedProductList.concat(action?.payload)}
        case actionType.UPDATE_SORT_INDEX:
            // console.log('update sort index')
            return {...state, sortIndex: action?.payload}
        case actionType.UPDATE_PAGE_NUMBER:
            // console.log('update page number')
            return {...state, pageNum: action?.payload}
        case actionType.UPDATE_RECENT_VIEW:
            // console.log('update the recent view')
            let updatedRecentView = [...state.recentViewList]
            return {...state, recentViewList: updatedRecentView.concat(action?.payload)}
        case actionType.UPDATE_REVIEW:
            // console.log('update review', action?.payload)
            let updatedReviewList = [...state.reviewList]
            return {...state, reviewList: updatedReviewList.concat(action?.payload)}
        case actionType.FETCH_ALL_PRODUCTS_FILTER:
            // console.log('fetch all product with filter', action?.payload)
            return {...state, allProductList: action?.payload}
        case actionType.UPDATE_ALL_PRODUCTS_FILTER:
            // console.log('update all product with filter', action?.payload)
            let updatedProductList = [...state.allProductList]
            return {...state, allProductList: updatedProductList.concat(action?.payload)}
        case actionType.FETCH_TOTAL_PRODUCT_NUM:
            // console.log('fetch total product number', action?.payload)
            return {...state, totalProductNum: action?.payload}
        case actionType.DISPLAY_PRODUCT:
            // console.log('display product', action?.payload)
            return {...state, product: action?.payload}
        default:
            return state
    }
}


