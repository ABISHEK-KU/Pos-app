import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { signIn } from '../action/userAction';
import '../Styles/SignIn.css'

const SignInSchema = Yup.object().shape({
    username: Yup.string().min(2, 'Too Short!').max(20, 'Too Long!').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(2, 'Too Short!').max(10, 'Too Long!').required('Required'),
    businessname: Yup.string().min(2, 'Too Short!').max(20, 'Too Long!').required('Required'),
    address: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
});

const SignIn = (props) => {
    const dispatch = useDispatch()

    const handelSubmit = (values) => {
        dispatch(signIn(values))
        props.history.push('/login')
    }

    return (
        <div className='signinCont'>
            <h1 className='formTitle'>SignIn</h1>
            <div className='form'>
                <Formik
                    initialValues={{
                        username: '',
                        email: '',
                        password: '',
                        businessname: '',
                        address: ''
                    }}
                    validationSchema={SignInSchema}
                    onSubmit={(values) => { handelSubmit(values) }} >
                    {({ errors, touched }) => (
                        <Form>
                            <label htmlFor='username'><b>Username</b></label>
                            <br />
                            <Field name="username" type="text" placeholder='Pls enter User name..' />
                            {errors.username && touched.username ? <div className='error'>{errors.username}</div> : null}
                            <br />
                            <label htmlFor='email'><b>Email</b></label>
                            <br />
                            <Field name="email" type="email" placeholder='Pls enter your email' />
                            {errors.email && touched.email ? <div className='error'>{errors.email}</div> : null}
                            <br />
                            <label htmlFor='password'><b>Password</b></label>
                            <br />
                            <Field name="password" type='password' placeholder='Pls enter  Password' />
                            {errors.password && touched.password ? (<div className='error'>{errors.password}</div>) : null}
                            <br />
                            <label htmlFor='businessname'><b>Businessname</b></label>
                            <br />
                            <Field name="businessname" type="text" placeholder='Pls enter Business name..' />
                            {errors.businessname && touched.businessname ? <div className='error'>{errors.businessname}</div> : null}
                            <br />
                            <label htmlFor='address'><b>Address</b></label>
                            <br />
                            <Field name="address" type="text" placeholder='Pls enter Your address..' />
                            {errors.address && touched.address ? <div className='error'>{errors.address}</div> : null}
                            <br />
                            <input type='submit' className='signin' value='Signin' />
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}
export default SignIn