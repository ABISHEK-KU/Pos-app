import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct } from '../action/productAction';
import CreateProduct from './CreateProduct';
import '../Styles/ProductsList.css'

const ProductsList = (props) => {
    const dispatch = useDispatch()
    const [search, setSearch] = useState('')
    const [select, setSelect] = useState('')
    const [toggle, setToggle] = useState(false)
    const [id, setId] = useState('')

    const productData = useSelector((state) =>
        state.product
    )

    const handelChange = (e) => {
        const data = e.target.value
        setSearch(data)
    }

    const handelSelect = (e) => {
        const selected = e.target.value
        setSelect(selected)
    }

    const reverseData = [...productData.products].reverse()

    const filterProducts = reverseData.filter((e) => {
        if (select === 'id') {
            return e._id.includes(search)
        } else if (select === 'price') {
            return e.price.toString().includes(search)
        } else if (select === '' || 'name') {
            return e.name.includes(search)
        }
    })

    const handelEdit = (id) => {
        setId(id)
        setToggle(!toggle)
    }

    const handelDelete = (id) => {
        dispatch(deleteProduct(id))
    }

    const handelToggle = () => {
        setToggle(!toggle)
        setId('')
    }

    return (
        <div>
            {(toggle ? <CreateProduct id={id} handelToggle={handelToggle} /> : null)}
            <div className='customer'>
                {(!toggle ? <i id='addCustomer' className='fas fa-plus-circle' onClick={handelToggle} ></i> : <i id='closeCustomer' className='fas fa-times-circle' onClick={handelToggle}></i>)}
                <h1>Products List</h1>
                <input type='text' name='search' value={search} placeholder={`Pls enter ${select} to search product`} onChange={handelChange} />
                <select onChange={handelSelect}>
                    <option value=''>Select to search</option>
                    <option value='id'>Id</option>
                    <option value='name'>Name</option>
                    <option value='price'>Price</option>
                </select>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterProducts.map((e) => {
                                return (
                                    <tr key={e._id}>
                                        <td>{e.name}</td>
                                        <td>{e.price}</td>
                                        <td><button className='update' onClick={() => { handelEdit(e._id) }}>Update</button></td>
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
export default ProductsList