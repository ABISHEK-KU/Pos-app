import React from "react";
import { Link, } from "react-router-dom";
import '../Styles/NavBar.css'

const NavBar = (props) => {
    const {handelAuth,logInStatus}=props

    const handelLogOut = () => {
        localStorage.removeItem('token')
        handelAuth(false)
        localStorage.removeItem('page')
    }

    const handelLocation=(location)=>{
        localStorage.setItem('page',location)
    }

    return (
        <div>
            {(logInStatus) ? (
                <div>
                    <ul className='navbarul'>
                        <li className='navbarli'><Link className='navbarLink' to='/home' onClick={handelLocation('/home')}>Home</Link></li>
                        <li className='navbarli'><Link className='navbarLink' to='/account' onClick={handelLocation('/account')}>Account</Link></li>
                        <li className='navbarli'><Link className='navbarLink' to='/customer' onClick={handelLocation('/customer')}>Customer</Link></li>
                        <li className='navbarli'><Link className='navbarLink' to='/product' onClick={handelLocation('/product')}>Product</Link></li>
                        <li className='navbarli'><Link className='navbarLink' to='/bill' onClick={handelLocation('/bill')}>Bills</Link></li>
                        <li className='navbarli'><Link className='navbarLink' to='/dash_board' onClick={handelLocation('/dash_board')}>DashBoard</Link></li>
                        <li className='navbarli'><Link className='navbarLink' to='/login' onClick={() => { handelLogOut() }}>Logout</Link></li>
                    </ul>
                </div>
            ) : (<div>
                <ul className='navbarul'>
                    <li className='navbarli'><Link className='navbarLink' to='/login'>Log In</Link></li>
                    <li className='navbarli'><Link className='navbarLink' to='/signin'>Sign In</Link></li>
                </ul >
            </div>)}
        </div >
    )
}
export default NavBar