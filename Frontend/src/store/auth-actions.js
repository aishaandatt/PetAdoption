import { authActions } from "./auth-slice";
import { uiActions } from "./ui-slice";
import api from "../Components/api";
export const loginFunc = (userData) => async dispatch => {
    dispatch(authActions.pending())
    dispatch(uiActions.showNotification({
        open: true,
        type: "warning",
        message: "Logging In..."
    }))
    try {
        const response = await api.post('/auth/login', userData)
        console.log(response)
        if (response.status === 200) {
            dispatch(authActions.login())
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('userInfo', JSON.stringify(response.data.user))

            dispatch(uiActions.showNotification({
                open: true,
                type: "success",
                message: "Logged In Successfully"
            }))
        }
    }
    catch (error) {
        console.log(error.response, error)
        dispatch(authActions.error())
        dispatch(uiActions.showNotification({
            open: true,
            type: "error",
            message: error.response.data.message
        }))
    }
}

export const signupFunc = (userData) => async dispatch => {
    dispatch(authActions.pending())
    dispatch(uiActions.showNotification({
        open: true,
        type: "warning",
        message: "Signing In..."
    }))
    try {
        const response = await api.post('/auth/signup', userData);
        console.log(response.data)
        dispatch(authActions.login())
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('userInfo', JSON.stringify(response.data.user))
        dispatch(uiActions.showNotification({
            open: true,
            type: "success",
            message: "Signed Up Successfully"
        }))
    }
    catch (error) {
        console.log(error.response, error)
        dispatch(authActions.error())
        dispatch(uiActions.showNotification({
            open: true,
            type: "error",
            message: error.response.data.message
        }))
    }
}
export const logoutFunc = () => async dispatch => {
    try {
        dispatch(authActions.logout())
        localStorage.removeItem("token");
        localStorage.removeItem("userInfo");
        dispatch(uiActions.showNotification({
            open: true,
            type: "success",
            message: "Logged Out Successfully"
        }))
    }
    catch (error) {
        console.log(error.response, error)
        dispatch(authActions.error())
        dispatch(uiActions.showNotification({
            open: true,
            type: "error",
            message: "Error Occured, Try Again."
        }))
    }

}
export const tokenFunc = () => async dispatch => {
    try {
        if (localStorage.getItem('token')) {
            dispatch(authActions.tokenFind())
        }
    }
    catch (error) {
        dispatch(authActions.error())
    }
}
export const isAdminFunc = () => async dispatch => {
    try {
        const isAdmin = JSON.parse(localStorage.getItem('userInfo'))
        console.log(isAdmin.isAdmin)
        if (isAdmin.isAdmin) {
            dispatch(authActions.adminFind())
        }
    }
    catch (error) {
        dispatch(authActions.error())
    }
}