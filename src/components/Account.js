import React from "react";
import { useSelector } from "react-redux";
import '../Styles/Account.css'

const Account = (props) => {

    const userDetails = useSelector((state) => {
        return state.user.account
    })

    return (
        <div className="account">
            <h1>Account details</h1>
            <hr />
            <p><b>User Name:</b>{userDetails.username}</p>
            <hr />
            <p><b>Email:</b>{userDetails.email}</p>
            <hr />
            <p><b>Business Name:</b>{userDetails.businessName}</p>
            <hr />
            <p><b>Address:</b>{userDetails.address}</p>
            <hr />
            <p><b>Created At:</b>{userDetails.createdAt}</p>
        </div>
    )
}
export default Account