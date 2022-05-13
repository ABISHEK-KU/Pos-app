import axios from "../config/Axios";
import Swal from "sweetalert2";

export const billList = () =>
    async (dispatch) => {
        await axios.get('/bills', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
            .then((response) => {
                const result = response.data
                if (!result.hasOwnProperty('err' || 'errors' || 'error')) {
                    dispatch({
                        type: 'BILL_LIST',
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

export const addBill = (form) =>
    async (dispatch) => {
        await axios.post('/bills', form, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
            .then((response) => {
                const result = response.data
                if (result.hasOwnProperty('err' || 'errors' || 'error')) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: (result.err) || (result.error) || (result.errors)
                    })
                } else {
                    dispatch({
                        type: 'ADD_BILL',
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



export const deleteBill = (id) =>
    async (dispatch) => {
        await axios.delete(`/bills/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
            .then((response) => {
                const result = response.data
                if (result.hasOwnProperty('err' || 'errors' || 'error')) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: (result.err) || (result.error) || (result.errors)
                    })
                } else {
                    dispatch({
                        type: 'DELETE_BILL',
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

export const selected = (id, history) =>
    async (dispatch) => {
        await axios.get(`/bills/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
            .then((response) => {
                const result = response.data
                console.log(result)
                if (result.hasOwnProperty('err' || 'errors' || 'error')) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: (result.err) || (result.error) || (result.errors)
                    })
                } else {
                    dispatch({
                        type: 'SELECT_BILL',
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
        history.push(`/bill_View/${id}`)
    }