import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { login } from '../action/userAction';
import '../Styles/Login.css'

const LogInSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(2, 'Too Short!').max(10, 'Too Long!').required('Required'),
});

const LogIn = (props) => {
    const { handelAuth } = props
    const dispatch = useDispatch()

    const handelSubmit = (values) => {
        dispatch(login(values, handelAuth))
    }

    return (
        <div className='loginCont'>
            <h1 className='formTitle'>LogIn</h1>
            <div className='form'>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    validationSchema={LogInSchema}
                    onSubmit={values => { handelSubmit(values) }}
                    enableReinitialize
                >
                    {({ errors, touched }) => (
                        <Form>
                            <label htmlFor='email'><b>Email</b></label>
                            <br />
                            <Field name="email" type="email" placeholder='Pls enter your email' />
                            {errors.email && touched.email ? <div className='error'>{errors.email}</div> : null}
                            <br />
                            <label htmlFor='password'><b>Password</b></label>
                            <br />
                            <Field name="password" type='password' placeholder='Pls enter to your Password' />
                            {errors.password && touched.password ? <div className='error'>{errors.password}</div> : null}
                            <br />
                            <input className='login' type='submit' value='Login' />
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default LogIn