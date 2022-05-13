import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteBill, selected } from "../action/billAction";
import CreateBill from './CreateBill'
import '../Styles/BillList.css'

const BillList = (props) => {
    const dispatch = useDispatch()
    const [search, setSearch] = useState('')
    const [select, setSelect] = useState('')
    const [toggle, setToggle] = useState(false)


    const billData = useSelector((state) => {
        return state.bill.bills
    })

    const CustomerData = useSelector((state) => {
        return state.customer.customers
    })

    const handelChange = (e) => {
        const data = e.target.value
        setSearch(data)
    }

    const handelSelect = (e) => {
        setSelect(e.target.value)
    }

    const billReverse = [...billData].reverse()

    
        const billDataCreator= billReverse.map((e) => {
             const customerName = CustomerData.filter((ele) => {
                 return e.customer === ele._id
             })
             return {id:e._id,date:e.date.slice(0, 10).split('-').reverse().join('-'),name:customerName[0].name,amount:e.total}
        })


    const filterData = billDataCreator.filter((e) => {
        console.log(e)
        if (select === 'Id') {
            return (e.id.includes(search))
        } else if (select === 'date') {
            return (e.date.includes(search))
        } else if (select === 'price') {
            return e.amount.toString().includes(search)
        }else if(select=== ''||'customer name') {
            return e.name.includes(search)
        }
    })

    const handelView = (id) => {
        dispatch(selected(id, props.history))
    }

    const handelDelete = (id) => {
        dispatch(deleteBill(id))
    }

    const handelToggle = () => {
        setToggle(!toggle)
    }
    
    return (
        <div>
            {(toggle ? <CreateBill handelToggle={handelToggle} /> : null)}
            <div className='customer'>
                {(!toggle ? <i id='addCustomer' className='fas fa-plus-circle' onClick={handelToggle} ></i> : <i id='closeCustomer' className='fas fa-times-circle' onClick={handelToggle}></i>)}
                <h1>Bill List</h1>
                <input type='text' placeholder="Pls Enter" value={search} onChange={handelChange} />
                <select onChange={handelSelect} value={select}>
                    <option value=''>Select to search</option>
                    <option value='Id'>Bill Id</option>
                    <option value='date'>Date</option>
                    <option value='price'>Bill Amount</option>
                    <option value='customer name'>Customer Name</option>
                </select>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Bill Amount</th>
                                <th>Customer Name</th>
                                <th>View Bill</th>
                                <th>Delete Bill</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterData.map((e)=>{

                                return (
                                    <tr key={e.id}>
                                        <td>{e.date}</td>
                                        <td>{e.amount}</td>
                                        <td>{e.name}</td>
                                        <td><button className='update' onClick={() => { handelView(e.id) }}>View</button></td>
                                        <td><button className='delete' onClick={() => { handelDelete(e.id) }}>Delete</button></td>
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
export default BillList