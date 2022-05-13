import axios from "../config/Axios";
import Swal from "sweetalert2";

export const productList = () =>
    (dispatch) => {
        axios.get('/products', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
            .then((response) => {
                const result = response.data
                if (!result.hasOwnProperty('err' || 'errors' || 'error')) {
                    dispatch({
                        type: 'PRODUCT_LIST',
                        payload: result
                    })
                } else if (result.hasOwnProperty('err' || 'errors' || 'error')) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: (result.err) || (result.error) || (result.errors)
                    })
                }
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: err.message
                })
            })

    }

export const createProduct = (form) =>
    (dispatch) => {
        axios.post('/products', form, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
            .then((response) => {
                const result = response.data
                if (result.hasOwnProperty('err' || 'error' || 'errors')) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: (result.err) || (result.error) || (result.errors)
                    })
                }
                else {
                    dispatch({
                        type: 'CREATE_PRODUCT',
                        payload: result
                    })
                }
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: err.message
                })
            })
    }

export const updateProduct = (form, id) =>
    (dispatch) => {
        axios.put(`/products/${id}`, form, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
            .then((response) => {
                const result = response.data
                console.log(result)
                if (result.hasOwnProperty('err' || 'error' || 'errors')) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: (result.err) || (result.error) || (result.errors)
                    })
                }
                else {
                    dispatch({
                        type: 'UPDATE_PRODUCT',
                        payload: result
                    })
                }
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: err.message
                })
            })
    }

export const deleteProduct = (id) =>
    (dispatch) => {
        axios.delete(`/products/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
            .then((response) => {
                const result = response.data
                if (result.hasOwnProperty('err' || 'error' || 'errors')) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: (result.err) || (result.error) || (result.errors)
                    })
                }
                else {
                    dispatch({
                        type: 'DELETE_PRODUCT',
                        payload: result
                    })
                }
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: err.message
                })
            })
    }
