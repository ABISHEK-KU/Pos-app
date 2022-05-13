import axios from "../config/Axios";
import Swal from "sweetalert2";

export const customerList = () =>
    async (dispatch) => {
        await axios.get('/customers', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
            .then((response) => {
                const result = response.data
                if (!result.hasOwnProperty('err' || 'errors' || 'error')) {
                    dispatch({
                        type: 'CUSTOMER_LIST',
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

export const selected = (id) =>
    () => {
        axios.get(`/customers/${id}`, {
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
                        text: (result.err) || (result.errors) || (result.error)
                    })
                } else {
                    console.log(result)
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

export const create = (form) =>
    (dispatch) => {
        axios.post('/customers', form, {
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
                        text: (result.err) || (result.errors) || (result.error)
                    })
                } else {
                    dispatch({
                        type: 'CREATE_CUSTOMER',
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

export const update = (form, id) =>
    (dispatch) => {
        axios.put(`/customers/${id}`, form, {
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
                        text: (result.err) || (result.errors) || (result.error)
                    })
                }
                else {
                    dispatch({
                        type: 'UPDATE_CUSTOMER',
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

export const deleting = (id) =>
    (dispatch) => {
        axios.delete(`/customers/${id}`, {
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
                        text: (result.err) || (result.errors) || (result.error)
                    })
                } else {
                    dispatch({
                        type: 'DELETE_CUSTOMER',
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