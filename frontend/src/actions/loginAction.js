import axios from "axios";
import {useDispatch} from "react-redux";
import {actionType, myKey, PaymentURL, token} from "../Helper";

const logInUrl = 'http://localhost:3001/user/login'
const logInMark = 'http://XXX.com'

// const dispatch = useDispatch()

export const loginAction = (newEmail, newPassword) => async dispatch => {
    console.log(newEmail, newPassword)
    let data = JSON.stringify({
        username: newEmail,
        password: newPassword
    })
    try {
        let res = await axios({
            method: 'post',
            url: `${logInUrl}`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        })
        const {data: {data: {token}}} = res
        const {data: {data: {user}}} = res

        console.log('userInfo is', res)
        localStorage.setItem('token', res.data.data.token)
        console.log('token is', token)
        dispatch({
            type: actionType.FETCH_ALL_LOGIN,
            payload: user
        })

    } catch (e) {
        console.log(e)
        let errorMessage = e.response.data.msg
        console.log('errorMess', errorMessage)
        dispatch({
            type: actionType.LOGIN_FAILED,
            payload: errorMessage
        })
    }
}

export const loginActionMark = () => async dispatch => {
    let data = JSON.stringify({
        email: "Test@info.com",
        password: "Test1234"
    })
    try {
        let res = await axios({
            method: 'post',
            url: `${logInMark}?mykey=${myKey}`,
            headers: {
                'Content-Type': 'application/json'
            },
            // params: {
            //     mykey: myKey
            // },
            data: data
        })
        const {data: {data: {token}}} = res
        localStorage.setItem('tokenPayment', res.data.data.token)
    } catch (e) {
        let errorMessage = e.response.data.msg
        console.log('errorMess', errorMessage)
    }
}