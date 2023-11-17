export const URL = `http://XXX.com/product/`
export const PaymentURL = `http://XXX.com/order`
export const allProducts = `allProducts`
export const filter = `filter`
export const pageNum = `1`
export const sortIndex = `1`
export const taxRate = 0.05
export const apiKey = 'N/A';
export const mapApi = 'https://maps.googleapis.com/maps/api/js';
export const geocodeJson = 'https://maps.googleapis.com/maps/api/geocode/json';
export const myKey = 'N/A';

// action types
export const actionType = {
    'FETCH_ALL_PRODUCTS': 'FETCH_ALL_PRODUCTS',
    'FETCH_ALL_PRODUCTS_PAGE_SORT': 'FETCH_ALL_PRODUCTS_PAGE_SORT',
    'FETCH_ALL_PRODUCTS_FILTER': 'FETCH_ALL_PRODUCTS_FILTER',
    'FETCH_LOADING': 'FETCH_LOADING',
    'FETCH_FAILURE': 'FETCH_FAILURE',
    'FETCH_ALL_FILTER': 'FETCH_ALL_FILTER',
    'FETCH_ALL_PRODUCTS_SORT': 'FETCH_ALL_PRODUCTS_SORT',
    'UPDATE_COLORID': 'UPDATE_COLORID',
    'UPDATE_FILTER': 'UPDATE_FILTER',
    'FETCH_ONE_PRODUCT': 'FETCH_ONE_PRODUCT',
    'UPDATE_PAGE_NUMBER': 'UPDATE_PAGE_NUMBER',
    'UPDATE_SORT_INDEX': 'UPDATE_SORT_INDEX',
    'UPDATE_RECENT_VIEW': 'UPDATE_RECENT_VIEW',
    'UPDATE_REVIEW': 'UPDATE_REVIEW',
    'UPDATE_ALL_PRODUCTS_FILTER': 'UPDATE_ALL_PRODUCTS_FILTER',
    'FETCH_TOTAL_PRODUCT_NUM': 'FETCH_TOTAL_PRODUCT_NUM',
    'ADD_ORDER': 'ADD_ORDER',
    'REMOVE_ORDER': 'REMOVE_ORDER',
    'UPDATE_ORDER': 'UPDATE_ORDER',
    'UPDATE_PRICE': 'UPDATE_PRICE',
    'ADD_TOTAL_PRICE': 'ADD_TOTAL_PRICE',
    'UPDATE_QUANTITY': 'UPDATE_QUANTITY',
    'SHOW_ADD_BAG': 'SHOW_ADD_BAG',
    'DISPLAY_PRODUCT': 'DISPLAY_PRODUCT',
    'SIMILAR_PRODUCT': 'SIMILAR_PRODUCT',
    'PAYMENT_SUCCESS': 'PAYMENT_SUCCESS',
    'PAYMENT_FAILURE': 'PAYMENT_FAILURE',
    'UPDATE_ORDER_QUANTITY': 'UPDATE_ORDER_QUANTITY',
    'UPDATE_ITEM_LIST': 'UPDATE_ITEM_LIST',
    'UPDATE_ORDER_ITEMS': 'UPDATE_ORDER_ITEMS',
    'ADD_SINGLE_ORDER': 'ADD_SINGLE_ORDER',
    'FETCH_ALL_LOGIN': 'FETCH_ALL_LOGIN',
    'FETCH_FAILED': 'FETCH_FAILED',
    'LOGIN_FAILED': 'LOGIN_FAILED',
    'SHOW_UPDATE_ITEM': 'SHOW_UPDATE_ITEM',
    'EMPTY_SHOPPING_CART': 'EMPTY_SHOPPING_CART',
    'ADD_SHIPPING_INFORMATION': 'ADD_SHIPPING_INFORMATION',
    'FETCH_ORDER_FROM_DATABASE': 'FETCH_ORDER_FROM_DATABASE',
    'ADD_BILLING_INFORMATION': 'ADD_BILLING_INFORMATION'
}

