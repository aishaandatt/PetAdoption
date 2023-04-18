// import { authActions } from "./auth-slice";
import { productActions } from "./product-slice";
import { adminActions } from "./admin-slice";
import { uiActions } from "./ui-slice";
import api from "../Components/api";
import axios from "axios";

export const getUsers = () => async dispatch => {
    dispatch(adminActions.pending())
    dispatch(uiActions.showNotification({
        open: true,
        type: "warning",
        message: "Logging In..."
    }))
    const token = localStorage.getItem('token')
    console.log("Call")
    await api.get('/admin/getall', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            // console.log('users are', response.data)
            dispatch(adminActions.successUsers(response.data))
            dispatch(uiActions.showNotification({
                open: true,
                type: "success",
                message: "Users Fetched Successfully"
            }))
        })
        .catch(error => {
            console.log("Call")
            console.log(error)
            dispatch(adminActions.error())
            dispatch(uiActions.showNotification({
                open: true,
                type: "error",
                message: error.response.data.message
            }))
        })
}

//Add Product
//Fetch product
export const addProduct = (image, name, breed, description, age, category) => async dispatch => {
    dispatch(productActions.pending())
    dispatch(uiActions.showNotification({
        open: true,
        type: "warning",
        message: `Adding ${name} to Database..`
    }))
    const token = localStorage.getItem('token')
    await api.post('/admin/add', { image, name, breed, description, age, category }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            console.log(response.data)
            dispatch(productActions.add())
            dispatch(uiActions.showNotification({
                open: true,
                type: "success",
                message: `${name} added!`
            }))
        })
    console.log("Call")
        .catch(error => {
            console.log("Call")
            console.log(error)
            dispatch(productActions.error())
            dispatch(uiActions.showNotification({
                open: true,
                type: "error",
                message: error.response.data.message
            }))
        })
}
export const storeImageInServer = (formData) => async dispatch => {
    dispatch(productActions.pending())
    try {
        const res = await axios.post('http://localhost:4000/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(res)
        console.log("Call")
    }
    catch (err) {
        console.log(err)
        dispatch(productActions.error())
    }
}

//END Add 
//Start Fetch 
export const fetchProduct = () => async dispatch => {
    dispatch(uiActions.showNotification({
        open: true,
        type: "warning",
        message: "Fetching Products"
    }))
    const token = localStorage.getItem('token')
    await api.get('/admin/fetch', {
        // headers: {
        //     Authorization: `Bearer ${token}`
        // }
    })
        .then(response => {
            // console.log(response.data)
            dispatch(productActions.success(response.data))
            dispatch(uiActions.showNotification({
                open: true,
                type: "success",
                message: "Products Fetched Successfully"
            }))
            console.log("Call")
        }).catch(error => {
            console.log("Call")
            console.log(error)
            dispatch(adminActions.error())
            dispatch(uiActions.showNotification({
                open: true,
                type: "error",
                message: error.response.data.message
            }))
        })
}
//END Fetch
//Start Delete User
export const deleteUserRedux = (id) => async dispatch => {
    dispatch(adminActions.pending())
    dispatch(uiActions.showNotification({
        open: true,
        type: "warning",
        message: "Deleting..."
    }))
    try {
        const token = localStorage.getItem('token')
        const resp = await api.delete(`/admin/users/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log("Call")
        console.log(resp.data)
        dispatch(adminActions.deleteUserSuccess())
        dispatch(uiActions.showNotification({
            open: true,
            type: "success",
            message: "Deleted Successfully"
        }))
    }
    catch (err) {
        console.log(err)
        console.log("Call")
        dispatch(adminActions.error())
        dispatch(uiActions.showNotification({
            open: true,
            type: "error",
            message: err.response.data.message
        }))
    }
}
//END Delete User
//Start Delete Product
export const deleteProductRedux = (id) => async dispatch => {
    dispatch(adminActions.pending())
    dispatch(uiActions.showNotification({
        open: true,
        type: "warning",
        message: "Deleting..."
    }))
    try {
        console.log("Call")
        const token = localStorage.getItem('token')
        const resp = await api.delete(`/admin/products/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(resp)
        alert('Deleted')
        dispatch(adminActions.deleteProductSuccess())
        dispatch(uiActions.showNotification({
            open: true,
            type: "success",
            message: "Deleted Successfully"
        }))
    }
    catch (err) {
        console.log("Call")
        console.log(err)
        dispatch(adminActions.error())
        dispatch(uiActions.showNotification({
            open: true,
            type: "error",
            message: err.response.data.message
        }))
    }

}
//END Delete Product
//Start Delete File From Server
export const deleteImageFromServer = (image) => async dispatch => {
    dispatch(adminActions.pending())
    {
        try {
            console.log("Call")
            const resp = await axios.delete(`http://localhost:4000/uploads/${image}`)
            console.log(resp)
        }
        catch (err) {
            console.log("Call")
            console.log("Image Not Delete Error", err)
            dispatch(adminActions.error())
        }
    }
}
//END Delete File From Server
export const editProductRedux = (userId, image, name, breed, description, age, category) => async dispatch => {
    dispatch(adminActions.pending())
    dispatch(uiActions.showNotification({
        open: true,
        type: "warning",
        message: "Loading"
    }))
    try {

        const config = {
            headers: {
                'Content-Type': 'application/json',

            }
        }
        console.log("Call")
        const body = JSON.stringify({
            image,
            name,
            breed,
            description,
            age,
            category,
        })
        const res = await api.put(`/admin/products/edit/${userId}`, body, config);
        console.log(res)
        // alert('Product Updated Successfully')
        dispatch(adminActions.editProductFormDone())
        dispatch(uiActions.showNotification({
            open: true,
            type: "success",
            message: `${name} updated successfully. `
        }))

    }
    catch (err) {
        console.log("Call")
        // alert('Error Updating Profile')
        dispatch(uiActions.showNotification({
            open: true,
            type: "error",
            message: err.response.data.message
        }))

    }


}
export const editProductCancel = () => async dispatch => {
    console.log("Call")
    dispatch(adminActions.editProductFormDone())
}
export const editProductStart = () => async dispatch => {
    console.log("Call")
    dispatch(adminActions.editProductForm())
}