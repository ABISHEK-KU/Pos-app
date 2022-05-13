import axios from "../config/Axios";
import Swal from 'sweetalert2'
import { customerList } from './customerAction';
import { productList } from './productAction'
import { billList } from './billAction';

export const login = (form, handelAuth) =>
    async (dispatch) => {
        await axios.post(`/users/login`, form)
            .then((response) => {
                const result = response.data
                if (result.hasOwnProperty('err' || 'errors' || 'error')) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: (result.err) || (result.errors) || (result.error)
                    })
                } else {
                    localStorage.setItem('token', result.token)
                    localStorage.setItem('page','/dash_board')
                    if (localStorage.getItem('token')) {
                        handelAuth(true)
                    }
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

export const autoLogIn = () => {
    return (dispatch) => {
        if (localStorage.getItem('token')) {
            dispatch(account())
            dispatch(productList())
            dispatch(customerList())
            dispatch(billList())
        }
    }
}

export const signIn = (form) =>
    async () => {
        await axios.post('/users/register', form, {
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
                        text: (result.err) || (result.errors) || (result.error)
                    })
                } else {
                    Swal.fire({
                        icon: 'success',
                        title: 'Successful',
                        text: `${result.username} your account created successfully`
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


export const account = () =>
    (dispatch) => {
        axios.get('/users/account', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
            .then((response) => {
                const result = response.data
                if (!result.hasOwnProperty('err' || 'errors' || 'error')) {
                    dispatch({
                        type: 'USER_DETAILS',
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