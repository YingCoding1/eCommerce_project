import {ContentNav} from "../components/ContentNav";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {Provider, useDispatch} from 'react-redux';
import {store} from "../store";
import userEvent from "@testing-library/user-event";
import actions from "../actions";
import axios from "axios";
import {actionType, allProducts, handleEmptyData, URL} from "../Helper";
import {productReducer} from "../reducers/productReducer";

const getProducts = async () => {
    const res = await axios({
        method: 'post',
        url: `${URL}${allProducts}`,
        headers: {
            'Content-Type': 'application/json'
        },
        params: {
            sortingId: 1,
            page: 1,
        },
        data: JSON.stringify(null)
    })
    console.log(res)
    const {data: {rs: {products}}} = res
    const filterProducts = handleEmptyData(products)
    return filterProducts
}

describe('Sort Feature', () => {
    test('Sort by button click and display drop down menu', async () => {
        render(
            <Provider store={store}>
                <ContentNav/>
            </Provider>
        )
        // select sort by button
        const btnSortBy = screen.getByTestId('sortText-element')
        // click sort by button
        userEvent.click(btnSortBy)

        // expect results
        expect(screen.getByText('New Arrivals'))
        expect(screen.getByText('Top Rated'))
        expect(screen.getByText('Price: High to Low'))
        expect(screen.getByText('Price: Low to High'))
    })

    test('call fetch all product filter action redux', () => {

        const expected = {
            type: 'FETCH_ALL_PRODUCTS_FILTER',
            payload: getProducts()
        }

        const result = {
            type: actionType.FETCH_ALL_PRODUCTS_FILTER,
            payload: getProducts()
        }
        expect(result).toEqual(expected)
    })

    test('save filter products in the reducers redux', () => {

        const expected = {
            allProductList: getProducts()
        }

        const state = null

        const result = productReducer(state, store.dispatch({
            type: actionType.FETCH_ALL_PRODUCTS_FILTER,
            payload: getProducts()
        }))

        expect(result).toEqual(expected)
    })
})