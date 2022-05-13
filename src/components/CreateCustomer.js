import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { create, update } from '../action/customerAction'
import Swal from 'sweetalert2';
import axios from "../config/Axios";
import '../Styles/CreateCustomer.css'

const CreateSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too Short!').max(10, 'Too Long!').required('Required'),
    mobile: Yup.string().min(10, 'Pls Enter Valid Number').max(10, 'Pls Enter Valid Number').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
});

const CreateCustomer = (props) => {
    const { id, handelToggle } = props
    const dispatch = useDispatch()
    const [editDetails, setEditDetails] = useState({ name: '', mobile: '', email: '' })

    useEffect(() => {
        if (id) {
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
                            text: (result.err || result.error || result.errors)
                        })
                    }
                    else {
                        setEditDetails({ ...editDetails, name: result.name, mobile: result.mobile, email: result.email })
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
            dispatch(update(values, id))
        } else {
            dispatch(create(values))
        }
        setEditDetails({ name: '', mobile: '', email: '' })
        handelToggle()
    }

    return (
        <div className='createCont'>
            <h1 className='formTitle'>{(id) ? 'Update' : 'Create'} Customer</h1>
            <div className='form'>
                <Formik
                    initialValues={{ ...editDetails }}
                    validationSchema={CreateSchema} validateOnChange={false}
                    onSubmit={(values) => { handelSubmit(values) }}
                    enableReinitialize
                >
                    {({ errors, touched }) => (
                        <Form>
                            <Field name="name" type='text' placeholder='Pls enter Customer Name' />
                            <br />
                            {errors.name && touched.name ? (<div className='error'>{errors.name}</div>) : null}
                            <br />
                            <Field name="mobile" type='number' placeholder='Pls enter Customer Mobile' />
                            <br />
                            {errors.mobile && touched.mobile ? (<div className='error'>{errors.mobile}</div>) : null}
                            <br />
                            <Field name="email" type="email" placeholder='Pls enter your email' />
                            <br />
                            {errors.email && touched.email ? <div className='error'>{errors.email}</div> : null}
                            <br />
                            <input className='create' type='submit' value={(id) ? 'Update' : 'Create'} />
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default CreateCustomer