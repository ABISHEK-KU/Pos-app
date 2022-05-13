import React, { useState, useEffect } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { createProduct, updateProduct } from '../action/productAction';
import axios from "../config/Axios";
import Swal from 'sweetalert2';
import '../Styles/CreateProduct.css'

const CreateSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too Short!').max(30, 'Too Long!').required('Required'),
    price: Yup.string().min(1, 'Pls Enter Valid Number').max(10, 'Pls Enter Valid Number').required('Required'),
});
const CreateProduct = (props) => {
    const dispatch = useDispatch()
    const { id, handelToggle } = props
    const [editDetails, setEditDetails] = useState({ name: '', price: '' })

    useEffect(() => {
        if (id) {
            axios.get(`/products/${id}`, {
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
                        setEditDetails({ ...editDetails, name: result.name, price: result.price })
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
    }, [id])


    const handelSubmit = (values) => {
        if (id) {
            dispatch(updateProduct(values, id))
        } else {
            dispatch(createProduct(values))
        }
        setEditDetails({ name: '', price: '' })
        handelToggle()
    }


    return (
        <div className='createCont'>
            <h1 className='formTitle'>{(id) ? 'Update' : 'Create'} Product</h1>
            <div className='form'>
                <Formik
                    initialValues={{ ...editDetails }}
                    validationSchema={CreateSchema} validateOnChange={false}
                    onSubmit={(values) => { handelSubmit(values) }}
                    enableReinitialize
                >
                    {({ errors, touched }) => (
                        <Form >
                            <Field name="name" type='text' placeholder='Pls enter product name' />
                            <br />
                            {errors.name && touched.name ? (<div className='error'>{errors.name}</div>) : null}
                            <br />
                            <Field name="price" type='number' placeholder='Pls enter product price' />
                            <br />
                            {errors.price && touched.price ? (<div className='error'>{errors.price}</div>) : null}
                            <br />
                            <input className='create' type='submit' value={(id) ? 'Update' : 'Create'} />
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}
export default CreateProduct