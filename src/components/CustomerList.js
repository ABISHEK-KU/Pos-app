import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleting } from "../action/customerAction";
import CreateCustomer from './CreateCustomer'
import '../Styles/CustomerList.css'

const CustomerList = (props) => {
    const dispatch = useDispatch()
    const [search, setSearch] = useState('')
    const [select, setSelect] = useState('')
    const [toggle, setToggle] = useState(false)
    const [id, setId] = useState('')

    const customerData = useSelector((state) => {
        return state.customer
    })

    const handelSearch = (e) => {
        const data = e.target.value
        setSearch(data)
    }
    const handelOption = (e) => {
        const option = e.target.value
        setSelect(option)
    }

    const reverseData = [...customerData.customers].reverse()

    const filterData = reverseData.filter((e) => {
        if (select === 'id') {
            return e._id.includes(search)
        } else if (select === 'mobile') {
            return e.mobile.includes(search)
        } else if (select === 'email') {
            return e.email.includes(search)
        } else if (select === '' || 'name') {
            return e.name.includes(search)
        }
    })

    const handelUpdate = (id) => {
        setId(id)
        setToggle(!toggle)
    }

    const handelDelete = (id) => {
        dispatch(deleting(id))
    }
    const handelToggle = () => {
        setToggle(!toggle)
        setId('')
    }

    return (
        <div>
            {(toggle ? <CreateCustomer id={id} handelToggle={handelToggle} /> : null)}
            <div className="customer">
                {(!toggle ? <i id='addCustomer' className='fas fa-plus-circle' onClick={handelToggle} ></i> : <i id='closeCustomer' className='fas fa-times-circle' onClick={handelToggle}></i>)}
                <h1>Customer Details-{reverseData.length}</h1>
                <input type='text' name='search' onChange={handelSearch} placeholder={`Please enter ${select} to search`} />
                <select value={select} onChange={handelOption}>
                    <option value=''>select to search</option>
                    <option value='id'>Id</option>
                    <option value='name'>Name</option>
                    <option value='mobile'>Mobile</option>
                    <option value='email'>Email</option>
                </select>
                <div className='table'>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Mobile</th>
                                <th>Email</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterData.map((e) => {
                                return (
                                    <tr key={(e._id)}>
                                        <td>{e.name}</td>
                                        <td>{e.mobile}</td>
                                        <td>{e.email}</td>
                                        <td><button className='update' onClick={() => { handelUpdate(e._id) }}>Update</button></td>
                                        <td><button className='delete' onClick={() => { handelDelete(e._id) }}>Delete</button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default CustomerList