// lazy loading images
export const lazyLoading = () => {
    // const images = document.querySelectorAll('[data-src]')
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                entry.target.classList.toggle("show", entry.isIntersecting)
            })
        }, {
            rootMargin: '0px 0px 0px 0px',
            threshold: 0
        })
    const cards = document.querySelectorAll(".Product")
    cards.forEach(card => observer.observe(card))
    return () => {
        cards.forEach(card => observer.unobserve(card))
    }
}
// filter and slice product information
export const handleApiData = products => {
    const filterProducts = products.filter(element =>
        element.images?.length > 0 && element.images[0].whyWeMadeThis.length > 0
    )
    return filterProducts
}
// convert single array to matrix
export const toMatrix = (arr, width) =>
    arr.reduce((rows, key, index) => (index % width == 0 ? rows.push([key])
        : rows[rows.length - 1].push(key)) && rows, []);
export const takeCadAway = str => str.slice(0, str?.length - 3)
export const handleEmptyData = products => {
    const filterProducts = products.filter(element => typeof element === 'object' && !(element.length === 0))
    return filterProducts
}
// save recent view in the local storage
export const saveRecentView = product => {
    let currentProducts = localStorage.getItem("recentViews")
    // console.log('pass in', product)
    // console.log('recent product', JSON.parse(currentProducts))
    if (currentProducts) {
        currentProducts = JSON.parse(currentProducts)
        // console.log('current', currentProducts)
        // console.log('product', product)
        let newProductArray = currentProducts.concat(product)
        let newProductString = JSON.stringify(newProductArray)
        window.localStorage.setItem('recentViews', newProductString)
    } else {
        let productArray = [].concat(product)
        let productString = JSON.stringify(productArray)
        window.localStorage.setItem('recentViews', productString)
    }
}
// get recent view from the local storage
export const getRecentView = () => {
    if (localStorage.getItem("recentViews") === null) {
        // console.log('no local storage data')
        return []
    } else {
        // console.log('has local storage data')
        let product = JSON.parse(localStorage.getItem('recentViews'))
        // console.log('local storage product', product)
        return product
    }
}
// save review in the local storage
export const saveReview = review => {
    let currentReviews = localStorage.getItem("reviews")
    console.log('pass in', review)
    console.log('recent review', JSON.parse(currentReviews))
    if (currentReviews) {
        currentReviews = JSON.parse(currentReviews)
        console.log('current', currentReviews)
        console.log('review', review)
        let newReviewArray = currentReviews.concat(review)
        let newReviewString = JSON.stringify(newReviewArray)
        window.localStorage.setItem('reviews', newReviewString)
    } else {
        let reviewArray = [].concat(review)
        let reviewString = JSON.stringify(reviewArray)
        window.localStorage.setItem('reviews', reviewString)
    }
}

// get review from the local storage
export const getReview = () => {
    if (localStorage.getItem("reviews") === null) {
        // console.log('no local storage data')
        return []
    } else {
        // console.log('has local storage data')
        let review = JSON.parse(localStorage.getItem('reviews'))
        // console.log('local storage product', product)
        return review
    }
}

// get token from the local storage
export const getToken = () => {
    if (localStorage.getItem("token") === null) {
        return null
    } else {
        let token = localStorage.getItem('token')
        console.log('token', token)
        return token
    }
}

// get token from the local storage
export const getPaymentToken = () => {
    if (localStorage.getItem("tokenPayment") === null) {
        return null
    } else {
        let token = localStorage.getItem('tokenPayment')
        console.log('tokenPayment', token)
        return token
    }
}

// load google map api
export const loadAsyncScript = src => {
    return new Promise(resolve => {
        const script = document.createElement("script");
        Object.assign(script, {
            type: "text/javascript",
            async: true,
            src
        })
        script.addEventListener("load", () => resolve(script));
        document.head.appendChild(script);
    })
}

export const extractAddress = place => {
    console.log(place)
    const address = {
        streetNumber: "",
        streetName: "",
        city: "",
        state: "",
        zip: "",
        country: "",
    }

    if (!Array.isArray(place?.address_components)) {
        return address;
    }

    place.address_components.forEach(component => {
        const types = component.types;
        const value = component.long_name;

        if (types.includes("street_number")) {
            address.streetNumber = value;
        }

        if (types.includes("route")) {
            address.streetName = value;
        }

        if (types.includes("locality")) {
            address.city = value;
        }

        if (types.includes("administrative_area_level_1")) {
            address.state = value;
        }

        if (types.includes("postal_code")) {
            address.zip = value;
        }

        if (types.includes("country")) {
            address.country = value;
        }
    });
    return address;
}
